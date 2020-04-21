# Fetch
https://javascript.info/fetch-crossorigin
'node-fetch'
```js
headers = {
        'Content-Type': 'application/json'|'application/x-www-form-urlencoded; charset=UTF-8' | 'multipart/form-data',
        'Authorization': 'Bearer xxxxxxxxxxxxxxxx',
        'Accept':       'application/json',
}

option = {
        url,
        method,
        headers,
        body,
        timeout,
        agent,
        redirect,
        credentials,    // 'same-origin' | 'include'
        mode,           // 'cors'
        cache,          // 'no-cache'
}


fetch (url, option);

let resobj;
try {
        let fetch_res;
        for (let i=0;i < retriesnum ; i++) {
                try {
                        fetch_res =
                        await fetch (option.url, option);
                        if (fetch_res)  break;
                }
                catch (e) {
                        if (i === retriesnum - 1)       throw err;
                }

                if (fetch_res.status !== 200) {
                        throw Error ('Fetch请求失败')
                }

                if (returnType == 'text') {
                        resobj = await fetch_res.text();
                }
                else if (returnType == 'json') {
                        resobj = await fetch_res.json();
                }
                else if (returnType == 'buffer') {
                        resobj = await fetch_res.buffer();
                }
                else {
                        resobj = await fetch_res;
                }
        }
}
catch (e) {

}
```