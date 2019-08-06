# Wechat OAuth2.0
## 基本流程  
1. 微信公眾平台申請測試帳號
參考連結：http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index  
2. 獲得appID and appsecret  
3. 關注公眾號  
4. 配置回調域名，服務器註冊的公開域名
5. 授權頁面的請求URL: https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
appid: 公眾號唯一ID
redirect_uri: 授權後的回調uri
response_type: CODE
scope: snsapi_base（只能拿到openid）, snsapi_userinfo（能拿到詳細信息）
state: a-zA-Z0-9,128字節
wechat_redirect（直接在微信打開連結）
6. 拿到的請求結果: code  
http://www.xxxx.com/home?code=0217a07e9c194dbf539c45c266b2dcfZ&state=STATE
7. 換取網頁授權access_token的請求構造URL  
https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
appid: 公眾號appid
secret: 公眾號appsecret
code: code
grant_type: authorization_code
8. 正確時返回JSON數據,和錯誤數據
```js
{access_token,expire_in,refresh_token,openid,scope}
{"errcode":40029,"errmsg":"invalid code"}
```
9. 通過access_token和openid獲取用戶信息
https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID
10. 正確時返回JSON數據,和錯誤數據
```js
{openid,nickname,sex,province,city,country,headimgurl,privilege,unionid}
```