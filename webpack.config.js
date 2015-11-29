'use strict';
/*eslint-env node*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const PRODUCTION = NODE_ENV === 'production';

function makeConfig(hotload) {
  return {
    entry: ['./src/application/index.jsx'],
    output: {
      path: path.join(__dirname, 'build'),
      pathinfo: !PRODUCTION,
      filename: 'app.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules|application\/data/,
        loader: 'babel-loader'
      }, {
        test: /\.(png|svg|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }, {
        test:   /\.css$/,
        loader: hotload ? 'style-loader!css-loader!postcss-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }]
    },
    devtool: 'source-map',
    plugins: (() => {
      const plugins = [
        new webpack.IgnorePlugin(/locale/, /moment/),
        new webpack.DefinePlugin({
            MOCK_REQUEST: !PRODUCTION,
            'process.env': {
              NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body'
        }),
        new ExtractTextPlugin('styles.css')
    ];
      if(PRODUCTION) {
          plugins.push(new webpack.optimize.UglifyJsPlugin())
      }
      return hotload ? plugins.concat(new webpack.HotModuleReplacementPlugin()) : plugins;
    })(),
    postcss: [require('postcss-partial-import'), require('precss'), require('autoprefixer')]
  };
}

module.exports = makeConfig();
module.exports.factory = makeConfig;
