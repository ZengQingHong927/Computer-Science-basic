# Load Balance

## config

sites-available/

http {
    ...
    upstream backaaa {
        #ip_hash;
        server 127.0.0.1:8000;
    }
    upstream backbbb {
        #ip_hash;
        server 127.0.0.1:8001 weight=3 max_fails=2 fail_timeout=30s;
        server 127.0.0.1:8002 weight=2 max_fails=2 fail_timeout=30s;
        server 127.0.0.1:8003 weight=1 max_fails=2 fail_timeout=30s;
    }
    server {
        listen 80;
        server_name <http://backaaa;>
        location / {
            # 设置主机头和客户端真实地址，以便主机获取客户端真实ip
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

            # 禁用缓存
            proxy_buffering off;
            proxy_pass http://backaaa;
        }
    }
    server {
        listen 80;
        server_name http://backbbb;
        location / {
            # 设置主机头和客户端真实地址，以便主机获取客户端真实ip
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

            # 禁用缓存
            proxy_buffering off;
            proxy_pass http://backbbb;
        }
    }
}
