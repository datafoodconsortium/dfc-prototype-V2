const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [{
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {}
        }
      }, {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, "app/components")
        ],
        use: {
          loader: 'html-loader',
          options: {}
        }
      },
      {
        test: /\.(css|scss)/,
        // include: [
        //   path.resolve(__dirname, "app/styles")
        // ],
        use: {
          loader: 'css-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html'
    })
  ]
}];
