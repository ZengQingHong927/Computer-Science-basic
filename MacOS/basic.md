# MacOS

## 查看端口

lsof -i:port

## 殺掉進程

kill -9 pid

## 開機運行bash_profile

1. touch ~/.bash_profile
2. typein command as below
3. save

```t
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm
```

## Terminal

每次~/.bash_profile中配置環境變量，重啟终端後配置不生效，需要重新執行： $source ~/.bash_profile
發現zsh加载的是 ~/.zshrc文件，在行末增加source ~/.bash_profile任務

1. touch ~/.zshrc，開機執行腳本載入nvm命令工具

```t
source ~/.bash_profile
```

### 添加ll command in .bash_rpofile

alias ll='ls -lGaf'
alias sourcetree='open -a SourceTree'
