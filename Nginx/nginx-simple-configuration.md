# Nginx - configuration  
```t
http {
  # 设置 gzip, gzip_buffers,timeout
  server {
    # 设置虚拟主机的port和网域名称
    access_log /var/log/nginx/nginx.access.log;
    # 网页服务器产生的日志新增放置位置
    location {
      # location 指令會因為不同的URL符合不同的規則
    }
  }
}
```
```t
server {
  listen 80;
  server_name www.xxx.com xxx.com;
  location / {
    proxy_pass 127.0.0.1:3000;
    # 把www.amor-muse.com指到本地端3000 port
  }
}
```
```txt
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    upstream localhost {
	    server 127.0.0.1:3000;
	    server 127.0.0.1:4000;
    }

    server {
        listen       8000;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host  $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_set_header Connection "";
      	    proxy_pass http://localhost;
	    #root   html;
            #index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

- 啟動Nginx會使用以下配置文件  
/etc/nginx/nginx.conf
/etc/nginx/sites-available/*
/etc/nginx/sites-enabled/*