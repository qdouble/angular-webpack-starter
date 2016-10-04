/**
 * @authors: @qdouble and @AngularClass
 */

const path = require('path');
const fs = require('fs');

// Helper functions
const _root = path.resolve(__dirname);

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function testDll() {
  if (!fs.existsSync('./dll/polyfill.dll.js') || !fs.existsSync('./dll/vendor.dll.js')) {
    throw "DLL files do not exist, please use 'npm run build:dll' once to generate dll files.";
  }
};

exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
exports.testDll = testDll;
