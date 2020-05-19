# Fetch

<https://javascript.info/fetch-crossorigin>
'node-fetch'

```js
headers = {
        'Content-Type': 'application/json'|'application/x-www-form-urlencoded; charset=UTF-8' | 'multipart/form-data' | 'application/octet-stream',
        'Authorization': 'Bearer xxxxxxxxxxxxxxxx',
        'Accept':       'application/json',
}

option = {
        url,
        method,
        headers,
        body,           // new formdata or object
        timeout,
        agent,
        redirect,
        credentials,    // 'same-origin' | 'include'
        mode,           // 'cors'
        cache,          // 'no-cache'
}


// fetch (url, option); contentType is 'application/octet-stream' when file upload

let     contentType = 'application/json' || 'application/octet-stream'

// return promise
return fetch (url, {
        method:         'POST',
        headers: {
                'Accept':       'application/json',
                'Content-Type': contentType
        }
})

// backend api
// 1. 判断请求header类型
// 2. 参数类型 (包含档名filename)
// 3. ctx.req (req)交给formidable解析
// 4.
//         function handleFile (req, opts) {
//                 return new Promise ((resolve, reject) => {
//                         let form = new formidable.IncomingForm ()
//                         form.parse (ctx.req, (err, fields, files)=>{
//                         if (err) return reject (err);
//                         resolve ({files, fields})
//                         })
//                 });
// }
//      let {files}     = await handleFile (ctx.req);
//      let file        = files.file;
//      let extname     = path.extname (filename)
//      let lowerExtname     = extname.toLowerCase ();
//      let filePath    = '绝对路径' // 档案欲存放路径
//      await fs.promise.copyLink (file.path, filePath);
//      await fs.promise.unLink (file.path) // 删除旧档案



// retry request

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