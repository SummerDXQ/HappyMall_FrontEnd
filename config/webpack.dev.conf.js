const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common,
    {
        devServer: {
            contentBase:'./build',
            host:'localhost',
            port:'8080',
            open:'true',
            hot:true,
            hotOnly:true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    })
