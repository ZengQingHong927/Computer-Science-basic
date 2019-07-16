# MongoDB - Installation  
參考網址 https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### 安裝步驟  
1. 選擇作業系統環境和安裝版本，使用命令行安裝
2. 加入public key用於包管理器  
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4  
3. 創建列表MongoDB  
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list  
4. 更新包管理器  
sudo apt-get update  
5. 安裝MongoDB套件  
sudo apt-get install -y mongodb-org  
echo "mongodb-org hold" | sudo dpkg --set-selections  
echo "mongodb-org-server hold" | sudo dpkg --set-selections  
echo "mongodb-org-shell hold" | sudo dpkg --set-selections  
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections  
echo "mongodb-org-tools hold" | sudo dpkg --set-selections  
6. 啟動mongo，sudo service mongod start，預設監聽端口27017  
7. 查看mongo 運行狀態，sudo service mongod status
8. 命令行 mongo，進入mongodb CMI  
9. 相關資料夾  
/var/log/mongodb (日誌)  
/var/lib/mongodb (數據存放路徑)  
/etc/mongod.conf (設定檔)  

### 卸載
sudo apt-get purge mongodb-org*  
sudo rm -r /var/log/mongodb  
sudo rm -r /var/lib/mongodb  
### 安裝GUI Mongo Compass & NoSQLBooster  
參考網址 https://www.mongodb.com/download-center/compass?jmp=docs  
參考網址 https://nosqlbooster.com/downloads
### Compass開啟連線  
1. Hostname // 連線mongodb主機的域名  
2. Port // 連線mongodb主機的端口  
3. Authentication // 連線驗證方式，選username/password  
4. Authentication Database // 選擇創建mongodb用戶的數據庫  
5. click Connect  