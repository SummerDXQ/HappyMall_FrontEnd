const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common,
    {
        devServer: {
            contentBase:'./dist',
            host:'localhost',
            port:'8080',
            open:'true',
            hot:true,
            hotOnly:true,
            proxy: {
                '/product/list.do': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
                '/user/login.do': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    })
