# HTTP/HTTPS - Introduction
## SSL證書
### 主要用途：加密和身份證明，可向第三方CA機構申請
### 證書等級：IV, OV, EV，需要付費
* 個人：DV(Domain Validation), IV(Idendity Validatio)
* 企業：OV(Organization Validation), EV(Extended Validation)

## SSL生成步驟
### 必要文件：private.key, example.csr和example.crt(CA簽發或自己簽發)  
1. 生成rsa私鑰和csr文件
2. 提交給CA機構簽屬發回crt文件
3. 配置HTTPS網站
* CSR：證書簽署請求文件，包含私鑰信息和標示名，CA機構使用此私鑰對證書加密生成crt文件，裡面包含證書加密信息，公鑰和標示名
* Key：證書申請者的私鑰文件，和證書裡的公鑰配對使用，在https握手通訊過程，需要使用私鑰解密，瀏覽器發來的公鑰加密後的隨機數信息
* 生成命令 openssl req -new -newkey rsa:2048 -sha256 -nodes -out example_com.csr -keyout example_com.key -subj "/C=CN/ST=ShenZhen/L=ShenZhen/O=Example Inc./OU=Web Security/CN=example.com"
* C：country, 單位所在國家，兩位數國碼
* ST：state, 單位所在的州或省
* L: Locality, 單位所在的市或縣
* O: Organization, 網站所屬單位名稱
* OU: Origanization Unit, 下屬部門或產品相關信息或身分驗證類型
* CN: Common Name, 網站域名  
生成csr文件後提交給CA機構，簽署成功後獲得crt文件，即SSL證書，就可以配置HTTPS  
## 自己簽發SSL證書  
* openssl genrsa -out server.key 1024  // 生成服務端私鑰
* openssl rsa -in server.key -pubout -out server.pem  // 生成服務端公鑰
* openssl genrsa -out ca.key 1024 // 生成CA公鑰
* openssl req -new -key ca.key -out ca.csr // 生成csr文件
* openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt // 生成自簽名證書
* openssl req -new -key server.key -out server.csr // 生成csr文件
* openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt // 生成帶有CA簽名的證書  

## HTTPS建置步驟
### 1.創建自己的CA機構
* openssl genrsa -out ca-key.pem -des 1024
* openssl req -new -key ca-key.pem -out ca-csr.pem
* openssl x509 -req -in ca-csr.pem -signkey ca-key.pem -out ca-cert.pem
### 2.創建服務器端證書
* openssl genrsa -out server-key.pem 1024
* openssl req -new -key server-key.pem -config openssl.cnf -out server-csr.pem
* openssl x509 -req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-csr.pem -out server-cert.pem -extensions v3_req -extfile openssl.cnf

### 3.服務器代碼
```js
var https = require('https');  
var fs = require('fs');  

var options = {  
	key: fs.readFileSync('./keys/server-key.pem'),  
	ca: fs.readFileSync('./keys/ca-cert.pem'),  
	cert: fs.readFileSync('./keys/server-cert.pem')  
};  

https.createServer(options,function(req,res){  
	res.writeHead(200);  
	res.end('hello world\n');  
}).listen(3000,'127.0.0.1');  
```
### 4.SSL for Free申請SSL證書
1. SSL for Free 網址：https://www.sslforfree.com/  
2. Create Free SSL Certificate 輸入框 輸入申請的網域名稱  
3. 選擇手動驗證 manual verification & 點擊Manually Verify Domain  
4. 下載Download File #1，Download File #2  
5. 在資料夾根路徑創建.well-known/acme-challenge資料夾  
6. 將剛才下載的兩個檔案放在.well-known/acme-challenge資料夾下
7. 點擊下一步驟兩個連結，測試是否成功取得.well-known/acme-challenge/file  
8. 點擊Download SSL Certificate，下載SSL證書  
9. 將SSL證書上傳至服務器，並引用certificate相關文件  
