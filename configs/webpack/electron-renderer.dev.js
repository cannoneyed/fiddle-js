// electron renderer development config
const merge = require('webpack-merge');
const devConfig = require('./dev');

module.exports = merge(devConfig, {
  target: 'electron-renderer',
});
