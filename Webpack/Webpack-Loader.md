# Webpack Loader

## 打包核心工作過程

前端項目的資源散落在各個文件，webpack通過打包將所有資源文件集中在一起。透過loader加載資源文件，透過Plugin實現各種自動化構建任務，例如：壓縮，發布。
webpack會從入口文件（entry），根着import（ES Module）或require（Common JS）找出所有的依賴資源，形成依賴關系樹。webpack遍歷依賴關系樹，根據配置選項的loader加載資源，打包進bundle.js文件。對於無法加載的文件，圖片或字體文件拷貝到輸出目錄，對應的訪問路徑曝露給外部。

webpack工作流程：1. 載入webpack核心模塊，創建Compiler對象 2. Compiler對象開始編譯整個項目 3. 從入口文件解析模塊依賴，形成依賴關系樹 4. 遍歷關系樹，將每個模塊交給對應的loader處理 5. 合並Loader處理完的結果，將打包結果輸出到dist目錄。

## 常用Loader

- JS/JSX：@babel/preset-env, @babel/preset-react用來轉譯ES6和JSX爲ES5代碼，babel默認只轉譯 JavaScript 语法，如箭頭函數、擴展運算（spread）。

```js
{
    test: /(\.js|\.jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime']
        }
    }
}
```

- CSS：css-loader用來將css文件轉換爲js模塊，style-loader會將css模塊加載進js代碼中，執行順序爲倒序執行

```js
{
    test: /.css$/,
    exclude: /node_modules/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
    ]
}
```

- SCSS/SASS

```js
{
    test: /.s[ac]ss$/,
    include: [path.resolve (__dirname, '/src/css')],
    exclude: /node_modules/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
    ]
}
```

圖片：url-loader和file-loader區別，file-loader返回的是圖片的public URL，url-loader可以在圖片小於limit時返回base64 URL，大於limit會調用file-loader進行處理。

```js
{
    test: /\.(png|jpg|gif|jpe?g|svg)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 40000,
                name: '[name]-[hash].[ext]',
                outputPath: '../dist/asset',
                publicPath: '/asset'
            }
        }
    ]
}

```

- markdown文件，txt文件：

```js
{
    test: /\.md$/,
    use: "raw-loader"
}
```
