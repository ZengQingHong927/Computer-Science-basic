# 索引管理 - CMD操作

## 創建索引

db.COLLECTION_NAME.ensureIndex(keys[,options])

keys:建立索引的參數列表。如：{KEY:1}，其中key表示屬性，1表示升序排序，也可使用使用數字-1降序。
options:建立索引的设置。如下：
background，Boolean，在後台建置索引，以便建立索引時不影響其他數據庫的活動。default: false。
unique，Boolean，創建唯一索引。default: false。
name，String，指定索引的名稱。如果未指定，MongoDB會生成一個索引字段的名稱和排序顺序串聯。
partialFilterExpression, document.如果指定,MongoDB只會给满足過濾表達式的記錄建立索引。
sparse，Boolean，對文檔中不存在的字段數據不啟用索引。default false。
expireAfterSeconds,integer，指定索引過期的時間。
storageEngine,document，允许用户配置索引的存儲引擎。

## 查看索引

查看集合所有的索引  
db.COLLECTION_NAME.getIndexes()
查看索引鍵
db.COLLECTION_NAME.getIndexKeys()

## 刪除索引

刪除指定的索引
db.COLLECTION_NAME.dropIndex()
刪除全部索引
db.COLLECTION_NAME.dropIndexes()

## 重建索引

db.COLLECTION_NAME.getIndexSpecs()
