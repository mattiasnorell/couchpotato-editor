const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'style.css';
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';
const tailwindConfig = require('./tailwind.config.js');
const webpack = require('webpack');
var pjson = require('./package.json');

module.exports = (env = {}) => {
  var config = {
    entry: {
      couchpotato: path.join(__dirname, 'src', 'index.ts')
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: wwwFolder,

      port: 8000,
      hot: true,
      open: false,
      compress: true
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'awesome-typescript-loader',
          exclude: /node_modules/
        },
        {
          test: /\.pug$/,
          use: ['html-loader', 'pug-html-loader'],
          include: [path.join(__dirname, 'src')],
          exclude: /node_modules/
        },
        {
          test: /\.(sass|scss|css)$/,

          use: [
            {
              loader: MiniCss.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [require('tailwindcss')(tailwindConfig)]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader?name=' + imgNames
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss'],
      modules: [path.resolve(__dirname, './'), 'node_modules'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        _components: path.resolve(__dirname, 'src/components'),
        _models: path.resolve(__dirname, 'src/models'),
        _services: path.resolve(__dirname, 'src/services'),
        _pages: path.resolve(__dirname, 'src/pages'),
        _config: path.resolve(__dirname, 'src/config'),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.pug',
        inject: true,
        filename: 'index.html'
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(pjson.version)
      }),
      new MiniCss({
        filename: cssFile
      })
    ]
  };

  return config;
};
