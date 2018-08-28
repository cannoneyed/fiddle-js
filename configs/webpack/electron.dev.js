// electron development config
const { resolve } = require('path');
const merge = require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge({
  target: 'electron-main',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['main', 'node_modules'],
  },
  context: resolve(__dirname, '../../electron'),
  entry: [
    './main.ts', // the entry point of our app
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
    ],
  },
  plugins: [new CheckerPlugin()],
  performance: {
    hints: false,
  },
});
