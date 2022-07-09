const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /*
            语法检查： eslint-loader  eslint
              注意：只检查自己写的源代码，第三方的库是不用检查的
              设置检查规则：
                package.json中eslintConfig中设置~
                  "eslintConfig": {
                    "extends": "airbnb-base"
                  }
                airbnb --> eslint-config-airbnb-base(用来语法检查)  eslint-plugin-import eslint
          */
            {
                test: /\.js$/,
                // 不检查第三方的库
                exclude: /node-modules/,
                loader: "eslint-loader",
                options:{
                    // 自动修复eslint的错误
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'

}