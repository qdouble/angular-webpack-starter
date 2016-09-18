"use strict";
const root = require('./config/helpers.js').root

exports.DEV_PORT = 3000;
exports.E2E_PORT = 4201;
exports.HOST = 'localhost';
exports.PROD_PORT = 8088;
exports.UNIVERSAL_PORT = 8000;

exports.EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
]

exports.MY_CONFIG_PLUGINS = [
  // use this to import your own webpack config plugins.
]

exports.MY_CONFIG_PRODUCTION_PLUGINS = [
  // use this to import your own webpack config plugins for production use.
]

exports.MY_LOADERS = [
  // use this to import your own loaders for webpack config.
]

exports.MY_PRE_LOADERS = [
  // use this to import your own preLoaders for webpack config.
]