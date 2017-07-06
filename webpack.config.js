const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    './react_clientside/src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [['es2015', {'modules': false}], 'react', 'stage-0'],
        plugins: [
          'lodash']
      }
    },  {
      test: /\.s?css$/,
      use: [ 'style-loader',
        {
          loader:'css-loader',
          options: {
            sourceMap: 'true',
            importLoaders: 1
          }
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        },
      ]
    }],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './server/',
    host: '0.0.0.0',
    hot: true,
    port: 5000,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
