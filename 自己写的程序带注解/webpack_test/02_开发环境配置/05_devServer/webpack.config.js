const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      // {
      //   // 排除css/js/html资源
      //   exclude: /\.(css|js|html|less)$/,
      //   loader: 'file-loader',
      //   // options: {
      //   //   name: '[hash:10].[ext]'
      //   // }
      // }

      // webpack5
      {
        exclude: /\.(css|js|html|less)$/,
        type: 'asset/resource',
        dependency: { not: ['url'] },
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出，即不会输出 build 目录，一旦终止程序运行，就会将其从内存中删除
  // 执行启 npx webpack-dev-server 指令启动 devServer 即可
  devServer: {
    // 项目构建后路径
    // contentBase:resolve(__dirname,"build"),
    static:resolve(__dirname,"build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
};
