const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    overlay: {
      warnings: true,
      errors: true,
    }, // show compiler error
    host: '127.0.0.1',
    port: 3000,
  },
  module: {
    rules: [
      {
        // handle js
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // handle css module
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              import: true,
              sourceMap: true,
              url: true,
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: /\.module\.(sa|sc|c)ss$/,
      },
      {
        // handle css without module
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /\.module\.(sa|sc|c)ss$/,
      },
      {
        // handle image
        test: /\.(png|svg|jpg|gif|pdf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        // handle font
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
}); /* end module exports */
process.env.NODE_ENV = 'development';
