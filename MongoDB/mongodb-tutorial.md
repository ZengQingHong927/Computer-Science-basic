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
  user: "adminUser",
  pwd: "adminPwd",
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