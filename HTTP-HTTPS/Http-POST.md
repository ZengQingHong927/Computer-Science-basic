# http 常見POST方式

1. application/x-www-form-urlencoded
post的默認請求
需要把對象參數序列化為字符串參數
參數採用類似get的參數拼接方式
使用URIencode轉碼方式，轉碼會增加體積，適合短字節
請求參數放在請求體裡
不在地址欄顯示參數，安全性高

2. multipart/form-data
不轉碼，適合傳輸長字節（如文件）
請求參數放在請求體裡
不在地址欄顯示參數，安全性高

3. applcation/json
