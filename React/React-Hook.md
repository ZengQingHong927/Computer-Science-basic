# Hooks

<https://juejin.im/post/5caaa8ffe51d452b2b027f8a>

## useEffect

之前很多具有副作用的操作，例如網絡請求，修改 UI 等，一般都是在class組件的componentDidMount或者componentDidUpdate等生命周期中進行操作。而在函數組件中是没有這些生命周期概念的，只能return想要渲染的元素。
但是现在，在函数组件中也有執行副作用操作的地方，就是使用useEffect函數。

语法
useEffect(() => { doSomething });

兩個參數：

第一個是一個函數，在第一次渲染以及之後更新渲染之後會進行的副作用。
這個函數可能會有返回值，倘若有返回值，返回值也必須是一個函数，會在组件被銷毀時執行。
第二個參數是可選的，是一個數組，數組中存放的是第一個函數中使用的某些副作用属性。用来優化useEffect
如果使用此優化，請確保該數組包含外部作用域中随時間變化且effect使用的任何值。否則，代碼將引用先前渲染中的舊值。
如果要運行effect並僅將其清理一次（在装载和卸载時），則可以將空數組（[]）作爲第二個參數傳遞。這告诉React你的effect不依賴於來自props或state的任何值，所以它永远不需要重新運行。

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
語法

const [state, setState] = useState(initialState)

傳入唯一的參數: initialState，可以是數字，字符串等，也可以是對象或者數組。
返回的是包含两個元素的數組：第一個元素，state變量，setState修改state值的方法。

與在類中使用setState的異同點：
相同點：也是異步的，例如在onClick事件中，調用兩次setState，數據只改變一次。
不同點：類中的setState是合併，而函数组件中的setState是替换。

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
    let [ count, setCount ] = useState(0);
    let delay = 0;
    if (count < 10) {
        delay = 1000
    }
    else {
        delay = null;
    }

    useInterval(() => {
        // Your custom logic here
        setCount(count + 1);
    }, delay);

    return <h1>{count}</h1>;
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```

## useContext

<https://stackoverflow.com/questions/38806148/react-pass-props-down-to-all-descendant-components>
<https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c>

## useToggle (user defined)

<https://github.com/bsonntag/react-use-toggle/blob/master/src/index.js>

```js
import { useCallback, useState } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
}

export default useToggle;
```
