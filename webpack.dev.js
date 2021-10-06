const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'style.css';
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';
const tailwindConfig = require('./tailwind.config.js');
const webpack = require('webpack');
var pjson = require('./package.json');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
    process.env.NODE_ENV = 'development';

    const config = {
        entry: {
            couchpotato: path.join(__dirname, 'src', 'main.ts')
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            static: wwwFolder,
            port: 8000,
            hot: true,
            open: false,
            compress: true
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.pug$/,
                    use: ['html-loader', 'pug-html-loader'],
                    include: [path.join(__dirname, 'src')],
                    exclude: /node_modules/
                },
                {
                    test: /\.(css)$/,

                    use: [ { loader: miniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false,
                            }
                        }
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: 'file-loader?name=' + imgNames
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.css'],
            modules: [path.resolve(__dirname, './'), 'node_modules'],
            alias: {
                vue$: 'vue/dist/vue.esm-browser.js',
                _components: path.resolve(__dirname, 'src/components'),
                _models: path.resolve(__dirname, 'src/models'),
                _services: path.resolve(__dirname, 'src/services'),
                _pages: path.resolve(__dirname, 'src/pages'),
                _config: path.resolve(__dirname, 'src/config')
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/App.pug',
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
