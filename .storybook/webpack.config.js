// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');
const webpackConfig = require('../webpack.config.renderer.dev');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.devtool = 'source-map';

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push(path.join(__dirname, '../app'));

  return config;
};
