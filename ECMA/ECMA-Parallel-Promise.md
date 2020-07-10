# Promise併發執行

<https://adampaxton.com/handling-multiple-javascript-promises-even-if-some-fail/>

## Example

處理promise併發即使，某些promise發生error，其他promise仍然成功執行完畢。

```js
function apiRequest(url) {
    return new Promise(function (resolve, reject) {

        //our fake api simply returns the string passed as the 'url'
        if (url) {
            resolve(url);
        } else {
            //if no url is passed to the function, it will fail
            reject('apiRequest failed!');
        }
    })
    .catch(function(err){
        //return error;
        return err;
    });
}

var p1 = apiRequest('urlOne');

//this one will fail
var p2 = apiRequest();

var p3 = apiRequest('urlThree');

Promise.all([p1, p2, p3])
.then(function(res){
    console.log('Promise.all', res);
})
.catch(function(err){
    console.error('err', err);
});

```