
const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

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
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css"
        }),
        require('postcss-preset-env'),
    ],
    optimization:{
        minimize: true,
        minimizer: [
            // webpack5
            // https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
            new CssMinimizerPlugin(),
        ],
    },
    mode: 'development'
}