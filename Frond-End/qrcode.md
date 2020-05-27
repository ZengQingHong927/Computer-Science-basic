# QRcode生成圖片連結

qrcode

```js
let     [ dataUrl, setDataUrl ] = useState ('');

qrcode.toDataURL (('' + qrurl) || 'void:none')
        .then (url => {
                console.log (`- dataurl: ${url}`);
                setDataUrl (url);
        });

<img src={dataUrl}>
```