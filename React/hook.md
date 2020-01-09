# Hooks
## url https://juejin.im/post/5caaa8ffe51d452b2b027f8a
## useEffect
之前很多具有副作用的操作，例如网络请求，修改 UI 等，一般都是在 class 组件的 componentDidMount 或者 componentDidUpdate 等生命周期中进行操作。而在函数组件中是没有这些生命周期的概念的，只能 return 想要渲染的元素。
但是现在，在函数组件中也有执行副作用操作的地方了，就是使用 useEffect 函数。
语法

useEffect(() => { doSomething });

两个参数：


第一个是一个函数，是在第一次渲染以及之后更新渲染之后会进行的副作用。

这个函数可能会有返回值，倘若有返回值，返回值也必须是一个函数，会在组件被销毁时执行。



第二个参数是可选的，是一个数组，数组中存放的是第一个函数中使用的某些副作用属性。用来优化 useEffect

如果使用此优化，请确保该数组包含外部作用域中随时间变化且 effect 使用的任何值。 否则，您的代码将引用先前渲染中的旧值。
如果要运行 effect 并仅将其清理一次（在装载和卸载时），则可以将空数组（[]）作为第二个参数传递。 这告诉React你的 effect 不依赖于来自 props 或 state 的任何值，所以它永远不需要重新运行。

```js
    let     onRefreshDpOrdersCB  = useCallback (onRefreshDpOrders, []);

    useEffect (() => {
            onRefreshDpOrdersCB ();
    }, [onRefreshDpOrdersCB]);

    // async componentDidMount () {
    //         await this.onRefreshDpOrders ();
    // }
```
## useState
1、useState
语法

const [state, setState] = useState(initialState)


传入唯一的参数: initialState，可以是数字，字符串等，也可以是对象或者数组。
返回的是包含两个元素的数组：第一个元素，state 变量，setState 修改 state值的方法。

与在类中使用 setState 的异同点：

相同点：也是异步的，例如在 onClick 事件中，调用两次 setState，数据只改变一次。
不同点：类中的 setState 是合并，而函数组件中的 setState 是替换。
```js
    let   [ filterProvIdx, setFilterProvIdx ]       = useState (-1);            // init number
    let   [ filterDateEnd, setFilterDateEnd ]       = useState (defaultEnd);    // use a variable to initiate
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ('');            // init tring
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ();              // init undefined
```
## RouterLink
点击跳转
```js
import { Link as RouterLink } from 'react-router-dom';

<RouterLink to="/profile/1/projects">
    <img alt="Logo" src="/images/logos/logo--white.svg" />
</RouterLink>


```

## portal
https://marmelab.com/react-admin-demo
```js

let container = document.querySelector('#title');
let titleElement = <div><Helmet title='Thrilled' /><Typography>Thrilled</Typography></div>

createPortal (titleElement, container)
```