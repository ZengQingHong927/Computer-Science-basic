# MongoDB Log

MongoDB有4種日誌，分别是系統日誌、Journal日誌、oplog主從日誌、慢查詢日誌等。這些日誌紀錄著MongoDB數據庫不同方面的蹤跡。下面分别介紹這幾種日誌。

## 系統日誌

系統日誌在MongoDB數據庫中很重要，它紀錄著MongoDB啟動和停止的操作，以及服務器在運行過程中發生的任何異常消息。
配置系統日誌的方法很簡單，啟動mongod時指定logpath參數即可。

```js
mongod -logpath=/data/log/mongodb/serverlog.log -logappend
```

## Journal日志

journal日誌功能則是 MongoDB 裡面非常重要的一個功能，它保證了數據庫服務器在意外斷電、自然災害等情況下數據的完整性。它通過預寫式的redo日誌為MongoDB增加了額外的可靠性保障。開啟該功能時，
MongoDB會在進行寫入時建立一條Journal日誌，其中包含了此次寫入操作具體更改的磁盤地址和字節。因此一旦服務器停止運作，可在啟動時對日誌進行重放，從而重新執行那些停機前沒能夠刷新到磁盤的寫入操作。
MongoDB配置WiredTiger引擎使用内存緩衝區來保存journal紀錄，WiredTiger根據以下間隔或條件將緩衝的日誌紀錄同步到磁盤

## oplog主從日誌

## 慢查詢日誌
