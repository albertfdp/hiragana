const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',

  devtool: 'cheap-eval-source-map',

  entry: {
    app: ['./src/index.js']
  },

  output: {
    filename: '[name].js',
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

  devServer: {
    historyApiFallback: true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hiragana',
      template: './src/index.html'
    }),
    new HotModuleReplacementPlugin()
  ]
};
