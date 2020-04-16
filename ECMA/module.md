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

```js
module.exports.add = function add (a, b) {
        return a+b
}

exports.sub = function sub (a, b) {
        return a-b
}
```