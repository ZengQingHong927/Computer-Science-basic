# JS 模块化

解决命名冲突和文件依赖

区别|ESModule|CommonJS|AMD
---|---|--|---
环境|服务端和浏览器|服务端|浏览器
何时加载|编译|运行|运行
设计思想|静态化
模块是否是对象|否|是|是
是否整体加载模块|否|是|是
是否动态更新（透过接口获取模块内部实时的值）|是（值的引用）|否（值的拷贝|否（值的拷贝）
模块变量是否是只读|是

## ESModule

- 導出/export
- 導入/import

```js
// 錯誤
export 1;

const m = 1;
export m;

// 正確
export const m = 1;

const m = 1;
export { m }

const m = 1;
export { m as module }

import { m } from './module'
import * as module from './module'

```

## CommonJS

- 導出/exports或module.exports
- 導入/require
- 相同模塊只加載一次（判斷模塊引用的絕對路徑）,保證模塊單例

```js
// index.js
require("./moduleA");
var m = require("./moduleB");
console.log(m);

// moduleA.js
var m = require("./moduleB");
setTimeout(() => console.log(m), 1000);

// moduleB.js
var m = new Date().getTime();
module.exports = m;
```

## AMD

AMD: Asynchronous module definition，意爲異步模塊定義，不同於 CommonJS 規範的同步加載，AMD所有模塊默认都是異步加載，满足web開發的需要，因爲如果在web端也使用同步加載，那麼頁面在解析腳本文件過程中可能使頁面暂停響應。  
第一個參數寫明入口模塊的依賴列表，第二個參數作为回调參數依次會傳入前面依赖的導出值。  

```js
// index.js
require(['moduleA', 'moduleB'], function(moduleA, moduleB) {
        console.log(moduleB);
});
// moduleA.js
define(function(require) {
        var m = require('moduleB');
        setTimeout(() => console.log(m), 1000);
});
// moduleB.js
define(function(require) {
        var m = new Date().getTime();
        return m;
});
```
