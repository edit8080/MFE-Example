const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { NodeAsyncHttpRuntime } = require('@telenko/node-mf')
const path = require('path')
const packageJson = require('./package.json')

const getConfig = (target) => ({
  entry: './src/index.js',
  target: target === 'web' ? 'web' : false,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist', target),
    publicPath: `http://localhost:3001/${target}/`,
    clean: true,
  },
  devServer: {
    port: '3001',
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'components',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
    ...(target === 'web'
      ? [
          new HtmlWebpackPlugin({
            template: './public/index.html',
          }),
        ]
      : [new NodeAsyncHttpRuntime()]),
  ],
})

module.exports = [getConfig('web'), getConfig('node')]
