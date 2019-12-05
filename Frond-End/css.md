# 安裝SCSS套件
npm install sass-loader node-sass css-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin --save-dev
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path")
module.exports = {
  entry: './packages/src/main.scss',
  output: {
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [
      // Extracts the compiled CSS from the SASS files defined in the entry
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets CSS
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      }
    ],
  },
  plugins: [
    // Where the compiled SASS is saved to
    new MiniCssExtractPlugin({
      filename: 'index.css',
      allChunks: true,
    })
  ],
  optimization: {
    minimizer: [
      // 有时候webpack会默认优化z-index值，设置默认不优化
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  },
};
```