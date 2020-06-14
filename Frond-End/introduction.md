# 前端工程化

參考網址：<https://github.com/fouber/blog/issues/10>

## 框架選型

## 簡單構建優化

壓縮，校驗，合併

## 模塊化開發

### JS模塊

- 獨立算法和數據單元，環境檢測，網絡請求，應用配置，DOM操作，工具函數

### CSS模塊

- 獨立的功能性樣式單元，匝格系統，字體圖標，動畫樣式，組件裡的樣式

### UI組件

- 獨立的可視/可交互功能單元，頁頭，頁尾，導航欄，搜索框
- 頁面

### UI組件的容器

- 多個頁面組成

## 智能靜態資源管理

模塊組件加載，增量下載，設計每個頁面資源下載策略，按需下載緩存客戶端。按需下載，延遲加載，預加載，請求合併。
瀏覽器的緩存，緩存更新，緩存共享，非覆蓋式發布
Facebook-PHD David Wei：靜態資源管理系統 = 資源表 + 資源加載框架

## 頁面加載完成

```js
 function docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    function getProductList() {
        axios.get('/index/product/list').then(res => {
            res.data.map(p => {
                console.log(p.level)
                let prod = document.querySelector('#product');
                var pod = document.createElement("li");
                pod.innerHTML = `Level: ${p.level}`;
                prod.appendChild(pod);
            })
        })
    }
    docReady(()=>{
        console.log('Welcome my web site-------');
    })
```

## Web性能提升

1. 網絡傳輸性能

2. 頁面渲染性能

3. JS阻塞性能

## 網絡傳輸性能

navigation timimg監測指標圖，瀏覽器得到用戶請求後，經歷以下階段：重定向，拉取緩存，DNS查詢，建立TCP連結，發起請求，接收響應，處理HTML元素，元素加載完成

- 瀏覽器緩存
- 資源打包壓縮
- 圖片資源優化
- 網絡傳輸性能檢測工具（Page Speed）
- CDN加速

瀏覽器緩存，默認放在內存，關閉瀏覽器或進程會被清除，有Header的Etag字段則瀏覽器將本次緩存寫入硬盤。只有服務器發起驗證請求並確認緩存未被更新，才會返回304
Nginx配置
nginx.conf
etag: on;       // 開啟驗證
expires 7d;     // 設置緩存過期時間7天

資源打包壓縮