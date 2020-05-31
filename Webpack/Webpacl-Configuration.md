# Webpack Basic Configuration

## Dependency to built

    "@babel/core": "^7.7.0",
    "@babel/preset-env": "^7.7.1",
    "@babel/preset-react": "^7.7.0",
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
    ”raw-loader“                      // txt markdown file

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
var p ath = require ('path');
var webpack = require ('webpack');
var { CleanWebpackPlugin } = require ('clean-webpack-plugin');
var HtmlWebpackPlugin = require ('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
        //這個webpack打包的對象，這裡面加上剛剛建立的index.js
        entry: {
                index: path.join (__dirname, 'src/js/index.js')
        },
        output: {
                //這裡是打包後的檔案名稱
                // filename: 'bundle.js',
                filename: '[name].[hash:8].js',
                //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
                path: path.join (__dirname, 'dist'),
                publicPath: '/'
        },
        mode: 'development',
        // watch: true,  // 文件變更自動編譯生成bundle.js
        module: {
                        // rules的值是一個陣列可以存放多個loader物件
                        rules: [
                                // 第一個loader編譯JSX
                                {
                                        test: /.jsx$/,
                                        exclude: /node_modules/,
                                        use: {
                                                loader: 'babel-loader',
                                                options: {
                                                        presets: ['@babel/preset-react', '@babel/preset-env']
                                                }
                                        }
                                },
                                // 第二個loader編譯ES6
                                {
                                        test: /.js$/,
                                        exclude: /node_modules/,
                                        use: {
                                                loader: 'babel-loader',
                                                options: { presets: ['@babel/preset-env'] }
                                        }
                                },
                                {
                                        test: /(\.js|\.jsx)$/,
                                        exclude: /node_modules/,
                                        use: {
                                                loader: 'babel-loader',
                                                options: {
                                                        presets: [
                                                                '@babel/preset-env',
                                                                '@babel/preset-react'
                                                        ],
                                                        plugins: [
                                                                '@babel/transform-runtime'
                                                        ]
                                                }
                                        }
                                },
                                //第三個loader編譯CSS
                                {
                                        test: /.css$/,
                                        exclude: /node_modules/,
                                        use: [
                                                MiniCssExtractPlugin.loader,
                                                'css-loader'
                                        ]
                                },
                                //第四個loader編譯SCSS
                                // {
                                //         test: /.css$/,
                                //         exclude: /node_modules/,
                                //         use: {
                                //                 loader: 'css-loader'
                                //         }
                                // },
                                //第五個loader編譯SASS/SCSS
                                {
                                        test: /.s[ac]ss$/,
                                        exclude: /node_modules/,
                                        use: [
                                                { loader: 'style-loader' },
                                                { loader: 'css-loader' },
                                                { loader: 'sass-loader' }
                                        ]
                                },
                                //第六個loader編譯圖檔
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
                                },
                                {
                                        test: /\.md$/,
                                        use: "raw-loader"
                                },
                        ]
        },
        plugins: [
                // new CleanWebpackPlugin(),
                // new webpack.HotModuleReplacementPlugin(),
                new MiniCssExtractPlugin (),
                new HtmlWebpackPlugin ({
                        template: './views/index.html',         // 參照物
                })
        ],
        //增加一個給devserver的設定
        devServer: {
                //指定開啟port為9000
                // contentBase: './views',
                port: 9000,
                // historyApiFallback: {
                        //   index: '/views/index.html'
                // },
                stats: {
                        colors: true,
                        chunks: false
                },
                historyApiFallback: true,
                // hot: true
        },
        // devtool: "#source-map",
        optimization: {
                minimizer: [
                        new TerserPlugin({
                                cache: true,
                                parallel: true,
                                sourceMap: true
                        }),
                        new OptimizeCssAssetsPlugin({
                                assetNameRegExp: /\.css\.*(?!.*map)/g, //注意不要写成 /\.css$/g
                                cssProcessor: require("cssnano"),
                                cssProcessorOptions: {
                                        discardComments: { removeAll: true },
                                        safe: true,
                                        autoprefixer: false
                                },
                                canPrint: true
                        })
                ]
        }
};
```

## webpack bundle module chunk

<https://juejin.im/post/5d70ad50f265da03cf7aae91>
