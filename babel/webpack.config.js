module.exports = {
    entry: ['whatwg-fetch', './scripts/main.js'],

    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
    watch: true
};

