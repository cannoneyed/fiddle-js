/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const { dependencies: externals } = require('./app/package.json');

module.exports = {
  externals: Object.keys(externals || {}),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'renderer.dev.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'app'), 'node_modules'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
