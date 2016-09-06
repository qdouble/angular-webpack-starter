"use strict";
/* tslint:disable: variable-name max-line-length */
require('ts-helpers');
var constants_1 = require('./constants');
var _a = require('webpack'), DefinePlugin = _a.DefinePlugin, ProgressPlugin = _a.ProgressPlugin, NoErrorsPlugin = _a.NoErrorsPlugin, CommonsChunkPlugin = _a.optimize.CommonsChunkPlugin;
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var path = require('path');
function root(__path) {
    if (__path === void 0) { __path = '.'; }
    return path.join(__dirname, __path);
}
var ENV = process.env.npm_lifecycle_event;
var AOT = ENV === 'build:aot' || ENV === 'server:aot' || ENV === 'watch:aot';
var isProd = ENV === 'build:prod' || ENV === 'server:prod' || ENV === 'watch:prod' || ENV === 'build:aot';
// type definition for WebpackConfig at the bottom
module.exports = function webpackConfig() {
    var CONSTANTS = {
        ENV: isProd ? JSON.stringify('production') : JSON.stringify('development'),
        PORT: constants_1.DEV_PORT,
        HOST: 'localhost'
    };
    var config = Object.assign({});
    config.cache = true;
    isProd ? config.devtool = 'source-map' : config.devtool = 'eval';
    if (AOT) {
        config.entry = {
            main: './src/main.browser.aot'
        };
    }
    else {
        config.entry = {
            main: './src/main.browser'
        };
    }
    config.output = {
        path: root('dist'),
        filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
        sourceMapFilename: isProd ? '[name].[hash].map' : '[name].map',
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };
    config.module = {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    root('node_modules/rxjs'),
                    root('node_modules/@angular')
                ]
            },
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
            { test: /\.css$/, loader: 'raw-loader' },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
            },
        ]
    };
    config.plugins = [
        new ProgressPlugin(),
        new ForkCheckerPlugin(),
        new CommonsChunkPlugin({ name: ['main'], minChunks: Infinity }),
        new DefinePlugin(CONSTANTS),
        new NamedModulesPlugin(),
        new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }]),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ];
    // Add build specific plugins
    console.log('PRODUCTION BUILD = ', isProd);
    if (isProd) {
        config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new NoErrorsPlugin(), 
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        new UglifyJsPlugin({
            beautify: false,
            comments: false
        }), new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }));
        config.resolve = {
            extensions: ['.ts', '.js'],
            root: root('src'),
            moduleDirectories: ['node_modules'],
            mainFields: ['module', 'main', 'browser']
        };
    }
    else {
        config.resolve = {
            extensions: ['.ts', '.js'],
            root: root('src'),
            moduleDirectories: ['node_modules']
        };
    }
    config.devServer = {
        contentBase: AOT ? './src/compiled' : './src',
        port: CONSTANTS.PORT,
        historyApiFallback: true
    };
    config.node = {
        global: 'window',
        process: true,
        Buffer: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
        clearTimeout: true,
        setTimeout: true
    };
    return config;
}();
//# sourceMappingURL=/Users/qdouble/Sites/EXAMPLE_APPS/a2-webpack2-aot-lazy-loading/ts-node/e2ab792c532639ed326a3210d16bf1a68550b4a9/223b6aca7a72ebb07fd4f6fefd2dfa6df8b694af.js.map