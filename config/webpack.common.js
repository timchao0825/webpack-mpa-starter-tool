const path = require('path');
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
    chunkConfig[fileName] = path.resolve(__dirname, `../src/js/${fileName}.js`);
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/page/${fileName}.pug`),
        filename: `${fileName}.html`,
        chunks: [`${fileName}`],
        minify: false,
      })
    );
  });

  return {
    chunkConfig,
    htmlPlugins,
  };
};
const { chunkConfig, htmlPlugins } = initMpa();

module.exports = {
  entry: chunkConfig,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  context: path.resolve(__dirname, '../src'),
  plugins: [new CleanWebpackPlugin(), ...htmlPlugins],
  performance: {
    hints: false,
  },
};
