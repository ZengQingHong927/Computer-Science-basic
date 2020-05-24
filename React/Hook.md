# Hooks

<https://juejin.im/post/5caaa8ffe51d452b2b027f8a>

## useEffect

之前很多具有副作用的操作，例如网络请求，修改 UI 等，一般都是在 class 组件的 componentDidMount 或者 componentDidUpdate 等生命周期中进行操作。而在函数组件中是没有这些生命周期的概念的，只能 return 想要渲染的元素。但是现在，在函数组件中也有执行副作用操作的地方了，就是使用 useEffect 函数。
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

```

## useState

1、useState
語法

const [state, setState] = useState(initialState)

傳入唯一的參數: initialState，可以是數字，字符串等，也可以是對象或者數組。
返回的是包含兩個元素的數組：第一個元素，state變量，setState修改state值的方法。

與在類中使用setState的異同點：

相同點：也是異步的，例如在onClick事件中，調用兩次setState，數據只改變一次。
不同點：類中的setState是合併，而函數組件中的setState是替換。

```js
    let   [ filterProvIdx, setFilterProvIdx ]       = useState (-1);            // init number
    let   [ filterDateEnd, setFilterDateEnd ]       = useState (defaultEnd);    // use a variable to initiate
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ('');            // init tring
    let   [ filterAmountFrom, setFilterAmountFrom ] = useState ();              // init undefined
```

## RouterLink

點擊跳轉

```js
import { Link as RouterLink } from 'react-router-dom';

<RouterLink to="/profile/1/projects">
    <img alt="Logo" src="/images/logos/logo--white.svg" />
</RouterLink>
```

## portal

<https://marmelab.com/react-admin-demo>

```js
let container = document.querySelector('#title');
let titleElement = <div><Helmet title='Thrilled' /><Typography>Thrilled</Typography></div>

createPortal (titleElement, container)
```

## useRef

<https://overreacted.io/making-setinterval-declarative-with-react-hooks/>
<https://github.com/thchia/useInterval/blob/master/index.js>
<https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts>

## useInterval

<https://overreacted.io/making-setinterval-declarative-with-react-hooks/>
<https://github.com/thchia/useInterval/blob/master/index.js>
<https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts>

```js
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Counter() {
    const [count, setCount] = useState(0);
    let delay = 0;
    if (count < 10) {
        delay = 1000
    }
    else {
        delay = null;
    }

    useInterval (() => {
        // Your custom logic here
        setCount (count + 1);
    }, delay);

    return <h1>{count}</h1>;
}

function useInterval (callback, delay) {
    const savedCallback = useRef ();

    // Remember the latest function.
    useEffect (() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect (() => {
        function tick () {
            savedCallback.current ();
        }
        if (delay !== null) {
            let id = setInterval (tick, delay);
            return () => clearInterval (id);
        }
    }, [delay]);
}

const rootElement = document.getElementById ("root");
ReactDOM.render (<Counter />, rootElement);
```

## useContext

<https://stackoverflow.com/questions/38806148/react-pass-props-down-to-all-descendant-components>
<https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c>