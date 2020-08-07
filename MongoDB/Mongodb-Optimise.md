# Mongodb optimision

<https://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs>
<https://jira.mongodb.org/browse/SERVER-32946>
<https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1>
<https://stackoverflow.com/questions/48411897/severe-performance-drop-with-mongodb-change-streams>
<http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html>


## 索引设置

1. 索引颗粒越小越好

索引列中重複的數據稱為颗粒，例如：有個索引age，age大於30歲約佔40%，現在要找一個age大於30歲，name叫Tom的人，則需要在這40%數據中查詢

2. 文檔中的_id鍵推薦使用默認值，禁止向_id中保存自定義的值。

3. 推薦使用短字段名

  MongoDB集合中的每一個文檔都需要存儲字段名，長字段名會需要更多的存儲空間。

4. MongoDB索引可以提高文檔的查詢、更新、刪除、排序操作，结合業務需求，適當創建索引。

5. 每個索引都會占用一些空間，並且導致插入操作的資源消耗，因此，建議每個集合的索引數盡量控制在5個以内。

6. 複合索引的鍵值顺序很重要，理解索引最左前缀原則。查詢語句的key順序盡量和創建時的複合索引一致（左至右）

7. TTL 索引（time-to-live index，具有生命週期的索引），使用TTL索引可以将超時的文檔删除。

  創建TTL的索引必須是日期類型。TTL索引是一種單字段索引，不能是複合索引。

8. 需要創建此索引，但集合中大量的文檔不包含此鍵值時，建議創建稀疏索引。

9. 在聚合運算中，$match要在$group前面，可以减少$group操作符要處理的文檔數量。

10. 通過操作符對文檔進行修改，通常可以獲得更好的性能，因为，不需要往返服務器來獲取並修改文檔數據，可以在序列化和傳輸數據上花費更少的時間。
