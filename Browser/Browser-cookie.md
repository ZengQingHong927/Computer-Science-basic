# Browser

## Cookie
只能讀寫當前domain的cookie的值.若寫入cookie時，domain的值為“.xxxxx”，則domain為aaa.xxxxx, bbb.xxxxx，皆可以讀取。
本地端測試，cookie的domain欲寫入“.${window.location.hostname}”，須先在/etc/hosts加入127.0.0.1 localhost test.localhost，
進入test.localhost域名，才能寫入cookie domain為“.localhost”
