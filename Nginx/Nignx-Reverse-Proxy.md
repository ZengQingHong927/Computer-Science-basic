# Reverse Proxy

## Proxy-Configuration

設置proxy_pass後，同時需要設置proxy_set_header

例如：proxy_pass <http://www.xxx.com/abc/def>; proxy_pass <http://www.xxx.com/abc/def/>

1. 沒有“/”時，location /abc/def可以匹配<font color=#090>/abc/defghi</font>請求，也可以匹配<font color=#090>/abc/def/ghi</font>等

2. 有“/”時，location /abc/def/不能匹配<font color=#090>/abc/defghi</font>請求，只能匹配<font color=#090>/abc/dev/ghi</font>

```txt

server {
        ...
        server_name 需要代理的域名1 需要代理的域名2 需要代理的域名3;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                #try_files $uri $uri/ =404;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host  $http_host; // 代理域名xxx.xxx.com
                proxy_set_header X-Nginx-Proxy true;
                proxy_set_header Connection "";
                proxy_pass http://127.0.0.1:3000;
                proxy_buffering off;
        }
        ...
}
```
