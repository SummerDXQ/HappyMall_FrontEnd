const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        pageOne:'./public/pageOne/index.js',
        pageTwo:'./public/pageTwo/index.js',
    },
    output: {
        path: path.resolve(__dirname,'build'),
        filename: "[name][hash].js"
    },
    devServer: {
        contentBase:'./build',
        host:'localhost',
        port:'8080',
        open:'true',
        hot:true,
        hotOnly:true
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
                exclude: /node_modules/,
                use: ['babel-loader']
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
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano'),
            cssProcessorPluginOptions:{
                preset:['default',{discardComments:{removeAll:true}}]
            },
            canPrint:true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: __dirname+'/public/assets',
                    to: __dirname+'/build/assets'
                },
            ],
        }),
        new CleanWebpackPlugin(),
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}