var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __LOCAL__: false,
    __PRODUCTION__: true
});

var optimizePlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = {
  entry: [
    './examples/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'millio-widget-example.js'
  },
  target: 'web', // in order to ignore built-in modules like path, fs, etc.
  externals: [], // in order to ignore all modules in node_modules folder
  plugins: [definePlugin, optimizePlugin],
  resolve: {
    extensions: ['', '.js'],
    alias: {
        react: path.resolve('./node_modules/react'),
        webworkify: 'webworkify-webpack'
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: { compact: true, minified: true }
    },  {
        test: /\.json$/,
        loader: 'json-loader'
     }]
  }
};
