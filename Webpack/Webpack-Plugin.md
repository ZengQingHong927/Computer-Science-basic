# Webpack Plugin

## 常用Plugin

var   { CleanWebpackPlugin }    = require ('clean-webpack-plugin');
var     HtmlWebpackPlugin       = require ('html-webpack-plugin');
var     BundleAnalyzerPlugin    = require ('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var     TerserPlugin            = require ("terser-webpack-plugin");
var     OptimizeCssAssetsPlugin = require ("optimize-css-assets-webpack-plugin");
var     MiniCssExtractPlugin    = require ('mini-css-extract-plugin');