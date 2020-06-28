# Fetch

<https://javascript.info/fetch-crossorigin>

<https://stackoverflow.com/questions/46946380/fetch-api-request-timeout>

<https://javascript.info/fetch-crossorigin>
node-fetch

<https://www.csdn.net/gather_2f/MtTaQg1sODU2MzItYmxvZwO0O0OO0O0O.html>

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

fetch with timeout

```js
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

timeout(1000, fetch('/hello')).then(function(response) {
  // process response
}).catch(function(error) {
  // might be a timeout error
})
```

```js
// 前端Fetch封装

function postP (api, data, mode) {
        data    = data || {};

        let     url;
        let     body;

        let     contentType     = 'application/json';

        if (mode === 1) {
                body    = data;
                contentType     = 'application/octet-stream';
                url     = api;
        }
        else {
                body    = JSON.stringify (data);
                url     = api;
        }


        return fetch (url, {
                method:         'POST',
                headers: {
                        'Accept':           'application/json',
                        'Content-Type':     contentType
                },
                credentials:    'include',
                body,
        });
}


function postA (api, data, erm) {
        let     response        =
        await postP (api, data, 0);

        if (response.status !== 200) {
                throw Error (500, 'request fail');
        }

        let     response_json   = await response.json();
        // let resobj = response_json;
        if (response_json.status !== 100) {
                throw new Error (response_json.status, response_json.message || erm)
        }
        return response_json;
}

function prePostA (api, data, erm) {
        let     resobg;
        try {
                resobj  = await postA (api, data, erm);
        }
        catch (e) {
                resobj  = {status: err.status, message: err.message}
        }

        return resobj;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
import      Dropzone                        from 'react-dropzone';

function onUpload (fileObj) {
        let     resobj  =
        await this.prePostA (`/api/file/upload?fileId=${fileId}&filename=${filename}`, fileObj);
}

function onHandleUpload (files) {
        if (!files[0] || !files[0].name) {
                console.log ('no files');
                return;
        }

        onUpload (files[0]);
}

<Dropzone onDrop={onHandleDrop} onFileDialogCancel={onCancelDrop} >
        {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone">拖入文件</div>
                </div>
        )}
</Dropzone>

// backend api

// check ctx.is('application/octet-stream')
let   { filename, fileId }      = ctx.request.query;

let   { files }                 = formidable (ctx.req)
let     file                    = files.file
let     extname                 = path.extname(filename);
let     lowerExtname            = extname.toLowerCase (extname);

// check extname type
let     newFilename             =`${fileId}_${Date.now()}${extname}`;
let     filePath                =`/uploads/${newfilename}`;
let     savePath                = `${config.upload_dir}${filePath}`;

await fs.promises.copyFile (file.path, savePath);
await fs.promises.unlink (file.path);

// update document with specific fileId, ex: document.img_url = filePath

```

```js
function customizedFetchP (url, method, queryParams, options0) {
        method          = method || 'GET';
        options0        = options0 || {};
        let     queryStr     = querystring.stringify (queryParams);

        let   { contentType,
                returnType,
                fetch:      fetch0,
                headers:    headers0,
                safe,
                nretries,
                // redirect,
                ignore_200err,
                ...rest }       = options0;

        nretries     = nretries || 1;

        let     headers     = {};
        let     body;
        if (method === 'GET') {
                if (queryParams) {
                        url     = `${url}?${queryStr}`;
                }
                returnType      = returnType || 'text';
        }
        else {
                if (contentType === 'json') {
                        headers['Content-Type']    = 'application/json';
                        body        = JSON.stringify (queryParams);
                }
                else {
                        headers['Content-Type']    = 'application/x-www-form-urlencoded; charset=UTF-8';
                        body        = queryStr;
                }

                returnType      = returnType || 'json';
        }

        Object.assign (headers, headers0);

        let     options     = {
                url,
                method,
                headers,
                // agent:      socksAgent,
                body,
                // redirect,
                timeout:    3000,
        };

        Object.assign (options, rest);
        // console.log (`- options: ${JSON.stringify (options)}`);


        let     fetch1      = fetch0 || fetch;

        let     resobj;
        try {
                let     fetch_resp;
                for (let i = 0; i < nretries; i ++) {
                        try {
                                fetch_resp       =
                                await fetch1 (options.url, options);
                                if (fetch_resp)         break;
                        }
                        catch (err) {
                                if (i === nretries - 1)      throw err;
                                console.log (`- fetch失败，进行重试`);
                        }
                }

                if (!ignore_200err && fetch_resp.status !== 200) {
                        throw new Consts.YMError (Consts.kBillingErrorNetworkError, `请求失败HTTP${fetch_resp.status}`);
                }

                if (returnType === 'text') {
                        resobj  = await fetch_resp.text ();
                }
                else if (returnType === 'json') {
                        resobj  = await fetch_resp.json ();
                }
                else if (returnType === 'buffer') {
                        resobj  = await fetch_resp.buffer ();
                        // console.log (`- return buffer`);
                }
                else if (returnType === 'url') {
                        resobj  = fetch_resp.url;
                }
                else if (returnType === 'raw') {
                        resobj  = fetch_resp;
                }
        }
        catch (err) {
                // console.log (`- err.code: ${err.code}`);
                console.log (`- err.message: ${err.message}`);
                console.log (`- err.stack: ${err.stack}`);
                return throw new Error ()
        }

        return resobj;
}

```