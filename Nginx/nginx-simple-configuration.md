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

- 啟動Nginx會使用以下配置文件  
/etc/nginx/nginx.conf
/etc/nginx/sites-available/*
/etc/nginx/sites-enabled/*