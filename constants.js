"use strict";
const root = require('./config/helpers.js').root

exports.DEV_PORT = 3000;
exports.E2E_PORT = 4201;
exports.HOST = 'localhost';
exports.PROD_PORT = 8088;

exports.EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
]