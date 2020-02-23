# Git Introduction  
## 簡介  
開源的分布式版本管理系統  
安裝網址：https://git-scm.com/download/mac  
https://www.itread01.com/content/1526840415.html  
https://www.slideshare.net/WillHuangTW/git-merge-rebase  
https://backlog.com/git-tutorial/tagging/add-tag/  
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

## 分支回滚到上一版本  
- 切換分支  
git checkout new_feature  
- 查看git log  
git log  
- 回滚到指定版本，歷史版本的id是fae6966548e3ae76cfa7f38a461c438cf75ba965  
git reset --hard fae6966548e3ae76cfa7f38a461c438cf75ba965  
- 遠端倉庫分支修改  
git push -f -u origin new_feature  
## 推送本地專案至倉庫  
建立本地專案  
1. git init  
2. 在Git服務器建立一個倉庫  
執行git remote add origin  
3. git remote add origin https://xxx.xxx.xxx/xxx.git  
從遠端分支拉取master分支並與本地master分支合併  
4. git pull origin master:master  
提交本地分支到遠端分支  
5. git push -u origin master  

## 免輸入帳號密碼  
git config --global credential.helper store  

## fetch rebase and pull  
- git fetch：这将更新git remote 中所有的远程repo 所包含分支的最新commit-id, 将其记录到.git/FETCH_HEAD文件中。  
- git fetch remote_repo：这将更新名称为remote_repo 的远程repo上的所有branch的最新commit-id，将其记录。   
git fetch remote_repo remote_branch_name：这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name。
git fetch remote_repo remote_branch_name:local_branch_name：这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name ，并在本地创建local_branch_name 本地分支保存远端分支的所有数据。

## code commit flow
1. git add .  
2. git commit -m "message"  
2. git fetch origin master --tags  
3. git rebase v1.xx.xxx  
4. git push origin master --tags

## gitignore  
https://www.cnblogs.com/kevingrace/p/5690241.html  
*.log  
*.tmp  
node_modules/
