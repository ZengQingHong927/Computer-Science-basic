# Nginx-Installation  
* sudo apt-get install build-essential libtool zlib  (toolkit)
* sudo apt-get install nginx

### Nginx 相關目錄
/usr/sbin/nginx：主程序  
/etc/nginx：存放配置文件  
/usr/share/nginx：存放静态文件  
/var/log/nginx：存放日志

### 啟用Nginx
* 修改配置  /etc/nginx/nginx.cnf  
user 主機用戶名
* 修改配置  /etc/nginx/sites-available/default  
server_name 自訂的domain_name  
proxy_pass http://127.0.0.1:port
* 複製一份到  /etc/nginx/sites-enabled/default
* 測試nginx.cnf是否正確 sudo nginx -t
* 啟動nginx sudo nginx

### Debug Nginx
1. nginx: [emerg] a duplicate default server for 0.0.0.0:80 in /etc/nginx/sites-enabled/...  
刪除/etc/nginx/sites-available/default
2. nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)  
* fuser -k 80/tcp  
* ps -A | grep nginx  
kill -9 pid1  
kill -9 pid2  

3. open() "/var/run/nginx/nginx.pid" failed (2: No such file or directory) 編輯 /etc/nginx/nignx.cnf  
pid /logs/nginx.pid -> /usr/local/nginx/logs/nginx.pid;  
創建 /usr/local/nginx/logs;  
nginx -s reload
