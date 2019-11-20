# Webpack Basic
URL https://ithelp.ithome.com.tw/articles/10200329?sc=iThelpR
URL https://ithelp.ithome.com.tw/articles/10200459
URL https://ithelp.ithome.com.tw/articles/10212909?sc=rss.qu
URL https://pjchender.github.io/2018/05/17/webpack-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98%EF%BC%88webpack-note%EF%BC%89/
## Introduction
前端工程擁有太多方便的東西和語法糖了，例如React的JSX、ES6或CSS的預處理器SASS、SCSS和其他CoffeeScript等等，為了把各式各樣的語言編譯成讓瀏覽器看得懂，也許我們能想到使用Babel來處理JavaScript的部分，但SASS和SCSS也需要再另外去編譯成CSS，而webpack可以把全部前端的文件整合成一個檔案
## Step-By-Step
1. npm install webpack webpack-cli(webpack-command) -g
2. webpack -v 成功顯示版本
3. 

## Dependency to built
    "@babel/core": "^7.7.0",		    // 
    "@babel/preset-env": "^7.7.1",	    // 轉譯ES6為ES5
    "@babel/preset-react": "^7.7.0",	// 處理JSX
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
    "css-loader": "^3.2.0",           // css加載轉譯
    "sass-loader": "^8.0.0",          // sass加載轉譯
    "style-loader": "^1.0.0"          // 加載樣式
    "file-loader": "^4.2.0",          // 加載文件
    "image-webpack-loader": "^6.0.0", // 圖片壓縮加載
    "img-loader": "^3.0.1",           // 圖片壓縮加載
    "url-loader": "^2.2.0",           // 加載文件

## Webpack.config.js 設定配置
1. test：
	指定編譯檔案的副檔名為何，用正規表達式來尋找結尾處為.jsx的檔案。
2. exclude：
	指定不編譯的目錄，因為我們把網站上傳到server的時候，其實不會連node_nodules資料夾也一起放上去，所以就不需要特別編譯他了。
3. use：
	指定用來編譯符合副檔名條件的loader，這個物件裡面還有兩個屬性：
    1.loader：指定進行編譯的套件，這裡指定剛剛下載的babel-loader。
    2.option：指定loader套件中的presets是哪一個，因為我們要編譯的是JSX，所以這裡輸入@babel/preset-react。
運行webpack-dev-server，localhost:9000/views/index.html
```js
//引用path模組
const path = require('path');
module.exports = {
    //這個webpack打包的對象，這裡面加上剛剛建立的index.js
    entry: {
        index: path.resolve(__dirname, 'src/js/index.jsx')
    },
    output: {
        //這裡是打包後的檔案名稱
        filename: 'bundle.js',
        //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
        path: path.resolve(__dirname, 'built'),
    },
    module: {
      //rules的值是一個陣列可以存放多個loader物件
      rules: [
        //第一個loader編譯JSX
        { test: /.jsx$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } } },
        //第二個loader編譯ES6
        { test: /.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
        //第三個loader編譯CSS
        { test: /.css$/, exclude: /node_modules/, use: { loader: 'style-loader' } },
        //第四個loader編譯SCSS
        { test: /.css$/, exclude: /node_modules/, use: { loader: 'css-loader' } },
        //第四個loader編譯SASS/SCSS
        { test: /.s[ac]ss$/, exclude: /node_modules/, use: { loader: 'sass-loader' } }，
        //第五個loader編譯image，outputPath：文件編譯完輸出的路徑，publicPath：資源開放目錄
        { test: /\.(png|jpg|gif|jpe?g|svg)$/, exclude: /node_modules/, use: [ 
          { loader: 'url-loader', options: { limit: 40000, name: '[name].[ext]', outputPath:  '../src/asset', publicPath: '/src/asset' } },
          // { loader: 'image-webpack-loader', options: { bypassOnDebug: true } }
         ]
        },
      ]
    },
    //增加一個給devserver的設定
    devServer: {
      //指定開啟port為9000
      port: 9000,
      inline: true,
      historyApiFallback: true
    }
};
```
