const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  module: {
    rules: [ 
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },  
  devServer: {  
    contentBase: './',
  }
});