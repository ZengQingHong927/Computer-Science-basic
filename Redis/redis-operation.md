# Redis - Operation  
## 基本操作  
- 指定配置文件啟動redis服務器  
./redis-server redis.conf  
- 進入redis客戶端，進行驗證  
redis-cli  
auth password  
- 客戶端查詢數據儲存路徑  
config get dir  
- 客戶端設置配置  
config set stop-writes-on-bgsave-error no  
- 切換數據庫  
select [number]  
- 客戶端關閉redis服務器  
shutdown  

#基本操作數據
SET mykey abc123
GET mykey
DEL mykey
DBSIZE
FLUSHALL
KEYS *