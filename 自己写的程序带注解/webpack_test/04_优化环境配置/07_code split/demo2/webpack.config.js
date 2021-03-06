const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口
  entry: './src/js/index.js',
  // entry: {
  //   // 多入口
  //   index: './src/js/index.js',
  //   test: './src/js/test.js'
  // },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk 【比如引入的jquery】
    【如果不使用这个配置会输出两个jquery】

    单入口：1
    多入口：1 2
  */
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  mode: 'production'
};