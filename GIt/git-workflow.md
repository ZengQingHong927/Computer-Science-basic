# Git workflow

## Git Tree

1. gitk&  路径切换到项目里打开Git tree
2. git gui&  路径切换到项目里打开Git gui 做commit action
3. git describe --tags
4. git -d (tag version) 删除指定版本号 ex: 在命令行输入 for i in {203..217}; do git tag -d v1.6.20$i; done

## Git Gui

1. Rescan 扫描变动的代码
2. Stage Changed  在Unstaged Changes 选取欲提交的文件，显示在Staged Changes
3. Commit Message - fix xxx
4. Commit 提交

## 常用指令

1. git fetch apollo --tags (v1.5.16600, v1.5.16601, v1.5.16602) 拉取远端apollo所有版本号
2. git rebase v.1.5.16602  本地版本合并刚刚从远端拉取得最后版本号，将本地版本号指向最新版本号
3. git tag v1.5.166xxx  commit完打版本号
4. git push apollo --tags  将代码推送至远端库

## Git Merge Conflict

1. git mergetool -t opendiff
2. command D
3. command S
4. Control C
5. git rebase --continue
6. git tag 打印版本号
7. git push apollo --tags

## Git Reset

1. git reset —hard v1.6.xxxx
2. git reset —hard xxxxxxxxxxxxx (SHA1 ID)
3. git reset --soft HEAD~2 (回退兩個commit)

## Git 小技巧

1. git reflog 查看git操作记录
2. git stash 将目前工作先存进暂存区，拉取代码更新完后再stash pop，若有冲突手动合并冲突
3. git checkout stella-v1.6 切换分支
4. git describe —tags 查看当前所在位置
5. git fetch apollo —tags -f 强制更新为远端版本
6. for i in {24724..24785}; do git tag -d v1.6.$i; done 在命令行輸入指令循環刪除連續tag
7. git push origin :<分支名稱> (刪除遠端分支)
8. git push origin <分支名稱> (提交遠端分支)

## Git conflict

推送分支merge request 衝突（本地端解決衝突）

1. git checkout master (local)
2. git pull --rebase upstream master (local)
3. git checkout BDM-3419
4. git rebase master
5. fix conflict
6. git add xxx (修正的文件)
7. git commit -a -m 'BDM-3419: xxx'
8. git rebase --continue
9. git push origin BDM-3419 (local 端更新master rebase到master最新代碼，解決rebase conflict，推分支到自己的repo)
10. 若 git push origin BDM-3419被rejected（remote head behind local branch）
11. git push origin :BDM-3419（刪除遠端分支） git push origin BDM-3419（提交本地分支）

## Git 提交本地代碼

1. 創建專案 create-react-app project-name
2. git init
3. git remote add origin https://github.com/ZengQingHong927/xxx.git
4. git add .
5. git commit -m 'init'
6. git push origin master

