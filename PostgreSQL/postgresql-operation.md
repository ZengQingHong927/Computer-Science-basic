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
- 插入數據  
INSET INTO tablename (
  ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE
) VALUES (1,'abc',30,'Shanghai China',2000.00,'2017-01-01');

- 查詢數據  
SELECT * FROM tablename;