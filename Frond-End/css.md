# CSS Basic

## Webpack 編譯安裝 SCSS 套件
http://www.ruanyifeng.com/blog/2012/06/sass.html  


npm install sass-loader node-sass css-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin --save-dev

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./packages/src/main.scss",
  output: {
    path: path.resolve(__dirname, "lib")
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
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      }
    ]
  },
  plugins: [
    // Where the compiled SASS is saved to
    new MiniCssExtractPlugin({
      filename: "index.css",
      allChunks: true
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
  }
};
```

## CSS 按需加載

## CSS Basic

CSS 樣式表空格表示 DOM 階層式應用

```js
h1 p { font-size 30px }
.important.warning { color: red; font-size 30px } // 有效 class="important warning"
.important .warning { color: yellow; font-size 50px } // 有效 <h1 class="important"><p class="warning"></p></h1>
```

- 子元素選擇器
- 元素選擇器
- 類選擇器
- ID 選擇器
- 屬性選擇器
- 後代選擇器

1. 子元素選擇器
   h1 > sytong { color: red }

```js
<h1>This is <strong>very</strong> important topic</h1>  // 有效果
<h1>This is <em>really<strong>very</strong></em> important topic</h1>   // 無效果
```

2. 元素選擇器
   html { color: black }
   p { color: blue }
   h2 { color: silver }

3. 類選擇器
   p.important { color:red }
   h1.important { color:blue }

```js
<h1 class="important">this is important</h1>  // 有效
<p class="important">this is important paragraph</p>  // 有效
<p>this is important paragraph</p>  // 無效
```

4. ID 選擇器
   #intro { color: blue }

```js
<p id="intro">This is topic about security</p> //有效
```

5. 屬性選擇器

```js
a[href][title] {  color: red }
<a href="http://www.google.com" title="Top Web Browser">  //有效
<a>  //無效
```

6. 後代選擇器

h1 em { color: green }

```js
<h1>This is a <em>important</em>topic about security</h1> // 有效
<h1>This is a <strong><em>important</em></strong>topic about security</h1>  // 有效
```

## Height
1. 内容区域
100% vs 100vh
div没内容物时，height: 100%, 高度显示为0, 而height: 100vh, 高度显示为整个银幕视窗

## Flex  
- container: 
  display: flex; (弹性布局)
  flex-direction: row | row-reverse | column | column-reverse; （项目的排列方向）
  flex-wrap: nowrap | wrap | wrap-reverse; （如果一条轴线排不下，如何换行）
  flex-flow: <flex-direction> <flex-wrap>; （flex-direction属性和flex-wrap属性的简写）
  justify-content: flex-start | flex-end | center | space-between | space-around; （项目在主轴上的对齐方式）
  align-items: flex-start | flex-end | center | baseline | stretch; (项目在交叉轴上对齐方式)
  align-content:  flex-start | flex-end | center | space-between | space-around | stretch; (多根轴线的对齐方式)


item
https://wcc723.github.io/css/2017/07/21/css-flex/  
https://www.runoob.com/w3cnote/flex-grammar.html