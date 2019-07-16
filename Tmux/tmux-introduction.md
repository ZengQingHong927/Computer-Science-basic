# Tmux - Introduction  
## 簡介
遠端登入主機，在單一終端機運行多個終端機會話，關閉終端時，原終端執行的進程不會中斷。
## 安裝
- Ubuntu安裝  
sudo apt-get install tmux
- MacOS安裝  
brew install tmux  
## 使用方法  
打開終端機，輸入tmux即可進入。  
tmux list 列出所有開啟的會話  
### 常用指令
激活指令 ctrl+b  
d 脫離當前會話  
D 脫離指定會話  
r 強制重繪未脫離的會話  
s 選擇並切換會話  
c 創建新窗口  
& 關閉當前窗口  
數字鍵 切換指定窗口  
p 切換至上一個窗口  
n 切換至下一個窗口  
“ 當前面板分割為上下兩塊  
% 當前面板分割為左右兩塊  