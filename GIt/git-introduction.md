# Git Introduction  
## 簡介  
開源的分布式版本管理系統  
安裝網址：https://git-scm.com/download/mac  

## 基本操作  
- 拉取遠端倉庫  
git clone url  
- 創建本地新倉庫  
git init
- 添加和提交到本地倉庫  
git add .  
git commit -m "代碼提交信息"  
- 推送提交到遠端倉庫  
git push origin masrer  
- 如果未clone遠端倉庫，可將本地新建的倉庫連結到遠端倉庫  
git remote add origin <server>  
- 創建分支並切換  
git checkout -b new_feature  
- 刪除分支  
git branch -d new_feature  
- 推送分支  
git push origin new_feature  
- 更新  
git pull  
- 還原至遠端倉庫的版本  
git fetch  
git reset --hard origin/master  
- 設定配置 name and email  
git config --global user.name "username"  
git config --global user.email username@example.com  
- 查看配置  
git config --list  