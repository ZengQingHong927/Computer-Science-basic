# Webpack Basic
URL https://ithelp.ithome.com.tw/articles/10200329?sc=iThelpR
URL https://ithelp.ithome.com.tw/articles/10200459
## Introduction
前端工程擁有太多方便的東西和語法糖了，例如React的JSX、ES6或CSS的預處理器SASS、SCSS和其他CoffeeScript等等，為了把各式各樣的語言編譯成讓瀏覽器看得懂，也許我們能想到使用Babel來處理JavaScript的部分，但SASS和SCSS也需要再另外去編譯成CSS，而webpack可以把全部前端的文件整合成一個檔案
## Step-By-Step
1. npm install webpack webpack-cli(webpack-command) -g
2. webpack -v 成功顯示版本
3. 

## Dependency to built
    "@babel/core": "^7.7.0",		// 
    "@babel/preset-env": "^7.7.1",	// ES6 to ES5
    "@babel/preset-react": "^7.7.0",	// 處理JSX
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
## Webpack.config.js 設定配置
1.test：
	指定編譯檔案的副檔名為何，用正規表達式來尋找結尾處為.jsx的檔案。
2.exclude：
	指定不編譯的目錄，因為我們把網站上傳到server的時候，其實不會連node_nodules資料夾也一起放上去，所以就不需要特別編譯他了。
3.use：
	指定用來編譯符合副檔名條件的loader，這個物件裡面還有兩個屬性：
    1.loader：指定進行編譯的套件，這裡指定剛剛下載的babel-loader。
    2.option：指定loader套件中的presets是哪一個，因為我們要編譯的是JSX，所以這裡輸入@babel/preset-react。

```js
const path = require('path');
module.exports = {
    entry: ['./index.js', './app.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            //第一個loader編譯JSX
            { test: /.jsx$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } } },
            //第二個loader編譯ES6
            { test: /.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } }
        ]
    }
};
```
