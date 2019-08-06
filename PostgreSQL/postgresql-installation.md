# PostgreSQL - Installation  
## 安装步骤
- MacOS  
1. 查詢可安裝的版本
brew search postgresql  
2. 安裝版本10
brew install postgresql@10  
3. 啟動Postgresql，database 目錄：/usr/local/var/postgres  
4. 查詢版本  
postgres --version
5. 配置目錄：/usr/local/var/postgres/postgresql.conf 
6. 关闭/开启数据库，方法一  
pg_ctl -D /usr/local/var/postgres -m smart/fast/immediate
pg_ctl -D /usr/local/var/postgres start/stop/restart/status
7. 关闭/开启数据库，方法二  
brew services stop postgresql  
8. 开启登入验证功能  
/usr/local/var/postgres/pg_cnf  

## 基本操作  
- 創建默認名為user的數據庫  
createdb  
- 創建默認指定名為alpha的數據庫，owner为username  
createdb alphadb  -O username
- 用superuser創建數據庫  
createdb -U postgres databasename
- 刪除數據庫  
dropdb -U username databasename
- 以superuser創建用戶賦予權限  
createuser -U postgres username
- 刪除用戶
dropuser username

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
- 查詢關聯表的内容  
\d tablename
- 用戶權限列表  
\du
- 切換數據庫
\c databasename

- 查詢語句的選項  
\h CERATE ROLE, ALTER ROLE, GRANT
- SQL語句  
CREATE ROLE username WITH role_authority role_authority...

## 用戶權限設定  
- 先使用superuser進入數據庫  
psql -U superuser -d postgres  
- CREATE ROLE username WITH options
options:(常用)  
    SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'

- ALTER ROLE username WITH options  
options:(常用)  
    SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'

- ALTER ROLE username RENAME TO newname

- ALTER ROLE username WITH PASSWORD '123456'

- GRANT option ON tablename TO username
GRANT SELECT ON ALL TABLES IN SCHEMA PUBLIC to username;  
GRANT ALL ON ALL TABLES IN SCHEMA PUBLIC to username;  
option:(常用)  
    SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER

## 用戶權限驗證設定  
- 修改配置文件pg_hba.conf  
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```  
- pg_ctl reload