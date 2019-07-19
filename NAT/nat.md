# NAT-iptables  
## 操作  
- 觀察目前設定  
sudo iptables -L -n 
- 清除預設表 filter 中，所有規則鏈中的規則  
sudo iptables -F
- 清除預設表 filter 中，使用者自訂鏈中的規則  
sudo iptables -X
- 清除mangle表中，所有規則鏈中的規則  
sudo iptables -F -t mangle
- 清除mangle表中，使用者自訂鏈中的規則  
sudo iptables -t mangle -X
- 清除nat表中，所有規則鏈中的規則  
sudo iptables -F -t nat
- 清除nat表中，使用者自訂鏈中的規則  
sudo iptables -t nat -X  

參數說明：  
-F ：清除所有的已訂定的規則;  
-X ：殺掉所有使用者建立的 tables;  
-Z ：將所有的 chain 的計數與流量統計都歸零;  

## 設定轉發端口  
# localhost/loopback
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000

# external
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
sudo iptables -t nat -I PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 3010

Mac OS (This does not work in OSX Yosemite. If anyone knows how to do that, please comment!):

sudo ipfw add 1 forward 127.0.0.1,3000 ip from any to any 80 in