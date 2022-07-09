/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
  【，且不重复打包】
  【可以先进行node_modules的某些库进行dll打包，然后（通过DllReferencePlugin）告诉webpack编译的时候不要打包这些文件了】
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    如果需要运行 webpack.dll.js 文件，执行 webpack --config webpack.dll.js


    1. 新建 webpack.dll.js 文件，执行 webpack --config webpack.dll.js, 生成 dll/ 目录
*/

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
