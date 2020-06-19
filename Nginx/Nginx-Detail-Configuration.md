# Nginx-Configuration

<https://blog.csdn.net/tsummerb/article/details/79248015>

## Path /etc/nginx/nginx.cnf

添加用戶名和群組  
groupadd nobody  
useradd -g nodybody  
配置文件結構：main，包含Events和Http，Http包含upsteam和多個server，Server包含多個location
***

```t
#user  nobody; // 主機用戶名  
worker_processes  1; // 工作進程數目根據CPU核心數，每個nginx進程耗費10~20M內存

#error_log  /usr/local/webserver/nginx/logs/nginx_error.log crit; // 錯誤日誌位置和級別
#error_log  logs/error.log  notice;  
#error_log  logs/error.log  info;  

#pid        logs/nginx.pid;  // 進程標示符存放路徑
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;  // 一個nginx可以打開最多文件描述符，與Linux kernel有關,default 65535，Linux kernel 2.4以上可用

events {
    #进行如下配置
    use epoll; // I/O模型，linux epoll，FreeBSD:kqueue，windows:不指定
    worker_connections  65535;  // 工作進程最大連結數量，理论上每台nginx服务器的最大连接数为。worker_processes*worker_connections  
    keepalive_timeout 60; // 超時時間secs  
    client_header_buffer_size 4096; //  客戶端請求頭部的緩衝大小，根據系統分頁大小設置，一般請求頭部不超過1K，設置為系統分頁整數倍。分页大小可以用命令getconf PAGESIZE 取得。  
    open_file_cache max=65535 inactive=60s; // 打開文件指定緩存，默認關閉，max指定緩存數量，建議和打開文件數一致，inactive是指打開文件經過多長時間沒被請求即刪除緩存。  
    open_file_cache_valid 80s; // 多長時間檢查一次緩存有效信息。
    open_file_cache_min_uses 1; // open_file_cache指令中的inactiv參數時間內文件最少使用次數，如果超過這個數字，文件描述符是在緩存中一直打開，如上例，一個文件在inactive時間內一次沒使用過，它將被刪除。  
}

### 設定http服務器，反向代理功能實現負載均衡
```

