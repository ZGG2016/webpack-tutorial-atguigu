// 从 html 文件开始分析如何写配置文件，然后就依次写配置
//     包含哪些部分: css less img 其他
// 注意：
//     1.在入口文件 index.js 中引入的样式
//     2.此例中图片是在样式文件中引入的

const {resolve} = require("path");
const HtmlWebpackPlugins = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            // css
            {
                test:/\.css$/,
                use: ["style-loader","css-loader"]
            },
            // less
            {
                test:/\.less$/,
                use: ["style-loader","css-loader","less-loader"]
            },
            // 图片
            // {
            //     test:/\.(png|gif|jpg)$/,
            //     loader: "url-loader",
            // },
            {
                test:/\.html$/,
                loader: "html-loader",
            },
            // 其他  图片
            {
                exclude: /\.(css|js|html|less)$/,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            }
        ]
    },
    plugins: [
        // html
        new HtmlWebpackPlugins({
            template: "./src/index.html"
        })
    ],
    mode: "development",
    devServer: {
        static: resolve(__dirname,"build"),
        compress: true,
        port: 3000,
        open:true
    }
}