var config = require('./webpack.config.js');

config.devServer = {
    port: 8090,
    hot: true,
    contentBase: './'
};
config.watch = true;
config.devtool = 'source-map';
module.exports = config;