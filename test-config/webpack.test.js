/**
 * @authors: @qdouble and @AngularClass
 */
const webpack = require('webpack');
const root = require('../helpers').root;

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const EXCLUDE_SOURCE_MAPS = require('../constants').EXCLUDE_SOURCE_MAPS;
const MY_TEST_RULES = require('../constants').MY_TEST_RULES;
const MY_TEST_PLUGINS = require('../constants').MY_TEST_PLUGINS;
const STORE_DEV_TOOLS = require('../constants').STORE_DEV_TOOLS;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  entry: {
    main: './src/main.browser'
  },

  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',

  /**
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /**
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js']

  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /**
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    rules: [

      /**
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [root('node_modules')]
      },

      /**
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS]
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /**
           * These packages have problems with their sourcemaps
           */
          root('node_modules/rxjs'),
          root('node_modules/@angular')
        ]
      },

      /**
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?sourceMap=false,inlineSourceMap=true,compilerOptions{}=removeComments:true',
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },

      /**
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      { test: /\.json$/, loader: 'json-loader', exclude: [root('src/index.html')] },

      /**
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [root('src/index.html')] },

      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },

      /**
       * Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      { test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')] },

      /**
       * Instruments JS files with Istanbul for subsequent code coverage reporting.
       * Instrument only testing sources.
       *
       * See: https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        include: root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      },
      ...MY_TEST_RULES
    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src')
    ),
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      AOT: false,
      ENV: JSON.stringify('test'),
      HMR: false,
      PORT: 3000,
      HOST: JSON.stringify('localhost'),
      STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
      UNIVERSAL: false
    }),
    new NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: root('./src')
        }
      }
    }),
    ...MY_TEST_PLUGINS
  ],

  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    process: false,
    crypto: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};