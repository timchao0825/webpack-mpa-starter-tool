const path = require('path');
const glob = require('glob');
const globby = require('globby');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const initMpa = () => {
  const chunkConfig = {};
  const htmlPlugins = [];
  const chunkFiles = globby.sync(path.join(__dirname, '../src/page/*.pug'));
  chunkFiles.forEach((chunkFile) => {
    const fileName = path.basename(chunkFile, '.pug');
    console.log('file name ==>', fileName);
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/page/${fileName}.pug`),
        filename: fileName + '.html',
        inject: true,
        chunks: ['index'],
        minify: false,
      })
    );
  });
  return {
    chunkConfig,
    htmlPlugins,
  };
};
// initMpa();
const { chunkConfig, htmlPlugins } = initMpa();
module.exports = {
  context: path.resolve(__dirname, '../src'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  entry: '../src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '../dist/js/[name].[chunkhash].js',
  },
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins, new CopyPlugin([{ from: 'assets', to: 'assets' }])],
  performance: {
    hints: false,
  },
};
