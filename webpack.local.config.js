var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __LOCAL__: true,
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
        'webworkify': 'webworkify-webpack',
        'gl-matrix': path.resolve('./node_modules/gl-matrix/dist/gl-matrix.js')
    }
  },
  module: {
    loaders: [{
      test: /\.(js)$/,
      loaders: ['react-hot'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'test'), path.join(__dirname, 'examples')]
    },
    {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'test'), path.join(__dirname, 'examples')],
        query: { compact: true, minified: true }
    }, {
        test: /\.json$/,
        loader: 'json-loader'
    }],

    postLoaders: [{
      include: /node_modules\/mapbox-gl/,
      loader: 'transform-loader',
      query: 'brfs',
    }]
  }
};
