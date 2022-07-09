// 注意对输出目录的分类管理

const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/main.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: "css/main.css"
        })
    ],
    mode: 'development'
}