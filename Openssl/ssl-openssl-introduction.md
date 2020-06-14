# SSL/OpenSSL/SSH

SSL 是一種Secure Sockets Layer協議，提供安全的網路傳輸。OpenSSL實現SSL協議的開源代碼，可以實現數據加解密，消息摘要，數字證書，數字簽名和隨機數字。Openssl官網<https://www.openssl.org/source/>，有三個工具，libssl，libcrypto和openssl。openssl是多功能命令行工具，libssl是實現ssl機制，libcrypto提供多種通用加密庫。  
使用目的：保密性（防止數據被竊取），完整性（防止數據被竄改），身分驗證（確保信息來源可靠）

Ubuntu and CentOS默認pki相關檔案路徑：/etc/pki  
/etc/pki/CA/

* newcerts    存放CA簽署（頒發）數字證書（證書備份目錄）
* private     存放CA備份私鑰
* crl         吊銷的證書  

/etc/pki/tls/

* cert.pem    軟連結certs/ca-bundle.crt  
* certs/      該服務器上的證書存放目錄，可以防止自己的證書和內置證書  
* ca-bundle.crt    内置信任的證書
* private    證書密鑰存放位置
* openssl.cnf    openssl的CA主配置文件  
對稱加密/非對稱加密/單向加密  
對稱加密（密鑰加密）  
加解密使用同一把鑰匙，安全強度取決於密鑰長度  

常用的對稱加密算法：DES, AES，RC4  
常用的非對稱加密算法：RCA, DSA, ECC (加解密時間長)  
單向散裂函數：MD5, SHA (常用於消息摘要)

SSL證書如何建立安全傳輸  
1.瀏覽器連線到一個https保護的網站，請求https網站提供識別自己的身分。  
2.https網站發送ssl證書和https網站自己的公鑰。  
3.瀏覽器拿著https的ssl證書向CAs驗證此證書，是否過期，註銷，若瀏覽器相信此證書，則用https的公鑰加密生成一個對稱會話鑰匙，寄回給https服務器。  
4.https服務器用自己的私鑰解密此對稱會話鑰匙，並使用會話鑰匙加密接受會話通知給瀏覽器，開始會話。  
5.瀏覽器和https網站開始使用相同會話鑰匙加密通訊