```t
http {
    include       mime.types; // 設定mime類型
    default_type  application/octet-stream;

     log_format  main  '$remote_addr - $remote_user [$time_local]‘ '$status $body_bytes_sent "$http_referer" ''"$http_user_agent" "$http_x_forwarded_for"';  
    log_format log404 '$status [$time_local] $remote_addr $host$request_uri $sent_http_location'; // 日誌格式設置  
    $remote_addr与$http_x_forwarded_for用以記錄客戶端的ip地址；
    $remote_user：用來記錄客戶端的用戶名；
    $time_local： 用來記錄訪問的時間和時區；
    $request： 用來記錄請求的url和http協議；
    $status： 用來記錄請求狀態，成功是200；
    $body_bytes_sent ：紀錄發送給客戶端文件主體大小；
    $http_referer：用來記錄從那個頁面發送過來；
    $http_user_agent：記錄客戶端相關瀏覽器信息；  

#access_log  logs/access.log  main; // 用了log_format指令設置日誌格式之後，需要access_log指令指定日誌文件存放路徑  
#client_header_buffer_size 4k; // 客戶端請求頭部大小緩衝區  
#large_client_header_buffers 8 128k; // 客戶端請求頭部大小緩衝區  
#open_file_cache max=102400 inactive=20s; // 指定文件緩存是否啟用。例: #open_file_cache max=1000 inactive=20s;  
#open_file_cache_valid 30s;  
#open_file_cache_min_uses 2;  
#open_file_cache_errors on;  
#client_max_body_size 300m; // 通過nginx上傳文件大小

sendfile        on; // 一般設為on
tcp_nopush      on; // 啟用sendfile時使用  
tcp_nodelay on;  
#proxy_connect_timeout 90; // 後端服務器連結的超時時間  
#proxy_read_timeout 180; // 後端服務器處理請求的時間  
#proxy_send_timeout 180; // 後端服務器回傳數據的時間  
#proxy_buffer_size 256k; // 後端服務器讀取的緩衝區大小  
#proxy_buffers 4 256k;  
#proxy_temp_file_write_size 256k; // 設置寫入proxy_temp_path時的數據大小，預防一個工作進程文件阻塞時間太長
#proxy_temp_path /data0/proxy_temp_dir; // proxy_temp_path和proxy_cache_path指定的路徑必須在同一分區
#proxy_cache_path /data0/proxy_cache_dir levels=1:2 keys_zone=cache_one:200m inactive=1d max_size=30g; // 設置內存緩衝區大小為200MB，一天沒有被訪問的內容自動清除，硬盤緩衝區大小為30G。  

keepalive_timeout  120;  
#client_body_buffer_size 512k; // 默認是系統操作頁面大小的兩倍，可能出現internal server error 502  
#proxy_intercept_errors on; // 表示使nginx阻止http應答代碼400或者更高  

#upstream bakend {
#  server 127.0.0.1:8027;
#  server 127.0.0.1:8028;
#  server 127.0.0.1:8029;
#  hash $request_uri;
#}
// nginx的upstream目前支持四種配置，1：輪詢（默認）每個請求按時間順序逐一分配到服務器後端，如果後端服務器掛掉，能自動剔除。2：weight指定輪詢權重，weight和訪問比率成正比，用於毫端服務器性能不均的情形。例如：upstream bakend { server 192.168.0.14 weight=10; server 192.168.0.15 weight=10; }。3：IP hash，每個請求按ip hash結果分配，如此每個訪客固定訪問同一個後端服務器，可以解决session的問題。例如 upstream bakend { ip_hash; server 192.168.0.14:88; server 192.168.0.15:80; }。3：fair（第三方 按後端服務器響應時間來分配，響應時間短的先分配。upstream backend { server server1; server server2; fair; }。4、url_hash（第三方）按訪問url hash結果來分配請求，是同一個url定向到同一個後端服務器，後端服務器為緩存時較有效。例：在upstream中加入hash語句，server語句中不能寫入weight等其它的參數，hash_method為使用的hash算法，upstream backend { server squid1:3128; server squid2:3128; hash $request_uri; hash_method crc32; }  
#tips: upstream bakend{#定義負載均衡設備的ip和設備狀態}{ ip_hash; server 127.0.0.1:9090 down; server 127.0.0.1:8080 weight=2; server 127.0.0.1:6060; server 127.0.0.1:7070 backup; } 在需要使用負載均衡的server中增加proxy_pass http://bakend/; 每個設備狀態設置為: 1：down表示當前server不參與負載。2：weight越大，負載的權重越大。3：max_fails：允許請求失敗的次數默認為1，當超過最大次數時，返回proxy_next_upstream定義的錯誤。4：fail_timeout:max_fails次失敗後，暫停的時間。5：backup：其他所有非backup機器掛掉或忙碌的時候，qingqiubackup機器，因此這台機器壓力最輕。  

#gzip  on; // 實時壓縮數據流  
#gzip_min_length 1k;  
#gzip_buffers 4 16k;  
#gzip_http_version 1.1;  
#gzip_comp_level 2; // 壓縮比，1最小，9最大

#主机配置
server {
    listen       80; // 監聽端口
    server_name  localhost; // 配置訪問域名

    #charset koi8-r;

    #access_log  logs/host.access.log  main;
    location ~* \.(mp3|exe)$ { // 對以".mp3或.exe"結尾的路徑進行負載均衡
      proxy_pass http://img_relay$request_uri; // 設置被代理的後端服務器的端口和套接字，以及URL  
      proxy_set_header Host $host;  
      proxy_set_header X-Real-IP $remote_addr;  
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
      以上三行，目的是将代理服务器收到的用户的信息传到真实服务器上
    }  
    #root /var/www/html // 虛擬主機的網頁根目錄
    #修改反向代理地址
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
       proxy_pass http://127.0.0.1:3000;
       proxy_redirect default;
       # root   html;
       #index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


# another virtual host using mix of IP-, name-, and port-based configuration
#
#server {
#    listen       8000;
#    listen       somename:8080;
#    server_name  somename  alias  another.alias;

#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}


# HTTPS server
#
#server {
#    listen       443 ssl;
#    server_name  localhost;

#    ssl_certificate      cert.pem;
#    ssl_certificate_key  cert.key;

#    ssl_session_cache    shared:SSL:1m;
#    ssl_session_timeout  5m;

#    ssl_ciphers  HIGH:!aNULL:!MD5;
#    ssl_prefer_server_ciphers  on;

#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}
```
