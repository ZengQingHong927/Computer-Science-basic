# PM2 - Tutorials
* 用途
進程管理工具，包括守護進程，監控，日誌等功能
* 官方文檔 http://pm2.keymetrics.io/docs/usage/quick-start
---
* 安裝
npm install pm2 -g // 全局安裝
$HOME/.pm2 // 日誌存放路徑
* 基本指令
pm2 start app.js
pm2 start app.js -i 4 // 啟用cluster mode，四個應用程序自動進行負載均衡
pm2 start app.js --name="myapp" // 啟動並命名為myapp
pm2 start app.js --watch // 啟動應用，當文件更改時重起應用
pm2 list // 列表pm2啟動所有程序
pm2 show "app name" // 顯示應用所有信息
pm2 logs // 顯示日誌
pm2 logs "app name" // 顯示指定應用的日誌
pm2 stop "pm2啟動應用的id"
pm2 stop all
pm2 restat all
pm2 reload all
pm2 delete all
pm2 delete "pm2啟動應用的id"

## grep pid
https://stackoverflow.com/questions/34829550/how-do-i-get-just-the-app-id-with-pm2