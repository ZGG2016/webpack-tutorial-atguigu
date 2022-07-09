const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  // 提取css成单独文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  // css/less兼容性处理
  // 还需要在package.json中定义browserslist
  'postcss-loader'
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
      /*
        正常来讲，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
          先执行eslint 在执行babel
      */
      {
        // js语法检查
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      // js兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {version: 3},
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
      },
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
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // css压缩
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // html压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    require('postcss-preset-env')
  ],
  // js压缩
  mode: 'production'
};
