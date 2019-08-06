# Postgresql Operations  
## 基本SQL操作  
- 創建表格
CREATE TABLE tablename (
  ID INT PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL,
  AGE INT NOT NULL,
  ADDRESS CHAR(50),
  SALARY REAL,
  JOIN_DATE DATE
);  
- 刪除表格  
DROP TABLE IF EXISTS tablename
- 插入數據(JSON)   
INSERT INTO tablename (
  ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE,DATA
) VALUES (1,'abc',30,'Shanghai China',2000.00,'2017-01-01','{"BMI":"20","height":"180","weight":"70"}');  
- 查詢數據  
SELECT * FROM tablename;  
- 更新數據  
UPDATE tablename SET column=value,column=value... WHERE id=2, etc;

- 插入数据(RANGE)  
CREATE TABLE schedule (id INT PRIMARY KEY NOT NULL, time int4range);  
INSERT INTO workingTable (id,time) VALUES (2,'[14,20]');  

- 插入数据(ARRAY)  
CREATE TABLE schedule (id INT PRIMARY KEY NOT NULL, time int[]);  
INSERT INTO workingTable (id,time) VALUES (2,'{2,7,1,4}');

- 對表新增字段(舊數據的新增欄位為null)
ALTER TABLE tableName ADD COLUMN fieldName dataType;

- 刪除字段
ALTER TABLE tableName DROP COLUMN fieldName;

- 刪除默認值
ALTER TABLE tableName ALTER COLUMN fieldName DROP default;

- 移除約束
ALTER TABLE tableName DROP CONSTRAINT some_name;

- 修改字段數據類型
ALTER TABLE tableName ALTER COLUMN fieldName TYPE VARCHAR;

- 修改字段名稱
ALTER TABLE tableName RENAME COLUMN oldFieldName TO newFieldName;

- 修改表的名稱
ALTER TABLE tableName RENAME TO newTableNAme;

- 創建索引並指定搜尋方法
CREATE INDEX idx_userinfo_username ON userinfo USING BTREE(username);

- 創建外鍵
CREATE TABLE tableName (id int reference tableName(id) on delete cascade on update cascade);

- TIMTIMING & EXPLAIN 執行SQL查詢語句
\timing
explain SELECT * FROM tableName where ...;
PostgreSQL為每個收到查詢設計一個查詢規劃