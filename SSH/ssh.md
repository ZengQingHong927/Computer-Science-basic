# SSH 遠程登入

<https://www.linuxidc.com/Linux/2017-12/149623.htm>

## port forward

ssh -L port:localhost:port username@hostname

## 主鑰變更問題

系統重灌導致金鑰不對，可以刪除~/.ssh/known_hosts
