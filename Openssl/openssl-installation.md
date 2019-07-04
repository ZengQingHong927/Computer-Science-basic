# Openssl Installation
## Linux  
* 源碼連結 https://github.com/openssl/openssl.git
* TLS v1.3 support  (縮短時間和刪除不安全的加密算法)
### 前置作業toolkit gcc & make  
* sudo apt-get update
* sudo apt-get install gcc & make  
### 安裝步驟
1.下載的壓縮包放在根目錄  
2.解壓縮tar -zxf xxx.tar.gz  
3.進入資料夾  
4.執行命令 ./config  --prefix=/usr/local/openssl（安裝路徑）  
5.執行命令./config -t  
6.執行make，編譯openssl  
7.編譯完執行make install  
8.執行cd /usr/local
9.查看版本openssl version
## Mac OS