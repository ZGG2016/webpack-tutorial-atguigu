
// 1. 入口文件 index.js 引入了 index.less, 而 index.less 包含了 index.html 的样式，并引入了三张图片
// 2. 配置完如下项，重点是 url-loader 和 html-loader 处
// 3.在该目录下执行 webpack 即可

const {resolve} = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            // 用于打包 less
            {
                test: /\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },
            // 用于打包图片
            {
                // 问题：url-loader 默认处理不了html中img图片
                test: /\.(jpg|png|gif)]$/,
                // 下载 url-loader file-loader
                loader: "url-loader",
                // options: {
                //     // 图片大小小于8kb，就会被base64处理
                //     // 优点: 减少请求数量（减轻服务器压力）
                //     // 缺点：图片体积会更大（文件请求速度更慢）
                //     limit: 8 * 1024,
                //     // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                //     // 解析时会出问题：[object Module]
                //     // 解决：关闭url-loader的es6模块化，使用commonjs解析
                //     esModule: false,
                //     // 给图片进行重命名
                //     // [hash:10]取图片的hash的前10位
                //     // [ext]取文件原来扩展名
                //     name: '[hash:10].[ext]'
                // }
            },
            {
                test:/\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        // 用于打包 html
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development"
}