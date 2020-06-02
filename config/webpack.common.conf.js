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
        pageOne:'./public/pageOne/index.js',
        pageTwo:'./public/pageTwo/index.js',
    },
    output: {
        path: path.resolve(__dirname,'../build'),
        filename: "[name][hash].js"
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            resolve('public'),
            resolve('node_modules')
        ],
        alias: {
            'assets':resolve('/public/assets')
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
            template: "./public/index.html",
            filename: "webpack.html",
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