/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead. 
 * If more constants should be added file an issue or create PR.
 */
import 'ts-helpers';

import {
  DEV_PORT, EXCLUDE_SOURCE_MAPS, HOST,
  MY_PLUGINS, MY_PRODUCTION_PLUGINS, MY_LOADERS, MY_PRE_LOADERS, MY_POST_LOADERS,
  MY_SERVER_PRE_LOADERS, MY_SERVER_INCLUDE_CLIENT_PACKAGES
} from './constants';

const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin
} = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ForkCheckerPlugin } = require('awesome-typescript-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');

const includeClientPackages = require('./config/helpers.js').includeClientPackages;
const root = require('./config/helpers.js').root;

const ENV = process.env.npm_lifecycle_event;
const AOT = ENV === 'build:aot' || ENV === 'build:aot:dev' || ENV === 'server:aot' || ENV === 'watch:aot' || ENV === 'build:universal:aot' || ENV === 'build:universal:server';
const isProd = ENV === 'build:prod' || ENV === 'server:prod' || ENV === 'watch:prod' || ENV === 'build:aot' || ENV === 'build:universal' || ENV === 'build:universal:aot' || ENV === 'build:universal:server';
const UNIVERSAL = ENV === 'build:universal' || ENV === 'build:universal:aot' || ENV === 'build:universal:server';
const UNIVERSAL_SERVER = ENV === 'build:universal:server';

console.log('PRODUCTION BUILD: ', isProd);
console.log('AOT: ', AOT);

const CONSTANTS = {
  AOT: AOT,
  ENV: isProd ? JSON.stringify('production') : JSON.stringify('development'),
  PORT: DEV_PORT,
  HOST: JSON.stringify(HOST),
  UNIVERSAL: UNIVERSAL
};

const commonConfig = function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});
  config.plugins = [];

  config.module = {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS]
      },
      ...MY_PRE_LOADERS
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?loader=system&genDir=src/compiled/src/app&aot=' + AOT,
          '@angularclass/hmr-loader'
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      ...MY_LOADERS
    ],
    postLoaders: [
      ...MY_POST_LOADERS
    ]
  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src')
    ),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }, {
      from: 'src/index.html',
      to: ''
    }]),
    ...MY_PLUGINS
  ];

  if (isProd) {
    config.plugins.push(
      new NoErrorsPlugin(),
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      ...MY_PRODUCTION_PLUGINS
    );
  }

  return config;
} ();

// type definition for WebpackConfig at the bottom
const clientConfig = function webpackConfig(): WebpackConfig {

  let config: WebpackConfig = Object.assign({});

  config.cache = true;
  isProd ? config.devtool = 'source-map' : config.devtool = 'eval';

  if (!UNIVERSAL) {
    if (AOT) {
      config.entry = {
        main: './src/main.browser.aot'
      };
    } else {
      config.entry = {
        main: './src/main.browser'
      };
    }
  } else {
    if (AOT) {
      config.entry = {
        main: './src/main.browser.universal.aot'
      };
    } else {
      config.entry = {
        main: './src/main.browser.universal'
      };
    }
  }

  config.output = {
    path: root('dist/client'),
    filename: 'index.js'
  };

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

const serverConfig: WebpackConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    filename: 'index.js',
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [
      { test: /angular2-material/, loader: 'imports-loader?window=>global' },
      ...MY_SERVER_PRE_LOADERS
    ],
  },
  externals: includeClientPackages([
    // include these client packages so we can transform their source with webpack loaders
    '@angular2-material/button',
    '@angular2-material/button',
    '@angular2-material/card',
    '@angular2-material/checkbox',
    '@angular2-material/core',
    '@angular2-material/grid',
    '@angular2-material/icon',
    '@angular2-material/input',
    '@angular2-material/list',
    '@angular2-material/menu',
    '@angular2-material/progress',
    '@angular2-material/progress',
    '@angular2-material/radio',
    '@angular2-material/sidenav',
    '@angular2-material/slider',
    '@angular2-material/slide',
    '@angular2-material/tabs',
    '@angular2-material/toolbar',
    '@angular2-material/tooltip',
    ...MY_SERVER_INCLUDE_CLIENT_PACKAGES
  ]),
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

const defaultConfig = {
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: root('src'),
    moduleDirectories: ['node_modules']
  }
};

if (!UNIVERSAL) {
  console.log('BUILDING APP');
  module.exports = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
} else {
  if (!AOT) {
    console.log('BUILDING UNIVERSAL');
    module.exports = [
      webpackMerge({}, defaultConfig, commonConfig, clientConfig),
      webpackMerge({}, defaultConfig, commonConfig, serverConfig)
    ];
  } else {
    if (UNIVERSAL_SERVER) {
      console.log('BUILDING UNIVERSAL SERVER FOR AOT MODE');
      throw 'Work in progress: Not yet implmented.';
      //   module.exports = [
      //     webpackMerge({}, defaultConfig, commonConfig, serverConfig)
      // ];
    } else {
      console.log('BUILDING UNIVERSAL CLIENT FOR AOT MODE');
      throw 'Work in progress: Not yet implemented.';
      // module.exports = [
      //   webpackMerge({}, defaultConfig, commonConfig, clientConfig)
      // ];
    }
  }
}

// // Types
interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: any;
  externals?: any;
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
    setTimeout?: boolean;
    __dirname?: boolean;
    __filename?: boolean;
  };
}
