# NVM - Installation

Node JS 版本管理工具
參考連結：<https://github.com/nvm-sh/nvm>

## 安裝步驟

* 下載安裝腳本 curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh> | bash or wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh> | bash
* 安裝路徑 ~/.nvm，開機運行腳本，將在 ~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc加入  
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
* source ~/.bashrc
* 運行nvm -v，是否正常顯示版本

## 基本指令

* nvm install node // 安裝最新版本  
* nvm install 10.6.10 // 安裝指定版本  
* nvm ls-remote // 查看目前可用版本
* nvm run node --version // 正在運行的node版本
* nvm use node // 當前已安裝的node版本
