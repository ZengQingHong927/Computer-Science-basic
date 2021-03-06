# 數據備份恢復

MongoDB的數據安全包括以下幾個概念：

恢復日志（Journal）
寫關注（Write Concern)

## 恢復日誌

在MySQL， PostgreSQL，Oracle等關係型數據庫都有一個Write Ahead Log（Redo Log）的機制用來解決因為系统掉電或者崩潰時導致內存數據丟失問題。
MongoDB 的journal就是實現這個目的的一種WAL日誌。在MongoDB 2.0之前，Journal沒有被支持或者默認選項。所以當你進行寫入操作時。在沒有Journal的情况下，MongoDB是這樣保存數據的：
简单来说，數據在寫入內存之後給應用程式。而數據刷盤動作則在後台由操作系統來進行。MongoDB會每隔60秒強制把數據刷到硬盤上。大家可以想像得到，如果這是系統崩潰或掉電，那麼未刷盤的數據就会彻底丢失了。

自從2.0開始，MongoDB已经把Journal日誌默認開啟

MongoDB會先把數據更新寫入到Journal Buffer然後再更新內存數據，再返回給應用端。Journal會以100ms的間隔批量刷到硬盤上。這樣的情況下，即使出現掉電數據尚未寫到硬盤中，由於有Journal文件的存在，
MongoDB會自動根據Journal裡面的歷史紀錄來對數據文件進行追加。

那麼要是系統掉電正好發生在上次刷Journal的之後50ms呢？這個時候，就可以來看一下MongoDB持久化的下一個概念：寫關注

## 寫關注

寫關注（或稱寫安全機制）可以讓你靈活地指定寫操作的持久化設定。這是一個在性能和可靠性之间的一個權衡。 寫關注有以下幾個級別：

### {w: 0} Unacknowledged

Unacknowledged指的是對每個寫入操作，MongoDB並不會返回一個是否成功的狀態值。這個級別是寫入性能最好但也是最不安全的級別。比如说，你試圖插入一個違反了唯一性的文檔（重複的身份證號），
那麼MongoDB會拒绝寫入並報錯。但是由於驅動端並没有在乎你的報錯，應用程序以为一切都没问题，下回再來查詢那條數據的時候就會出現數據缺失的情況。
有不少時候MongoDB用來保存一些監控和程序日誌數據，這個時候如果你有1、2條數據缺失，是不會對系統造成影響。基於這些因素MongoDB早期不成熟考量，MongoDB在2.2之前的默認設置就是 {w:0}。
因為這個讓很多人認為MongoDB不安全的根本原因。

在MongoDB 2.4之後，這個設置已经被改為{w:1}

### {w: 1} Acknowledged

Acknowledged 的意思就是對每一個寫入MongoDB都會確認寫入操作的完成狀態，不管是成功還是失敗。當然這個確認只是基於主結點的寫入。但這個級別，可以侦测到重複主鍵， 網絡錯誤，系统故障或者是無效數據等錯誤。

自2.4版本起，MongoDB的默認寫安全設置就是 {w:1} Acknowledged。在這種情況下下，出現系統故障掉電原因而導致的數據丟失只會是我们先前提到的操作日誌沒有及時刷盤的情況。如果不能接受因為系統崩潰而引起可能的100ms的數據損失，那麼可以選用下一個級別：{j:1} Journaled

### {j:1} Journaled

這種方式意味著每一次的寫操作會在MongoDB實實在在把journal落盤以後才返回。當然這不意味著每一個寫操作就等於一個IO。MongoDB並不會對每一個操作都立即刷盤，而是會等最多30ms，把30ms内的寫操作集中到一起，採用順序追加的方式寫入硬盤。在這30ms内客户端處於等待狀態。對於單個操作的總體響應時間將有所延長，但對於高併發场景，綜合下來平均吞吐能力和響應時間不會有太大影響。特别是能给journal部署一個對順序寫有優化的IO，帶寬足夠，且專門的存儲系統，這個對性能的影響可以降到最低。

那麼使用 {j:1} 是不是就100%安全了呢？如果是單機版本，這個基本上是可以确保的（除非硬盤損壞）。在複本集（Replica Set）的場景下，我们還需要考虑一種更高的級別：{w: “majority”}

### {w: “majority”} 寫到多數節點

MongoDB 的默認部署是至少3個節點的複本集（Replicaset）。使用複本集好處很多，最關鍵的就是提高系統的數據可用性。另外一个好處就是提供數據的持久性。在複本集下哪怕整個主機内存和硬盤壞掉，你的數據還是健康的存在在第二台或者第N台從節點上。但是複本集作為一種分佈式儲存架構也對數據一致性引起新挑战。上述的{w: 1} 寫安全配置為例，來分析一種比較複雜場景。

01:00:00 網路故障，主從間網路斷開

01:00:01 應用程序寫入一個文檔：{ts: “01:00:01″} 注意這個文檔無法複製到B和C。此時，主節點尚未完全確認網路已故障，所以按照{w:1}規則繼續接受並寫入。

01:00:02 主節點A察覺到自己無法和從節點B，C聯絡上，主動降級為從節點，停止接受寫操作

01:00:05 B,C 選舉結果成功，B升級為主節點。B開始接受寫操作。{ts: “01:00:06″}
01:00:08 網路恢復，A重新加入集群。這個時候A的oplog和B的oplog不一致了。A會主動把B上面不存在的寫操作回滾掉(rollback)，並寫入一個回滾文件。
在這個時候應用程序如果查詢 {ts: “01:00:01″}這個文檔，MongoDB 將會說這個文檔不存在！

怎麼辦呢? {w: “majority”} 可以幫助我們。“majority” 指的是“大多數節點”。使用這個寫安全級別，MongoDB只有在數據已經被複製到多數節點的情況下才會向客戶端返回確認。

我们來看一下在使用 {w: “majaority”} 之後，剛才的情況發生什麼改變：

01:00:00 網路故障，主從之間網路斷開
01:00:01 應用程序要求寫入一個文檔： {ts: “01:00:01″} 文檔會先成功寫入主節點。但是由於網路斷開這個文檔無法複製到B和C。因為無法滿足{w:”majority”}規則，從應用程序的角度這個文檔並沒有寫入成功。
01:00:02 主節點A察覺到自己無法和從節點B，C 聯絡上，主動降級為從節點，停止接受寫操作
01:00:05 B,C 選舉结果成功，B升级為主節點。B開始接受寫操作。{ts: “01:00:06″}
01:00:08 網路恢復，A重新加入集群。這個時候A會產生回滚，把{ts: “01:00:01″}這個文檔刪除。此時集群的數據狀態為一致和正確的。
至此，如果使用 {w: “majority”, j:1 }, 那麼MongoDB可以滿足所有級別數據一致性的要求。
