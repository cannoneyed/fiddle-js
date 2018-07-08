// https://github.com/storybooks/storybook/issues/155
import baseConfig from '../webpack.config.base';
import path from 'path';

export default (_, env, config) => {
  config.module = baseConfig.module;
  config.resolve = baseConfig.resolve;

  return config;
};
