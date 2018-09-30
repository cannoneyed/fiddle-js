// electron development config
const { resolve } = require('path');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = merge({
  target: 'electron-main',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['electron'],
  },
  context: resolve(__dirname, '../../electron'),
  entry: [
    './main.ts', // the entry point of our app
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  performance: {
    hints: false,
  },
});
