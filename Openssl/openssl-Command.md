# Openssl Command

## 非對稱公私鑰生成

* 生成RSA私鑰（無加密）  
openssl genrsa -out private.key 2048
* 生成RSA公鑰  

openssl rsa -in private.key -pubout -out public.key

---

* 生成私鑰（aes加密）  
openssl genrsa -aes256 -passout -pass:abc123 -out aes-private.key 2048 (passout代替shell輸入密碼，否則提示輸入密碼)

* 生成RSA公鑰（需要提示密碼）  
openssl rsa -in aes-private.key -passin -pass:abc123 -pubout -out aes-public.key  

## 生成自簽名證書

* 生成RSA私鑰和自簽名證書
openssl req -newkey rsa:2048 -nodes -keyout private.key -x509 -days 365 -out cert.crt   
(req是證書請求的子命令，-newkey rsa:2048 -keyout aes-private.key.pem 表示生成私鑰(PKCS8格式)，-nodes 表示私鑰不加密，若不带參數將提示密碼輸入；
-x509表示输出證書，-days365 為有效期，此後根據提示輸入擁有者的信息；
若執行自動输入，可使用-subj選項)  
openssl req -newkey rsa:2048 -nodes -keyout rsa_private.key -x509 -days 365 -out cert.crt -subj "/C=CN/ST=GD/L=SZ/O=vihoo/OU=dev/CN=vivo.com/emailAddress=yy@vivo.com"

* 使用已有的私鑰生成證書
openssl req -new -x509 -days 365 -keys aes-private.key -out cert.crt (-new 生成證書請求，x509表示直接輸出證書，-key指定私鑰)

## 生成簽名請求和CA簽名

openssl genrsa -aes256 -passout pass:abc123 -out server.key 2048  
openssl req -new -key server.key -out server.csr（此後輸入密碼、server證書信息完成，也可以命令行指定各類參數）  
openssl req -new -key server.key -passin pass:abc123 -out server.csr -subj "/C=CN/ST=GD/L=SZ/O=vihoo/OU=dev/CN=vivo.com/emailAddress=yy@vivo.com"（此時生成的csr簽名請求文件可提交至CA進行簽發）  
openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey ca.key -passin pass:111111 -CAcreateserial -out server.crt（自簽發crt文件）
