# Replica Set Tutorial

## 安裝步驟

1. 在所有電腦主機安裝mongodb
2. 創建三個配置文件
  /etc/mongod.rs0.conf
  /etc/mongod.rs1.conf
  /etc/mongod.rs2.conf
3. 建立存放replica set數據資料夾
  mkdir /var/lib/rs0/data/db
  mkdir /var/lib/rs1/data/db
  mkdir /var/lib/rs2/data/db
4. 編輯配置文檔/etc/mongod.rs0.conf
5. 啟動mongodb
  sudo mongod --host 127.0.0.1 --port 27023
6. rs.initiate()
7. rs.conf()
8. rs.add("127.0.0.1:27021")
9. rs.add("127.0.0.1:27022")
10. 查看副本集集群狀態
rs.status()

## mongod.rs0.conf

rs0,rs1,rs2配置文件的dbpath，logpath，分別對應資料夾路徑

```txt
# Where and how to store data.
storage:
  dbPath: /var/lib/rs0/data/db
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/rs0/mongod.log

# network interfaces
net:
  port: 27021
  bindIp: 0.0.0.0

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:
#  keyFile: /home/replica1
#operationProfiling:

replication:
  replSetName: "thrilled"
#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```

## 插入資料測試

### 啟動

sudo mongo --host 192.168.249.101 --port 27080 -u "Nick" -p "nick0323" --authenticationDatabase "admin"

### insert data

use replicatest
db.collection.insert({
  item:"canvas",qty:100,material:["cotton"],size:{w:55,h:30,ucom:"cm"}
})

db.collection.find()

### connect to primary database to read data

rs0:SECONDARY> db.getMongo().setReadPref('secondaryPreferred')
or
rs0:SECONDARY> db.getMongo().setSlaveOk()

## options to split read/write

在mongoose options配置

```txt
  readPreference:         "secondaryPreferred"
```
