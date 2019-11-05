# Browser
## LocalStorage auto-clear in schedule
url https://blog.csdn.net/qq_33144001/article/details/94739208

localStorage: 儲存的數據不能為對象，所以使用JSON.stringify將其轉為字符串
```js
function setExpire (key, value, expire) {
  let obj = {
    value,
    time: Date.now(),
    exipre
  }

  window.localStorage.setItem(key, JSON.stringify(obj));
}

function getExpire (key) {
  let val = window.localStorage.getItem(key);
  
  if(!val) {
    return val;
  }

  val = JSON.parse(val);
  
  if (val.now() - val.time > val.expire) {
    window.localStorage.removeItem(key);
    return null
  }

  return val.data;
}
```
## Web load
url https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
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
    docReady(()=>{
        console.log('Welcome my web site-------');
        
    })
```
## Buffer to String
url https://stackoverflow.com/questions/41951307/convert-a-json-object-to-buffer-and-buffer-to-json-object-back/41951472

JSON.parse(Buffer)