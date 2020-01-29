# 常用系統運維指令
1. 系統監控
  - free
  - ulimit
  - top
  - df
  - ps 
2. 文件操作
  - tail
  - ll -ah
3. 網絡通信
  - netstat
  - 重啓網絡
  - SELinux
  - firewall
4. 系統管理
  - uname
  - ip addr

## free
free命令可以顯示系統物理上的空閒和使用中的內存，還有交換內存，同時也能顯示被內核使用中的緩沖和緩存  

cmd- free [params]  
-b：以Byte爲單位  
-k：以KB爲單位  
-m：以MB爲單位  
-o：不顯示緩衝區  
-s<間隔秒數>：持續觀察內存使用狀況  
-t：顯示內存總和列  
-V：顯示版本  

Mem：表示物理內存統計  
- total：物理內存總數（free+used）  
- used：表示系統分配給緩存使用的數量（包含buffers和cached）  
- free：表示爲分配的物理內存總數  
- shared：共享內存  
- buffers：系統分配但未被使用的buffers數量  
- cached：系統分配但未被使用的cache數量  
- (+/-buffers/cache)表示物理內存的緩存統計  
（-buffers/cache）內存數：指第一部分Mem中的used-buffers-cached，表示真正使用的內存總數  
（+buffers/cache）內存數：指第一部分Mem中的used+buffers+cached，表示真正未使用的內存總數  
Swap：表示硬盤上交換區使用情況  

## ulimit
ulimit用於顯示系統資源限制的信息

cmd- ulimit [params]  
-a：顯示目前資源限制設定  
-c<核心文件上限>：設定core文件最大值單位區塊  
-d<數據節區大小>：程序數據節區的最大值單位爲KB  
-f<文件大小>：shell所能建立的最大文件單位爲區塊  
-H：設定資源的硬體限制，即管理員所設限制  
-m<內存大小>：指定可使用內存上限單位KB  
-n<文件數目>：指定同一時間可開啓的文件數  
-p<緩衝區大小>：指定管道緩衝區的大小單位512Bypes  
-s<堆的大小>：指定堆疊上限單位KB  
-S：設定資源的彈性限制  
-t<時間>：指定CPU使用時間的上限，單位秒  
-u<進程數目>：用戶最多可開啓的進程數目  
-v<虛擬內存大小>：指定可使用的虛擬內存上限，單位KB  

## top
top可以實時動態查看系統整體運行情況，綜合多方信息監測系統性能和運行信息的實用工具  

cmd: top [params]  
-b：以批處理模式操作  
-c：顯示完整命令  
-d：屏幕刷新間隔時間  
-l：忽略失效過程  
-s：保密模式  
-S：累積模式  
-u 用戶名：指定用戶名  
-p 進程號：指定進程  
-n 次數：循環顯示的次數  

## df
df -h：查看硬盤使用情況  
df -i：查看inode使用情況  

## ps
查看進程統計信息，亦可加上grep使用，ex：ps -elf tomcat or ps -elf | grep tomcat  
-a：顯示當前終端下所有進程信息，包括其他用戶的進程  
-u：使用以用戶爲主的格式輸出進程信息  
-x：顯示當前用戶所有終端下的進程  
-e：顯示系統內所有進程信息  
-l：使用長格式顯示進程信息  
-f：使用完整格式顯示進程信息  
