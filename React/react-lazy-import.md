# React 动态加载
https://keqingrong.github.io/blog/2018-12-31-react-code-splitting

## 如何优化首屏加载
1. 优化bundle体积，import from 资源只引入所需资源
2. 动态加载资源，webpack会将动态加载的资源分包（chunk），主包bundle加载完会再去加载用到的资源（增加网络请求）
```js
// 使用import函数动态加载
import('react').then (source => console.log (source))。

// 使用React.lazy懒加载动态加载
var CustomizedComponent = React.lazy(()=>import('./component/CustomizedComponent'))
```
webpack分包动态加载