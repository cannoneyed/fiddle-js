const commonConfig = require('../configs/webpack/common');

module.exports = (_, env, config) => {
  config.module = commonConfig.module;
  config.resolve = commonConfig.resolve;

  return config;
};
