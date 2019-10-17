# MacOS
## 查看端口
lsof -i:port
## 殺掉進程
kill -9 pid
## 開機運行bash_profile
1. touch ~/.bash_profile
2. input command as below
```t
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm
```