// 所有构建工具都是基于 nodejs 平台运行的，模块化默认采用 commonjs, 此 js 文件使用 commonjs
// src 里的 index.js 就是采用 ES6 语法

// 1.先在入口文件引入 css/less 文件
// 2.配置完如下项，重点是 module-rule 中的配置项（下载、配置）
// 3.在该目录下执行 webpack 即可

// 拼接路径的模块
const {resolve} = require("path");

module.exports = {
    // 指定打包的入口文件
    entry: "./src/index.js",
    // 指定输出目录及文件
    output:{
        // 打包输出文件
        filename: "main.js",
        // 打包输出目录
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    // 配置Loader （处 理 那 些 非 JavaScript 文 件）
    module: {
        // rules中详细Loader配置
        rules:[
            // 不同文件必须配置不同loader处理
            {
                // 通过正则匹配到css文件
                test: /\.css$/,
                // 使用哪些loader进行处理
                use: [
                    // 先下载 [npm i style-loader css-loader -D]
                    // use数组中loader执行顺序：从右到左，从下到上 依次执行
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    // body{\r\n    background-color: green;\r\n}", ""]);
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less编译成css
                    // 需要下载 less-loader和less [npm i less-loader less -D]
                    'less-loader',
                ]
            }
        ]
    },
    // 配置plugins
    plugins:[

    ],
    // 配置开发环境还是生产环境
    mode: 'development',
    // mode: 'production',
}