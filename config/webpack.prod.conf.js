const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.conf');
const merge = require('webpack-merge');

module.exports = merge(common,{
        plugins: [
            new ExtractTextPlugin('./css/[name].css'),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp:/\.css$/g,
                cssProcessor:require('cssnano'),
                cssProcessorPluginOptions:{
                    preset:['default',{discardComments:{removeAll:true}}]
                },
                canPrint:true
            }),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: path.resolve(__dirname,'../public/assets'),
            //             to: path.resolve(__dirname,'../build/assets')
            //         },
            //     ],
            // }),
            new CleanWebpackPlugin(),
        ]
    }
)