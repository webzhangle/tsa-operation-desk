
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer')
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false
module.exports = {
    entry: {
        'tsa-operation-desk': './tsa-operation-desk/index.js'
    },
      //path打包出口路径，filename写打包后文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        libraryExport: "default",
        library: "TsaOperationDesk",
        libraryTarget: "umd",
        clean: true, // 在生成文件之前清空 output 目录
        environment: {
          arrowFunction: false // webpack5 处理箭头函数
        }
    },
    module: {
        rules: [
            { test: /\.css/, use: [ isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader',] },
            { test: /\.scss$/, use: [ isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", "sass-loader", 'postcss-loader'] },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        esModule: false,
                        limit: 1024 * 1024,  //文件小于 8(8192) kb 会把图片编译成base64字符串
                      }
                    }
                ]
            },
            {
              test: /(\.(ttf|woff|eot)$|iconfont\.svg)/,
              use: [
                {
                  loader: "file-loader",
                  options: {
                    // name: "[hash:10].[ext]",
                    // outputPath: "font"
                  },
                }
              ]
            },
            {
              test: /\.js$/,
              exclude: /node_modules/, // 把node_modules排除在外，node_modules中的js是不需要转化
              use: {
                loader: 'babel-loader',
                options: { // 配置项
                  presets: ['@babel/preset-env'],
                }
              }
            }
        ]
    },
    resolve: {
        alias:{
          '@': path.resolve(__dirname, 'src'),
          '@tsa-operation-desk': path.resolve(__dirname, 'tsa-operation-desk'),
        },
        extensions: ['.js', '.vue']
      },
    plugins: [
      new MiniCssExtractPlugin({filename: 'css/style.css'})
      
    ],
    devServer: {
        open: true,
        hot: true,
        compress: true,
        port: 9200
    }
}