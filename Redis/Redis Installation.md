# Redis - Installation

<https://www.digitalocean.com/community/tutorials/how-to-install-redis-from-source-on-ubuntu-18-04>
<https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04>
<https://tecadmin.net/install-redis-ubuntu/>

## 安裝步驟

1. apt套件管理
sudo apt-get update
sudo apt install redis-server

2. 參考網頁：<https://redis.io/download>

- 進入目錄
cd redis-5.0.5
- 編譯
make
- 進入src編譯安裝路徑/usr/local/redis
cd src
make install PREFIX=/usr/local/redis
- 複製配置文件至/usr/local/redis/bin
cp ~/redis-5.0.5/redis.conf /usr/local/redis/bin
- 創建目錄儲存redis數據
mkdir /usr/local/redisdb
- 修改配置文件，dir /usr/local/redisdb, search # The working directory
dir /usr/local/redisdb
- 設置日誌路徑 search logfile
logfile "/usr/local/redis/redis.log"

## redis 配置文件

配置文件：背景執行
daemonize yes
資料檔案儲存路徑
dir
日誌儲存路徑
logfile
資料庫數量
database
主從複製
slaveof
修改遠程連線IP
bind
開啟驗證
requirepass
管理redis服務的應用
supervised

## redis Tools

redis-server redis伺服器
redis-cli redis命令列客戶端
redis-benchmark redis效能測試工具
redis-check-aof AOF檔案修復工具
redis-check-rdb RDB檔案檢索工具
