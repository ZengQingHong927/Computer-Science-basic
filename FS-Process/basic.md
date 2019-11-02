# 基本文件處理
##
```js
fs.accessSync(dir,fs.constants.F_OK); // 是否存在
let stat = fs.statSync(dir);          // 文件狀態
if (stat.isFile()) {                  // 文件？
  console.log(dir)
}else if(stat.isDirectory()) {        // 文件夾？
  let files = fs.readdirSync(dir);    // 讀文件夾

  files.forEach(element => {
    fetchFile(path.join(dir,element));
  });
}
```
# Buffer Image Process
url:https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally