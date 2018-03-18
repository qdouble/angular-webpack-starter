const { root } = require('./helpers');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const tsconfigs = {
  client: root('./src/tsconfig.browser.json'),
  server: root('./src/tsconfig.server.json')
};

const aotTsconfigs = {
  client: root('./src/tsconfig.browser.json'),
  server: root('./src/tsconfig.server.aot.json')
};

function getAotPlugin(platform, aot) {
  return new AngularCompilerPlugin({
    tsConfigPath: aot ? aotTsconfigs[platform] : tsconfigs[platform],
    skipCodeGeneration: !aot,
    sourceMap: false
  });
}

module.exports = {
  getAotPlugin: getAotPlugin
};
