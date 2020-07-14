# NodeJS 介紹

<http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D>

## 事件循環

### 調用棧 Call Stack

假設調用棧是一個 [], nodejs會把函數push進[], 至頂層的函數開始執行

```js

function fn () {
        console.log ('call fn');
        fn ()
}

```

### 事件隊列（宏任務和微任務）

nodejs中有兩個任務隊列，事件循環會先去微任務拿任務執行，微任務被執行完才會去宏任務拿任務執行。

宏任務

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame (瀏覽器)
- JS 主代碼

微任務

- process.nextTick
- Promise的then方法

```js

setTimeout (() => {
        console.log ('timeout');
}, 0)

new Promise((resolve) => {
        console.log ('promise');
        resolve ();
}).then (() => {
        console.log ('then');
});

console.log ('start');

/**
promise
start
then
timeout */

```

### Buffer

UInt8Array (無符號八位元數組， 每個元素有效範圍0-255)，nodejs的類

```js
var bf = new UInt8Array([1, 257, -255]);

/**
[1,1,1]
*/

```

### Http

OSI model

- Application Layer (應用層)
- Presentation Layer (顯示層)
- Session Layer (會話層)
- Transport Layer (傳輸層)
- Internet Layer (網絡層)
- Data Link Layer (數據鏈路層)
- Physical Layer (物理層)

TCP/IP model

- Application Layer (應用層)
- Transport Layer (傳輸層)
- Internet Layer (網絡層)
- Link Layer (鏈路層)

HTTP 請求
<方法> <資源地址> <協議版本>
<請求部首>

<請求體>

Headers

Content-Type
Accept
Date
Expires
ETag
Cache-Control

```js
HTTP/1.1 200 OK
Server: nginx/1.14.0 (Ubuntu)
Date: Mon, 13 Jul 2020 10:27:15 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 579
Connection: keep-alive
X-Powered-By: Express
Accept-Ranges: bytes
ETag: W/"243-bgYInCycJZCK5VDuuokrrhu/XG8"
Vary: Accept-Encoding
```

### TCP

3次握手

1. client發起同步請求，send TCP SYN msg (SYNbit=1, Seq=x)
2. server send TCP SYN ACK msg, (SYNbit=1, Seq=x, ACKbit=1, ACKnum=x+1)
3. client收到SYNACK(x)表示server is alive, send TCP ACK msg（ACKbit=1,ACKnum=y+1），可以傳輸數據
4. server收到ACK(y)表示client is alive

四次揮手

1. client send TCP msg (FINbit=1, Seq=x)
2. server send TCP msg (ACKbit=1, ACKnum=x+1)仍可發送數據, client等待server close
3. server send TCP (FINbit=1, Seq=y)
4. client send TCP msg (ACKbit=1, ACKnum=y+1)
