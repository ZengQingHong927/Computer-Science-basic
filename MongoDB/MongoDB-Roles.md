# MongoDB - Roles

Roles
  Read：允許用户讀取指定數據庫。
  readWrite：允許用户讀寫指定數據庫。
  dbAdmin：允許用户在指定數據庫中執行管理函數，如索引創建、刪除，查看統計或訪問system.profile。
  userAdmin：允許用户向system.users集合寫入，可以找指定數據庫理創建、删除和管理用户。
  clusterAdmin：只在admin數據庫中可用，赋予用户所有分片和復制集相關函數的管理權限。
  readAnyDatabase：只在admin數據庫中可用，赋予用户所有數據庫的讀權限。
  readWriteAnyDatabase：只在admin數據庫中可用，赋予用户所有數據庫的讀寫權限。
  userAdminAnyDatabase：只在admin數據庫中可用，赋予用户所有數據庫的userAdmin權限。  
  dbAdminAnyDatabase：只在admin數據庫中可用，賦予用户所有數據庫的dbAdmin權限。
  root：只在admin數據庫中可用。超級帳號，超級權限。
