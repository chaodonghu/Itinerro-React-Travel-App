const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require("path");

console.log(path.join(__dirname, '.', 'react_clientside', 'src', 'index.js'));

module.exports = {
  devtool: 'cheap-eval-source-map',
  context: path.resolve(__dirname, "react_clientside"),
  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    // 'react-hot-loader/patch',
    // './react_clientside/src/index.js'
    path.join(__dirname, '.', 'react_clientside', 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: 'http://localhost:5000/',
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
  plugins: [
    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
     })
  ]
};
