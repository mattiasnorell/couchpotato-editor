const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'style.css';
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';
const tailwindConfig = require('./tailwind.config.js');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
var pjson = require('./package.json');
const terserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env = {}) => {
    process.env.NODE_ENV = 'production';

    const config = {
        entry: {
            couchpotato: path.join(__dirname, 'src', 'main.ts')
        },
        output: {
            filename: '[name][hash].js',
            chunkFilename: '[name][hash].js',
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
                    use: [
                        {
                            loader: MiniCss.loader
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [require('tailwindcss')(tailwindConfig)]
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
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
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/app.pug',
                inject: true,
                filename: 'index.html'
            }),
            new MiniCss({
                filename: cssFile
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(pjson.version)
            }),
            new BundleAnalyzerPlugin()
        ]
    };

    return config;
};
