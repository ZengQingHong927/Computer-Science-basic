# Vsftp
## 安装步骤
安装
- sudo apt-get install vsftpd -y
起動
- sudo systemctl start vsftpd
- sudo systemctl enable vsftpd
加入用戶
- sudo adduser vsftp
創建ftp目錄並設置所有權
- sudo mkdir /home/vsftp/ftp
- sudo chown nobody:nogroup /home/vsftp/ftp
- sudo chmod a-w /home/vsftp/ftp (w+r 775)
創建可上傳文件目錄,並為vsftp設置所有權
- sudo mkdir /home/vsftp/ftp/test
- sudo chown vsftp:vsftp /home/vsftp/ftp/test
設置vsftp conf
- sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak
- sudo nano /etc/vsftpd.conf

```t
listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
pasv_enable=Yes
pasv_min_port=10000
pasv_max_port=11000
user_sub_token=$USER
local_root=/home/$USER/ftp
userlist_enable=YES
userlist_file=/etc/vsftpd.userlist
userlist_deny=NO
```

添加用戶名單
- sudo nano /etc/vsftpd.userlist (內容vsftp)
- sudo systemctl restart vsftpd
- ftp:// 主機ip, 瀏覽器測試vsftp服務器運行
## 使用SSL/TLS保護vsftp
啟用SSL/TLS來加密通過FTP傳輸數據,創建證書使用openssl創建證書，執行完openssl會在/etc/cert/生成證書和/etc/cert/private生成key  
- sudo mkdir /etc/cert  
- sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/cert/vsftpd.pem -out /etc/cert/vsftpd.pem  
- sudo nano /etc/vsftpd.conf  

```t
rsa_cert_file=/etc/cert/vsftpd.pem
rsa_private_key_file=/etc/cert/vsftpd.pem
ssl_enable=YES
allow_anon_ssl=NO
force_local_data_ssl=YES
force_local_logins_ssl=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO
require_ssl_reuse=NO
ssl_ciphers=HIGH
```

- sudo systemctl restart vsftpd
## 安裝Filezella使用SSL/TLS ftp加密服務
- sudo apt-get install filezilla -y
- 啟動filezella
- file -> site manager -> new site, host, protocol:FTP, encrypt:require explicit FTP over TLS, Logon Type: ask for password, User/Password
- connect

vsftpd.conf新增設定項
```txt
pasv_max_port=11000
user_sub_token=$USER
local_root=/home/$USER/ftp
userlist_enable=YES
userlist_file=/etc/vsftpd.userlist
userlist_deny=NO
ssl_enable=YES
allow_anon_ssl=NO
force_local_data_ssl=YES
force_local_logins_ssl=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO
require_ssl_reuse=NO
ssl_ciphers=HIGH
```