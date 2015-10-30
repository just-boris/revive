'use strict';
/*eslint-env node*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function makeConfig(hotload) {
  return {
    entry: ['./src/application/index.jsx'],
    output: {
      path: path.join(__dirname, 'build'),
      pathinfo: true,
      filename: 'app.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(png|svg)$/,
        loader: 'url-loader'
      }, {
        test:   /\.css$/,
        loader: hotload ? 'style-loader!css-loader!postcss-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }]
    },
    devtool: 'source-map',
    plugins: (() => {
      const plugins = [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body'
        }),
        new ExtractTextPlugin('styles.css')
      ];
      return hotload ? plugins.concat(new webpack.HotModuleReplacementPlugin()) : plugins;
    })(),
    postcss: [require('postcss-partial-import'), require('precss'), require('autoprefixer')]
  };
}

module.exports = makeConfig();
module.exports.factory = makeConfig;
