# Basic Middleware  
## 常用nodejs 中間件  
1. body-parser  

- 處理數據的四種方法  
bodyParser.json(options), bodyParser.raw(options), bodyParser.text(options), bodyParser.urlencoded(options)
- 解析各種json格式數據  
app.use(bodyParser.json({ type: 'application/*+json' });  
- 解析buffer格式數據  
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));  
- 解析文本網頁  
app.use(bodyParser.text({ type: 'text/html' }));

2. compression  
3. cookie-session  
4. express-session  
5. cookie-parser  
6. static-favicon  
7. method-override  
8. formidable
處理大型文檔數據，例如：excel,image  
9. cors(cross-origin-resource-sharing)  
針對不同協議，網域，或端口請求資源，發起一個跨域http請求，基於安全，瀏覽器限制腳本發起跨域http請求，除非響應的頭文包含正確的響應頭。允許AJAX(XMLHttpRequest)，Fetch使用跨域請求  

cors default options
```js
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```
cors customized options  
```js
const corsOptions = {
  origin: [
    'http://www.example.com',
    'http://localhost:8080',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
```
10. helmet  
適當設置http報頭，提供app保護
參考網址：https://expressjs.com/zh-tw/advanced/best-practice-security.html
- 基本用法
```js
app.use(helmet())
```