const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HappyPack = require('happypack');

function resolve(dir){
    return path.join(__dirname,'..',dir)
}

// get html-webpack-plugin params
let getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

module.exports = {
    entry: {
        'index':'./src/page/index/index.js',
        'common':'./src/page/common/index.js',
        'list':'./src/page/list/index.js',
        'detail':'./src/page/detail/index.js',
        'cart':'./src/page/cart/index.js',
        'order-confirm':'./src/page/order-confirm/index.js',
        'order-list':'./src/page/order-list/index.js',
        'user-login':'./src/page/user-login/index.js',
        'user-register':'./src/page/user-register/index.js',
        'user-pass-reset':'./src/page/user-pass-reset/index.js',
        'user-pass-update':'./src/page/user-pass-update/index.js',
        'user-center':'./src/page/user-center/index.js',
        'user-center-update':'./src/page/user-center-update/index.js',
        'result':'./src/page/result/index.js',
    },
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: "js/[name].js",
        // filename: "js/[name][hash].js",
        publicPath: "/dist"
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            resolve('public'),
            resolve('node_modules')
        ],
        alias: {
            node_modules : path.resolve(__dirname,'../node_modules'),
            util : path.resolve(__dirname,'../src/util'),
            page : path.resolve(__dirname,'../src/page'),
            service : path.resolve(__dirname,'../src/service'),
            image : path.resolve(__dirname,'../src/image')
        }
    },
    module: {
        rules: [
            //for css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            //for less
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            // for scss
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader',{
                    loader: "postcss-loader",
                    options: {
                        plugins:[
                            require("autoprefixer")
                        ]
                    }
                }]
            },
            // for images
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name:'[hash][name].[ext]',
                            outputPath:'./img',
                            esModule: false,
                        },

                    },
                ],
            },
            // for fonts
            {
                test: /\.(eot|svg|tff|woff|woff2|otf|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'[hash][name].[ext]',
                            outputPath:'./fonts'
                        },
                    },
                ],
            },
            // for js
            {
                test: /\.js$/,
                include: [resolve('public')],
                exclude: /node_modules/,
                loader: "happypack/loader?id=happyBabel",
                // use: ['babel-loader']
            },
            // for string
            {
                test: /\.string$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.(htm|html)$/i,
            //     use:[ 'html-withimg-loader']
            // }

            // {
            //     test: /\.(html)$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attributes:{
            //                 list:[
            //                     {
            //                         tag:'img',
            //                         attribute:'src',
            //                         type:'src'
            //                     }
            //                 ]
            //             }
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: "./src/view/index.html",
        //     filename: "index.html",
        //     minify:{
        //         minimize:true,
        //         removeComments:true,
        //         removeAttributeQuotes:true,
        //         collapseWhitespace:true,
        //         minifyCSS:true,
        //         minifyJS:true,
        //         removeEmptyElements:true
        //     },
        //     hash:true
        // }),
        new HtmlWebpackPlugin(getHtmlConfig('index', 'Home Page')),
        new HtmlWebpackPlugin(getHtmlConfig('list', 'Product List')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', 'Product Detail')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', 'Shopping Cart')),
        new HtmlWebpackPlugin(getHtmlConfig('result', 'Result Page')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', 'Order Confirm')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', 'Order List')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', 'User Login')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', 'User Register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', 'Password Reset')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', 'Password Update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', 'User Center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', 'Update Profile')),
        new ExtractTextPlugin('./css/[name].css'),
        new HappyPack({
            id:"happyBabel",
            loaders:["babel-loader"]
        })
    ]
}