
// 1.先在入口文件引入 css/less 文件（如果需要打包样式文件）
// 2.配置完如下项，重点是 new HtmlWebpackPlugin，并指定 index.html 文件（下载、配置）
// 3.在该目录下执行 webpack 即可

const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],
    mode: "development"
}