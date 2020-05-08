# Koa - File Process
https://github.com/koajs/examples/blob/master/upload/app.js

MongoDB - how to update a single field  in an array of an embedded document
https://dba.stackexchange.com/questions/157149/how-can-i-update-a-single-field-in-an-array-of-embedded-documents/157162

React - Rich Editor
https://github.com/jpuri/react-draft-wysiwyg

var formidable = require (‘formidable’);

// Koa把file文件放在ctx.req对象上处理
req === ctx.req;

function FormidableP (req, opts) {
        return new Promise ((resolve, reject) => {
                let   form = new formidable.IncomingForm (opts);
                form.parse (req, function (err, fields, files) {
                        if (err) return reject (err);
                        console.log ('- file upload parse fields::', JSON.stringify (fields, null, 4));
                        console.log ('- file upload parse files::', JSON.stringify (files, null, 4));
                        resolve ({fields, files});
                });
        })
}

/* 待处理File数据格式
"file": {
        "size": 75362,
        "path": "/var/folders/zl/qrvlcm2x2psdj24cmt32h8040000gw/T/upload_6d5775ec5a0cfc1ae2a38112f1e2eba4",
        "type": "application/octet-stream",
        "mtime": "2020-03-03T06:09:25.690Z"
    }
*/

let { files } = await FormidableP(ctx.req);

console.log (`- filename: ${filename}`);
let     extname         = path.extname (filename);
let     lowerExtname    = extname.toLowerCase ();
console.log (`lowerExtname: ${lowerExtname}`);
if (lowerExtname !== '.jpg' && lowerExtname !== '.jpeg' && lowerExtname !== '.png') {
        throw new Consts.YMError (Consts.kBillingErrorFileTypeError, `文件类型错误，当前为: ${extname}`);
}

let     newFilename     = `photo_${Date.now ()}${extname}`;
let     filepath        = `/uploads/${newFilename}`;
let     path0           = `${config.file_dir}${filepath}`;
await fs.promises.copyFile (file.path, path0);
await fs.promises.unlink (file.path);

## 前端
<input type='file' ref={fileRef} onChange={handleFileUpload} onClick={() => fileRef.current.focus()}/>

function handleFileUpload (e) {
        e.target.files // files object

        fetch API // params: file object
}

## 重传机制
```js
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
```