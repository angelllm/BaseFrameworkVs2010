
'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
const webpack = require('webpack');

module.exports = {
    //devtool: 'eval-source-map',
    devtool:false,
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)(\?.*)?$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url?limit=8192'},
            { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url?limit=8192'},
            { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        //devtool: false,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]

}
