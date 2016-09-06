const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
// Webpack Constants

module.exports = {
  entry: {
    main: './src/main.browser.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('src'),
    moduleDirectories: ['node_modules']
  },
  module: {
    preloaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@angular2-material')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader', 
          'angular2-template-loader', 
          ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
    ]
  },
  plugins: [
    new ForkCheckerPlugin(),
    new NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ 
      name: ['main'], minChunks: Infinity 
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
}
