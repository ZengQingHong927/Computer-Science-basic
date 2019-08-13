# JavaScript異步編程
參考網址：http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html
## 回調函數
fn1耗時長，若需要fn1執行完然後執行fn2，可用回調函數實現。
```js
function fn2() {
  setTimeout(()=>{
    console.log('Hello');
  },1000);
}

function fn1(callback) {
  setTimeout(()=>{
    console.log('Hola');
    callback();
  },5000);
}
fn1(fn2)
```
## 事件監聽
訂閱/發佈模式，又稱觀察者模式
```js
fn1('done',fn2);
function fn1() {
  setTimeout(()=>{
    console.log('Hola');
    fn1.trigger('done');
  },1000)
}
```
## 訂閱/發佈模式（觀察者模式）
Jquery.subscribe('done',fn2);
Jquery.publish('done')
## Promise

# NodeJS 定時器

- setTimeout()
- setInterval()
- setImmediate()
- process.nextTick()

同步任務比異步任務早執行。
## 本輪循環和次輪循環
異步任務分成兩種。循環只的是事件循環，javascript處理異步的方式。
Promise屬於微任務，process.nextTick結束後才能被執行。
- 追加在本輪循環的異步任務
 + process.nextTick and Promise belong to current loop
- 追加在次輪循環的異步任務
 + setTimeout, setInterval and setImmediate belong to next loop