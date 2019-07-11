# PostgreSQL - Installation  
## 安装步骤
- MacOS  
1. 查詢可安裝的版本
brew search postgresql  
2. 安裝版本10
brew install postgresql@10  
3. 啟動Postgresql，database 目錄：/usr/local/var/postgres  
pg_ctl -D /usr/local/var/postgres start/stop/restart/status
4. 查詢版本  
postgres --version
5. 配置目錄：/usr/local/var/postgres/postgresql.conf
6. brew services start postgresql

## 基本操作  
- 創建默認名為user的數據庫  
createdb  
- 創建默認指定名為alpha的數據庫  
createdb alpha  
- 用superuser創建數據庫  
createdb -U postgres databasename
- 刪除數據庫  
dropdb -U username databasename
- 以superuser創建用戶賦予權限  
createuser -U postgres username

## 命令行操作
- 連線betadb
psql betadb
- 以某個用戶連線某個數據庫
psql -U username -d databasename
- 查看所有數據庫  
psql -l

## 數據庫操作命令
- 數據庫列表  
\l
- 關聯表  
\d
- 用戶權限列表  
\du