# Replica set - Tutorial  
- mongodb集群所有實例需要啟動，mongodb副本集才能成功啟動  

## 安裝步驟
1. 在所有電腦主機安裝mongodb  
2. 編輯 /etc/hosts  
  127.0.0.1 mongodb-a1  
  192.168.249.101 mongodb-a1  
  192.168.249.102 mongodb-a2  
  192.168.249.103 mongodb-a3  
3. 建立存放replica set數據資料夾  
  mkdir -p /var/lib/mongodb-rs-a  
  sudo chown -R mongodb:mongodb /var/lib/mongodb-rs-a  
4. 編輯配置文檔/etc/mongod.conf
  storage:
  dbPath: /var/lib/mongodb-rs-a
  net:
    port: 27080  
    bindIp: 0.0.0.0
5. 重新啟動mongodb
  sudo service mongod restart  
6. 創建用戶  
- mongod  
- use admin  
- db.createUser({  
  user:'username1',  
  pwd:'ijk123',  
  role:[{role: "userAdminAnyDatabase", db:"admin"}]  
})  
- db.createUser({  
  user:"username2",  
  pwd:"ijk123",  
  roles:[{role: "root", db:"admin"}]  
  })  
7. 生成密鑰並複製到每一台主機  
  openssl rand -base64 1024 > mongodb-key  
  sudo chmod 600 mongodb-key  
  sudo chown mongodb.mongodb ./mongodb-key  
  copy duplicates to all instances for replicat set  
8. 編輯 /etc/mongod.conf，啟用驗證，security replication  
9. 啟動所有主機的mongodb  
10. mongo --host 192.168.249.101 --port 27080 -u 'username1' -p 'ijk123' --authenticationDatabase "admin"  
11. rs.initiate()    
12. rs.conf()  
13. rs.add("192.168.249.102:27080")  
14. rs.add("192.168.249.103:27080")  
15. 查看副本集集群狀態  
rs.status()  

## mongod.conf
```
# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb-rs-a
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27080
  bindIp: 0.0.0.0

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:
#  keyFile: /home/replica1
#operationProfiling:

replication:
  replSetName: "rs1"
#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```  
### 插入資料測試  
## 啟動
sudo mongo --host 192.168.249.101 --port 27080 -u "Nick" -p "nick0323" --authenticationDatabase "admin"

## insert data
use replicatest
db.collection.insert({
  item:"canvas",qty:100,material:["cotton"],size:{w:55,h:30,ucom:"cm"}
})

db.collection.find()

## connect to primary database to read data
rs0:SECONDARY> db.getMongo().setReadPref('secondaryPreferred')
