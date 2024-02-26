const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'app/[name][chunkhash].css';
const imgNames = 'img/[name].[ext]';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
var pjson = require('./package.json');
const terserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
    process.env.NODE_ENV = 'production';

    const config = {
        entry: {
            couchpotato: path.join(__dirname, 'src', 'main.ts')
        },
        output: {
            filename: 'app/[name][chunkhash].js',
            chunkFilename: 'app/[name][chunkhash].js',
            path: path.resolve(__dirname, 'dist')
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
                    exclude: /node_modules/,
                    use: [{ loader: miniCssExtractPlugin.loader },
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
            extensions: ['.ts', '.js', '.scss'],
            modules: [path.resolve(__dirname, './'), 'node_modules'],
            alias: {
                vue$: 'vue/dist/vue.esm-browser.prod.js',
                _components: path.resolve(__dirname, 'src/components'),
                _models: path.resolve(__dirname, 'src/models'),
                _services: path.resolve(__dirname, 'src/services'),
                _pages: path.resolve(__dirname, 'src/pages'),
                _config: path.resolve(__dirname, 'src/config')
            }
        },
        optimization: {
            minimize: true,
            minimizer: [
                new terserJSPlugin({
                    terserOptions: {
                        keep_classnames: true,
                        keep_fnames: true
                    }
                }),
                new CssMinimizerPlugin()
            ],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        enforce: true,
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/App.pug',
                inject: true,
                filename: 'index.html'
            }),
            new MiniCss({
                filename: cssFile
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(pjson.version),
                __VUE_PROD_DEVTOOLS__: 'false',
                __APIURL__: JSON.stringify('http://couchpotato.automagiskdatabehandling.se/api')
            })
        ]
    };

    return config;
};
