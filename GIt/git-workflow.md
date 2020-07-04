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

## Git 小技巧

1. git reflog 查看git操作记录
2. git stash 将目前工作先存进暂存区，拉取代码更新完后再stash pop，若有冲突手动合并冲突
3. git checkout stella-v1.6 切换分支
4. git describe —tags 查看当前所在位置
5. git fetch apollo —tags -f 强制更新为远端版本
