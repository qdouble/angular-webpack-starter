const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');

const tsconfigs = {
  client: root('./src/tsconfig.browser.json'),
  server: root('./src/tsconfig.server.json')
};

function getAotPlugin(platform, aot) {
  return new AotPlugin({
    tsConfigPath: tsconfigs[platform],
    skipCodeGeneration: !aot
  });
}

module.exports = {
  getAotPlugin: getAotPlugin
};
