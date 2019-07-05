# Http/Https - Introduction
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
## 在index file引入server.key和server.crt