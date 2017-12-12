const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var config = require('./webpack.config.js');

config.plugins.push(new UglifyJsPlugin());
module.exports = config;

