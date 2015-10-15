'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');
const precss      = require('precss');

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test:   /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    }]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin("styles.css")
  ],
  postcss: () => {
    return [autoprefixer, precss];
  }
};
