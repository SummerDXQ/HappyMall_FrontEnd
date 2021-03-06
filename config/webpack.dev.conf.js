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
                '/product/': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
                '/user/': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
                '/cart/': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
                '/order/': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
                '/shipping/': {
                    target: 'http://admintest.happymmall.com',
                    changeOrigin: true
                },
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    })
