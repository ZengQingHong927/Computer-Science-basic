# React 動態加載

<https://keqingrong.github.io/blog/2018-12-31-react-code-splitting>

## 如何優化首屏加载

1. 優化bundle體積，import from 資源只引入所需資源
2. 動態加載資源，webpack會將動態加載的資源分包（chunk），主包bundle加載完會再去加载用到的资源（增加網絡請求）

3. webpack分包动态加载，将import函数导入的模块从zubundle分割代码到另一个chunk文件

```js
// 使用import函數動態加載
import('react').then (source => console.log (source))。

// 使用React.lazy懒加载動態加載
var CustomizedComponent = React.lazy(()=>import('./component/CustomizedComponent'))
```

webpack分包动态加载
