# Nginx-Configuration  

http {

  upstream localhhost {
    server 127.0.0.1:3000, weight=1;
    server 127.0.0.1:3010, weight=1;
  }

  server {
    listen       80; // 監聽端口
    server_name  localhost; // 配置訪問域名

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host  $http_host;
      proxy_set_header X-Nginx-Proxy true;
      proxy_set_header Connection "";
      proxy_pass http://localhost;
      # root   html;
      # index  index.html index.htm;
    }
  }

}