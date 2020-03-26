# txt doanload
https://segmentfault.com/a/1190000015276969



```js
function openDownloadDialog (url, saveName) {
        if (typeof url === 'object' && url instanceof Blob) {
          url   = URL.createObjectURL(url); // 创建blob地址
        }
        let     aLink   = document.createElement ('a');
        aLink.href      = url;
        aLink.download  = saveName;
        aLink.click ();
}

function saveTxt (data, filename) {
        var     blob                    = new Blob(['\ufeff'.concat ('test document')], {type: 'text/txt,charset=UTF-8'});

        openDownloadDialog (blob, saveName);
}

```