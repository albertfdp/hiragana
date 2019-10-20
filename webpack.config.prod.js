const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: {
    app: ['./src/index.js']
  },

  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha384'],
      enabled: true
    }),

    new HtmlWebpackPlugin({
      title: 'Hiragana',
      template: './src/index.html'
    })
  ]
};
