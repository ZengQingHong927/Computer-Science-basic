# 前端脚本配置
source-map-explorer             // 分析打包编译后的静态文件
node-sass-chokidar              //
webpack-bundle-analyzer         // 分析webpack打包编译后的模块大小

build-css node-sass-chokidar --include-path ./node_modules/ src/ -o src/
watch-css npm run build-css && node-sass-chokidar --include-path ./node_modules src/ -o src/ --watch --recursive