const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const global = require('glob');
const globby = require('globby');

const root_directory = path.join(__dirname, '..');
const src_directory = path.join(root_directory, 'src');

const initMpa = () => {
  // const chunkFiles = globby.sync(path.resolve(__dirname, '../src/page/*'));
  const chunkFolders = globby.sync(path.resolve(__dirname, '../src/page/*'));
  const chunkConfig = {};
  const htmlPlugins = [];
  chunkFolders.forEach((chunkFolder) => {
    const folderName = path.basename(chunkFolder);
    // console.log('chunkFolders ==> ', chunkFolder);
    // console.log('folder name ==> ', folderName);
    // const match = chunkFile.match(/src\/\w+\/index.js/)[0];
    // const chunkName = match.split('/')[1];
    // chunkConfig[chunkName] = path.join(__dirname, '../', match);
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: folderName + '.pug',
        template: path.join(__dirname, '../src/page/' + folderName + '/index.pug'),
        chunks: [folderName],
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      })
    );
  });
  console.log('htmlplugins ==> ', htmlPlugins);
  // return {
  //   chunkConfig,
  //   htmlPlugins,
  // };
};
initMpa();
// const { chunkConfig, htmlPlugins } = initMpa();

// module.exports = {
//   entry: chunkConfig,
//   output: {
//     path: path.resolve(__dirname, '../dist'),
//     filename: '[name].[chunkhash].js',
//   },
//   plugins: [...htmlPlugins, new CleanWebpackPlugin()],
//   resolve: {
//     modules: [path.resolve('node_modules'), 'node_modules'],
//     alias: {
//       '@src': path.resolve(__dirname, '../src'),
//       '@css': path.resolve(__dirname, '../src/assets/css'),
//       '@font': path.resolve(__dirname, '../src/assets/fonts'),
//       '@images': path.resolve(__dirname, '../src/assets/images'),
//       '@context': path.resolve(__dirname, '../src/context'),
//       '@data': path.resolve(__dirname, '../src/data'),
//     },
//     extensions: [
//       '.js',
//       '.jsx',
//       '.css',
//       '.scss',
//       '.sass',
//       '.ttf',
//       '.otf',
//       '.woff',
//       '.eot',
//       '.woff2',
//       '.png',
//       '.jpg',
//       '.gif',
//       '.jpeg',
//     ],
//   },
//   performance: {
//     hints: false,
//   },
// };
