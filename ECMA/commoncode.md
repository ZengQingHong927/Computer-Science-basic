# commoncode tool

buffer base convertion

```js
var convertBase         = require ('bigint-base-converter');
var b62_base            = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var buf = Buffer.from (order_id.toHexString (), 'hex')
return convertBase ([].slice.call (buf), 256, b62_base);
```
