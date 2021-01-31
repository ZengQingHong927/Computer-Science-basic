# Nginx - Basic Operation

- 重啟Nginx  
sudo nginx -s reload  
- 快速關閉Nginx，不保存相關信息  
sudo nginx -s stop  
- 平穩關閉Nginx，保存相關信息
sudo nginx -s quit
- 測試Nginx
sudo nginx -t  
- 為Nginx指定一個配置文件
sudo nginx -c file_name  
- 重新開啟日誌
sudo nginx -s reopen

## nginx: [error] invalid PID number "" in "/run/nginx.pid"

- sudo nginx -c /etc/nginx/nginx.conf

## nginx: [emerg] a duplicate default server for 0.0.0.0:80 in /etc/nginx/sites-enabled/

- 刪除 /etc/nginx/sites-available/default

## nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)

fuser -k 80/tcp  
ps -A | grep nginx  
kill -9 pid1  
kill -9 pid2  
sudo netstat -tulpn  

## open() "/var/run/nginx/nginx.pid" failed (2: No such file or directory) 編輯 /etc/nginx/nignx.cnf

pid /logs/nginx.pid -> /usr/local/nginx/logs/nginx.pid;  
創建 /usr/local/nginx/logs;  
nginx -s reload

## 查詢Nginx服務狀態

sudo service nginx status
sudo service nginx restart
sudo service nginx start

## 測試配置文件

sudo nginx -t -c /etc/nginx/nginx.conf

## 啟動指定nginx.conf文件 (前端項目啟動)

nginx -c /path/to/nginx.conf

## firewal list

檢查防火牆
sudo ufw app list
Available applications:
Nginx Full
Nginx HTTP
Nginx HTTPS
OpenSSH

sudo ufw allow 'Nginx HTTP'
sudo ufw status
Status: active

```t
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx HTTP                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```
