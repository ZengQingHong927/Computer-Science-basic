# Git Introduction

## 簡介

開源的分布式版本管理系統
<https://git-scm.com/download/mac>
<https://www.itread01.com/content/1526840415.html>
<https://www.slideshare.net/WillHuangTW/git-merge-rebase>
<https://backlog.com/git-tutorial/tagging/add-tag/>
<https://linuxhint.com/best_git_gui_clients_ubuntu/>

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
git remote add origin "server"
- 創建分支並切換
git checkout -b new_feature
- 刪除分支
git branch -d new_feature
- 推送分支
git push origin new_feature
- 更新
git pull
- 還原至遠端倉庫的版本
git commit --amend
- 修改commit 備註
git fetch
git reset --hard sha (修改的部分完全刪除)
git reset --soft sha (修改的部分保留在工作區)
- 設定配置 name and email
git config --global user.name "username"
git config --global user.email username@example.com
- 查看配置
git config --system --list
git config --global --list
git config --local --list

- git checkout 檔名 or . (可以恢復檔案)
- rebase後反悔
git reset ORIG_HEAD --hard (返回上一個commit狀態，不管是rebase，merge動作)

- 刪除分支（D強行刪除）
git branch -D cat

- 恢復分支（從新在commit上貼上標籤new_cat）
git branch new_cat commitID

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
3. git remote add origin <https://xxx.xxx.xxx/xxx.git>
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
3. git fetch origin master --tags
4. git rebase v1.xx.xxx
5. git push origin master --tags

## gitignore

<https://www.cnblogs.com/kevingrace/p/5690241.html>
*.log
*.tmp
node_modules/

## gitk or Sourcetree

1. 點擊commit的點，右鍵選擇reverse commit，會生成一個commit點，這個reverse commit的變更動作就是取消上一個commit的變更

2. git reset HEAD^ --soft 回到前一個commit

3. git reset HEAD～3 --soft 回到前三個commit

4. git reset 165b8d5 --hard 往前跳至165b8d5 commit點（git reflog查看刪掉的commit點的sha）

5. 假若merge 分支後，想reverse回merge前的commit，可以在gui介面想回到的commit點右鍵reset master to this commit
