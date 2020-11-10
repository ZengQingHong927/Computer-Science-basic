# ES6-Promise

解決場景：js是單線程語言，異步請求需要使用callback來處理服務器響應的的請求，假若callback裏面又是異步操作，此時又增加一層callback，造成多層嵌套，使得代碼閱讀性和維護性減低，使用Promise的的鏈式異步操作寫法，使得代碼更好閱讀。  

var promise = new Promise((resolve, reject) => {})  
Promise構造函數接受兩個參數，藉由resolve,reject改變promise實例的狀態，並且帶有then，catch方法，而這兩個方法皆會返回一個Promise實例。  

1. promise 会有三种状态,「进行中」「已完成」和「已拒绝」,进行中状态可以更改为已完成或已拒绝,已经更改过状态后无法继续更改(例如从已完成改为已拒绝)。  
2. ES6 中的 Promise 构造函数,我们构造之后需要传入一个函数,他接受两个函数参数,执行第一个参数之后就会改变当前 promise 为「已完成」状态,执行第二个参数之后就会变为「已拒绝」状态。
3. 通过 .then 方法,即可在上一个 promise 达到已完成时继续执行下一个函数或 promise。同时通过resolve 或 reject 时传入参数,即可给下一个函数或 promise 传入初始值。  
4. 已拒绝的 promise,后续可以通过 .catch 方法或是 .then 方法的第二个参数或是 try catch 进行捕获。  

一个 promise 必须提供一个 then 方法以访问其当前值和原因。  
promise 的 then 方法接受两个参数: promise.then(onFulfilled, onRejected) 他们都是可选参数,同时他们都是函数,如果 onFulfilled 或 onRejected 不是函数,则需要忽略他们。

- 如果 onFulfilled 是一个函数
接受一個參數（前次promise已完成狀態的值），且只能被調用一次。

- 如果 onRejected 是一个函数
接受一個參數（前次promise已拒絕狀態的原因），且只能被調用一次。

then 方法可以被同一个 promise 调用多次
当 promise 成功执行时,所有 onFulfilled 需按照其注册顺序依次回调
当 promise 被拒绝执行时,所有的 onRejected 需按照其注册顺序依次回调
then 方法必须返回一个 promise 对象 promise2 = promise1.then(onFulfilled, onRejected);

只要 onFulfilled 或者 onRejected 返回一个值 x ,promise 2 都会进入 onFulfilled 状态
如果 onFulfilled 或者 onRejected 抛出一个异常 e ,则 promise2 必须拒绝执行,并返回
拒因 e
如果 onFulfilled 不是函数且 promise1 状态变为已完成, promise2 必须成功执行并返回相
同的值
如果 onRejected 不是函数且 promise1 状态变为已拒绝, promise2 必须执行拒绝回调并返
回相同的拒絕原因

```js
var promise1 = new Promise((resolve, reject) => {reject();});
promise1
        .then(null, function() {
                return 123;
})
.then(null, null)
.then(null, null)
.then(
        () => {
                console.log('promise2 已完成');
        },
        () => {
                console.log('promise2 已拒绝');
});
```

## Promise 構造函數的靜態方法

- Promise.resolve
返回一个 promise 实例,并将它的状态设置为已完成,同时将他的结果作为传入 promise 实例的值

```js
var promise = Promise.resolve(123);
promise
        .then(function(val) {
                console.log('已完成', val);
        });
        // 已完成 123
```

同样的, Promise.resolve 的参数也可以处理对象,函数等内容,处理方式和上面规范中介绍的相同。  

- Promise.reject
返回一个 promise 实例,并将它的状态设置为已拒绝,同时也将他的结果作为原因传入 onRejected 函数

```js
var promise = Promise.reject(123);
promise
        .then(null, function(val) {
                console.log('已拒绝', val);
        });
        // 已拒绝 123
```

- Promise.all
返回一个 promise 实例,接受一个数组,里面含有多个 promise 实例,当所有 promise 实例都成为已完成状态时,进入已完成状态,否则进入已拒绝状态。

```js
var promise1 = function() {
        return new Promise(function(resolve) {
                setTimeout(function() {
                        console.log(1);
                        resolve();
                }, 1000)});
}

var promise2 = function() {
        return new Promise(function(resolve) {
                setTimeout(function() {
                        console.log(2);
                        resolve();
                }, 2000);
        });
}

Promise.all([promise1(), promise2()])
        .then(function() {
                console.log('全部 promise 均已完成');
});
```

注意,此时多个 promise 是同时进行的,也就是在上面这个例子中,等待 1s 打印 1 之后,再等待 1s 就
会打印 2 和「全部 promise 均已完成」。

- Promise.race
返回一个 promise 实例,接受一个数组,里面含有多个 promise 实例,当有一个 promise 实例状态改变
时,就进入该状态且不可改变。这里所有的 promise 实例为竞争关系,只选择第一个进入改变状态的
promise 的值。

```js
var promise1 = function() {
        return new Promise(function(resolve) {
                setTimeout(function() {
                        console.log(1);
                        resolve(1);
                }, 1000)
        });
}
var promise2 = function() {
        return new Promise(function(resolve) {
                setTimeout(function() {
                        console.log(2);
                        resolve(2);
                }, 2000);
        });
}
Promise.race([promise1(), promise2()])
        .then(function(val) {
                console.log('有一个 promise 状态已经改变', val);
});
```
