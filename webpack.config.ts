/* tslint:disable: variable-name max-line-length */
import 'ts-helpers';
import { DEV_PORT } from './constants';

const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin,
  optimize: {
    CommonsChunkPlugin
  }
} = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const path = require('path');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

const ENV = process.env.npm_lifecycle_event;
const AOT = ENV === 'build:aot' || ENV === 'build:aot:dev' || ENV === 'server:aot' || ENV === 'watch:aot';
const isProd = ENV === 'build:prod' || ENV === 'server:prod' || ENV === 'watch:prod' ||  ENV === 'build:aot';

// type definition for WebpackConfig at the bottom
module.exports = function webpackConfig(): WebpackConfig {

  const CONSTANTS = {
    AOT: AOT,
    ENV: isProd ? JSON.stringify('production') : JSON.stringify('development'),
    PORT: DEV_PORT,
    HOST: 'localhost'
  };

  let config: WebpackConfig = Object.assign({});

  config.cache = true;
  isProd ? config.devtool = 'source-map' : config.devtool = 'eval';

  if (AOT) {
    config.entry = {
      main: './src/main.browser.aot'
    };
  } else {
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
        loaders: ['raw-loader', 'sass-loader']
      },
    ]
  };

  config.plugins = [
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('./src')
      ),
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
      }),
      // Generate Gzip files (Optional, production server should do this.) //
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    config.resolve = {
      extensions: ['.ts', '.js'],
      root: root('src'),
      moduleDirectories: ['node_modules'],
      mainFields: ['module', 'main', 'browser']
    };
  } else {
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

} ();

// // Types
interface WebpackConfig {
    cache?: boolean;
    target?: string;
    devtool?: string;
    entry: any;
    output: any;
    module?: any;
    plugins?: Array<any>;
    resolve?: {
      root?: string;
      extensions?: Array<string>;
      moduleDirectories?: Array<string>;
      mainFields?: Array<string>;
    };
    devServer?: {
      contentBase?: string;
      port?: number;
      historyApiFallback?: boolean;
      hot?: boolean;
      inline?: boolean;
    };
    node?: {
      process?: boolean;
      global?: boolean | string;
      Buffer?: boolean;
      crypto?: string | boolean;
      module?: boolean;
      clearImmediate?: boolean;
      setImmediate?: boolean
      clearTimeout?: boolean;
      setTimeout?: boolean
    };
}
