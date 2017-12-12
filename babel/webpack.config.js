var path = require('path');

module.exports = {
    entry: {
        main: ['babel-polyfill', 'whatwg-fetch', './scripts/main.js', './style/main.scss'],
        json: './myjson.json'
    },

    output: {
        filename: "./build/[name].bundle.js"
    },

    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
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
        }, {
            test: /\.json$/,
            use: [{
                loader: 'raw-loader'
            }, {
                loader: 'json-loader'
            }, {
                loader: 'my-loader',
            }]
        }]
    },
    plugins: []
};

