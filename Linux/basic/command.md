# Command  
## 套件安裝升級  
更新：apt-get update  
更新 /etc/apt/sources.list 套件清單內容  
通常檢查套件更新時,系統會先檢查套件有沒有什麼變化,如果沒有找到更新的東西會回傳hit或是ign(ignore)  
升級：apt-get upgrade  
升級：apt-get dist-upgrade  
系統如果有重要更新套件 (未安裝過的) 也會一併安裝,也有可能會移除一些套件  
安裝：apt-get install  
移除：apt-get remove  
不用考慮到相依性的問題,系統會自行處理相依性問題  
## 套件移除  
- 移除：apt-get purge  
除了移除程式連設定檔會一併移除掉  
- 清除：apt-get clean  
清除位於 /var/cache/apt/archives 的下載暫存套件檔案  
- 搜尋：apt-cache search packagename  
- 檢視套件：apt-cache show packagename  
可以顯示套件資訊,類似 rpm -qi 的方式  
- 檢視套件：apt-cache showpkg packagename  
- 檢視套件：apt-file  
查詢套件安裝了哪一些檔案  
apt install apt-file  
apt-file update  
## 查詢内核模组狀態
service --status-all
## 查詢作業系統資訊
cat /etc/os-release