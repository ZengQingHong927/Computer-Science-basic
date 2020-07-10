# Promise串行執行

<https://www.derpturkey.com/serial-promise-execution-with-javascript/>

## Example

處理promise串行

```js
function doSomethingAsync (i) {
    return new Promise((resolve) => {
        setTimeout(() => { console.log(i); resolve(); }, 1000);
    });
}

async function start () {
    let vals = [1,2,3];

    for(let val of vals) {
        await doSomethingAsync(val);
    }

    console.log('complete');
}
start ()
```