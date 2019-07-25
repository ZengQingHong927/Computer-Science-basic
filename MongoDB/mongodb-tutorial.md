# MongoDB - Tutorial  
配置文件位置 /etc/mongod.conf  
數據存放位置 /var/lib/mongodb  
日誌存放位置 /var/log/mongodb  
### 基本連線配置和用戶管理
參考網址 https://docs.mongodb.com/manual/tutorial/enable-authentication/  
https://docs.mongodb.com/manual/reference/configuration-options/  
### 創建用戶
1. 進入mongo  
2. 切換至admin數據庫，use admin  
3. 添加用戶，db.createUser({
  user: "username",
  pwd: "password",
  roles:[{
    role: "userAdminAnyDatabase",
    db: "admin"
  }]
})
4. exit
5. 修改/etc/mongod.conf secutiry  
6. 重啓mongod，sudo service mongod restart  
7. mongo --port 27017 -u "adminUser" -p "adminPwd" --authenticationDatabase "admin"
### 配置文件
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb // 數據存放位置
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log // 日誌存放位置

# network interfaces
net:
  port: 27017 // 監聽端口
  bindIp: 127.0.0.1 // 可連線的IP群組


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security: // 啟用驗證
  authorization: enabled // 啟用驗證
#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```  
### 進入Mongo CLI設定用戶權限
1. 連線MongoDB  
mongo --host {serverIP} --port {port}  
2. 先不開啟授權，進入mongo切換至admin db  
show dbs  
show collections
use admin  
3. 在admin db下創建用戶權限和密碼
db.createUser(
{
    user: "username",
    pwd: "password",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] // admin db, role 只接受 `userAdmin` and `userAdminAnyDatabase`
})  

4. 修改設定檔啟動權限驗證  
編輯 /etc/mongodb.conf
security:
    authorization: enabled

5. 重新啟動mongoDB
sudo service mongod restart

6. 以帳號密碼登入授權資料庫  
- 方法1  
mongo --host {serverIP} --port {port} -u "{username}" -p "{password}" --authenticationDatabase "admin"  
- 方法2  
mongo --host {serverIP} --port {port}
use admin
db.auth("nick","nick0323")

### 對某一數據庫設定登入權限  
1. 切換至koa-test db 增加使用者  
use koa-test  
db.createUser({user: "username",pwd: "password",roles: [ { role: "readWrite", db: "koa-test" } ]})  
2. 查詢次數據庫所有用戶  
db.getUsers()  
3. 删除此數據庫所有用戶  
db.dropAllUsers()  
4. 創建集合  
db.createCollection("health");
5. 查詢document  
- use koa-test
- db.health.find()

### 權限管理  
1. mongod  
2. use testdb  
3. db.createUser({user:'username',pwd:'password',roles:[{role:'dbAdmin',db:'wmg-sys-app-beta'}]})  
4. use admin->db.createUser({user:'username',pwd:'password',roles:[{role:'userAdminAnyDatabase',db:'admin'}]})  
5. sudo nano /etc/mongodb.conf
6. security:  
    authorization: enabled  
7. sudo service mongod restart  

### 用戶權限
- Read：允許用戶讀取數據庫  
- readWrite：允許用戶讀寫數據庫  
- dbAdmin：允許用戶執行管理函數，如索引創建，刪除，查看統計或訪問system.profile  
- userAdmin：允许用户向system.users集合寫入，可以找指定數據庫裡創建，删除和管理用户  
- clusterAdmin：只在admin數據庫裡可用，賦予用戶所有分片和複製集相關管理權限  
- readAnyDatabase：只在admin數據庫可用，賦予用戶所有數據庫的讀權限  
- readWriteAnyDatabase：只在admin數據庫可用，賦予用戶所有數據庫的讀寫權限  
- userAdminAnyDatabase：只在admin數據庫可用，賦予用戶所有數據庫的userAdmin權限  
- dbAdminAnyDatabase：只在admin數據庫可用，賦予用戶所有數據庫的dbAdmin權限  
- root：只在admin數據庫可用。超級帳號，超級權限  

### 數據導入導出  
- import  
参数说明：  
-h:指明数据库宿主机的IP  
-u:指明数据库的用户名  
-p:指明数据库的密码  
-d: 数据库名  
-c: collection  
--type: 导入的格式默认json  
-f ：导入的字段名  
--headerline ：如果导入的格式是csv，则可以使用第一行的标题作为导入的字段  
--file ：要导入的文件  

mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field  

- export  
参数说明：  
-h:指明数据库宿主机的IP  
-u:指明数据库的用户名  
-p:指明数据库的密码  
-d:指明数据库的名字  
-c:指明collection(集合)的名字  
--type: 指明输出的格式,默认为json  
-f:指明要导出列(如果--type为csv，则需要加上-f "字段名")  
-o:指明到要导出的文件名  
-q:指明导出数据的过滤条件(以json字符串作为查询条件)  

mongoexport -h x.x.x.x:27017 -d online -c logs --type json -o /data/logs.json  
mongoexport -h x.x.x.x:27017 -d test -c students --type csv -f classid,name,age -o /data/students_csv.dat  