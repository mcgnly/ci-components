var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __LOCAL__: true,
    __DEV__: false,
    __PRODUCTION__: false
});

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './examples/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'millio-widget-example.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    definePlugin
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
        'webworkify': 'webworkify-webpack'
    }
  },
  module: {
    loaders: [{
      test: /\.(js)$/,
      loaders: ['react-hot', 'babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'test'), path.join(__dirname, 'examples')]
    }, {
        test: /\.json$/,
        loader: 'json-loader'
    }, {
        test: /\.js$/,
        include: path.resolve('node_modules/mapbox-gl-shaders/index.js'),
        loader: 'transform/cacheable?brfs'
    }],
    postLoaders: [{
        include: /node_modules\/mapbox-gl-shaders/,
        loader: 'transform',
        query: 'brfs'
    }]
  }
};
