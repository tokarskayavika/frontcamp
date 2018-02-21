var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './api/server.js',

    output: {
        filename: "./build/server.bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
            }]
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],
    target: 'node',
    externals: [nodeExternals()]
};

