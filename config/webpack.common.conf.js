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

module.exports = {
    entry: {
        // pageOne:'./public/pageOne/index.js',
        // pageTwo:'./public/pageTwo/index.js',
        'index':'./src/page/index/index.js'
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
            // 'assets':resolve('/public/assets'),
            util : path.resolve(__dirname,'../src/util'),
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image'
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
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 8192,
                        name:'[hash][name].[ext]',
                        outputPath:'./img'
                    }
                }],
            },
            // for fonts
            {
                test: /\.(eot|svg|tff|woff|woff2|otf|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader',
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify:{
                minimize:true,
                removeComments:true,
                removeAttributeQuotes:true,
                collapseWhitespace:true,
                minifyCSS:true,
                minifyJS:true,
                removeEmptyElements:true
            },
            hash:true
        }),
        new ExtractTextPlugin('./css/[name].css'),
        new HappyPack({
            id:"happyBabel",
            loaders:["babel-loader"]
        })
    ]
}