# Webpack Basic

https://ithelp.ithome.com.tw/articles/10200329?sc=iThelpR  
https://ithelp.ithome.com.tw/articles/10200459  
https://ithelp.ithome.com.tw/articles/10212909?sc=rss.qu  
https://pjchender.github.io/2018/05/17/webpack-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98%EF%BC%88webpack-note%EF%BC%89/  
https://andrew-flower.com/blog/Async-Await-with-React  
https://stackoverflow.com/questions/49602092/webpack-ignores-webpack-config-js  
https://segmentfault.com/a/1190000012718374#articleHeader9  

## Introduction

前端工程擁有太多方便的東西和語法糖了，例如 React 的 JSX、ES6 或 CSS 的預處理器 SASS、SCSS 和其他 CoffeeScript 等等，為了把各式各樣的語言編譯成讓瀏覽器看得懂，也許我們能想到使用 Babel 來處理 JavaScript 的部分，但 SASS 和 SCSS 也需要再另外去編譯成 CSS，而 webpack 可以把全部前端的文件整合成一個檔案

## work flow

1. webpack 通過配置找到入口文件, entry: index.js
2. 從入口文件分析處理項目所有依賴模塊，構建一個依賴關系圖
3. loader module 分析轉譯爲瀏覽器可執行的格式文件
4. 把所有模塊打包爲一個或多個瀏覽器可識別的 JS 文件，默認是 bundle.js

## Step-By-Step

1. npm install webpack webpack-cli(webpack-command) -g
2. webpack -v 成功顯示版本
3.

## Dependency to built

    "@babel/core": "^7.7.0",		      //
    "@babel/preset-env": "^7.7.1",	  // 轉譯ES6為ES5
    "@babel/preset-react": "^7.7.0",	// 處理JSX
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"，
    "@babel/plugin-transform-runtime",// Async/Await error in React
    "css-loader": "^3.2.0",           // css加載轉譯，轉譯成CommonJS文件（樣式字符串），打包進JS文件
    "sass-loader": "^8.0.0",          // sass加載轉譯
    "style-loader": "^1.0.0"          // 加載樣式，將CommenJS中的樣式文件引入Header
    "file-loader": "^4.2.0",          // 加載文件
    "image-webpack-loader": "^6.0.0", // 圖片壓縮加載
    "img-loader": "^3.0.1",           // 圖片壓縮加載
    "url-loader": "^2.2.0",           // 加載文件

## Webpack.config.js 設定配置

1. test：
   指定編譯檔案的副檔名為何，用正規表達式來尋找結尾處為.jsx 的檔案。
2. exclude：
   指定不編譯的目錄，因為我們把網站上傳到 server 的時候，其實不會連 node_nodules 資料夾也一起放上去，所以就不需要特別編譯他了。
3. use：
   指定用來編譯符合副檔名條件的 loader，這個物件裡面還有兩個屬性：
   1.loader：指定進行編譯的套件，這裡指定剛剛下載的 babel-loader。
   2.option：指定 loader 套件中的 presets 是哪一個，因為我們要編譯的是 JSX，所以這裡輸入@babel/preset-react。
   運行 webpack-dev-server，localhost:9000/views/index.html
4. 多個文件打包爲單個輸出文件
   entry: ['main.js','index.js']
5. 多個文件打包成多個輸出文件
   entry: {a:'main.js', b:'index.js'}
6. 若爲對文件打包成多個輸出文件, name 爲鍵值 a,b
   path: [name].js
7. csv-loader, xml-loader, html-loader, markdown-loader

```js
//引用path模組
//引用path模組
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
    //這個webpack打包的對象，這裡面加上剛剛建立的index.js
    entry: {
        index: path.join(__dirname, 'src/js/index.js')
    },
    output: {
        //這裡是打包後的檔案名稱，or [name].[hash:8].js
        // filename: 'bundle.js',
        filename: '[name].[hash:8].js',
        //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
        path: path.join (__dirname, 'dist'),
    },
    mode: 'development',
    // watch: true,
    module: {
      //rules的值是一個陣列可以存放多個loader物件
      rules: [
        //第一個loader編譯JSX
        // { test: /.jsx$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } } },
        //第二個loader編譯ES6
        // { test: /.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
        { test: /(\.js|\.jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'], plugins: ['@babel/transform-runtime'] } } },
        //第三個loader編譯CSS，loader由後往前編譯執行css-loader>style-loader
        { test: /.css$/, exclude: /node_modules/, use: [{loader: 'style-loader' }, {loader: 'css-loader'}] },
        //第四個loader編譯LESS，loader由後往前編譯執行less-loader>css-loader>style-loader>
        { test: /.less$/, exclude: /node_modules/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}]},
        //第五個loader編譯SASS/SCSS，loader由後往前編譯執行sass-loader>css-loader>style-loader
        { test: /.s[ac]ss$/, exclude: /node_modules/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]},
        //第六個loader編譯圖檔
        { test: /\.(png|jpg|gif|jpe?g|svg)$/i, exclude: /node_modules/, use: { loader: 'file-loader', options: { limit: 40960, name: '[name]-[hash:8].[ext]', outputPath: '../dist/asset/image', publicPath: '/asset/image' } } }, 
        //第七個loader編譯多媒體檔
        { test: /\.(mp4|mp3|ogg|webm|wav|flac|acc)(\?.*)?$/i, exclude: /node_modules/, use: { loader: 'file-loader', options: { limit: 40960, name: '[name]-[hash:8].[ext]', outputPath: '../dist/asset/media', publicPath: '/asset' } } },
        //第七個loader編譯多媒體檔
        { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, exclude: /node_modules/, use: { loader: 'file-loader', options: { limit: 40960, name: '[name]-[hash:8].[ext]', outputPath: '../dist/asset/fonts', publicPath: '/asset' } } },
      ]},
    plugins: [
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin ({
        template: path.resolve(__dirname, 'views/index.html'),         // 參照物
        favicon: './src/image/favicon/favicon-32x32.png'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    //增加一個給devserver的設定
    devServer: {
      //指定開啟port為9000
      contentBase: path.resolve(__dirname, 'dist'),
      port: 9000,
      inline: true,
      // historyApiFallback: {
      //   index: '/dist/index.html'
      // },
      historyApiFallback: true,   // Browserrouter 
      stats: {
        colors: true,
        chunks: false
      },
      // hot: true
    }
};
```
## webpack bundle module chunk  
https://juejin.im/post/5d70ad50f265da03cf7aae91