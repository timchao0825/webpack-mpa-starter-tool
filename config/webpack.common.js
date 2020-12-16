const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globby = require('globby');

const root_directory = path.join(__dirname, '..');
const src_directory = path.join(root_directory, 'src');

const initMpa = () => {
  const chunkConfig = {};
  const htmlPlugins = [];

  const chunkFiles = globby.sync(path.join(__dirname, '../src/page/*/index.js'));
  chunkFiles.forEach((chunkFile) => {
    const match = chunkFile.match(/page\/\w+\/index.js/)[0];
    const chunkName = match.split('/')[1];
    chunkConfig[chunkName] = path.join(__dirname, '../src', match);
    const templatePath = path.join(__dirname, '../src/page/' + chunkName + '/index.pug');

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/page/' + chunkName + '/index.pug'),
        filename: chunkName + '.html',
        inject: true,
        chunks: ['index'],
        minify: {
          sortAttributes: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeComments: true,
        },
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
  // context: path.resolve(__dirname, '../src'),
  entry: chunkConfig,
  // entry: {
  //   index: '../src/main.js',
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '../dist/js/[name].[chunkhash].js',
  },
  plugins: [...htmlPlugins, new CleanWebpackPlugin()],
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.scss',
      '.sass',
      '.ttf',
      '.otf',
      '.woff',
      '.eot',
      '.woff2',
      '.png',
      '.jpg',
      '.gif',
      '.jpeg',
    ],
  },
  performance: {
    hints: false,
  },
};
