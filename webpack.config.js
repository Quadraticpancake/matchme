const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
    'webpack-hot-middleware/client',
    __dirname + '/client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
        'postcss',
      ],
    },
    {
      test: /\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
        'postcss',
        'sass',
      ],
    },
    {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loaders: [ 'url?limit=10000' ],
    }]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: [ path.join(__dirname, "node_modules") ]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
    postcssImport({
      addDependencyTo: webpack,
    })
  ]


}