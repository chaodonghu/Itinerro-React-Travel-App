// webpack.config.prod.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './react_clientside/src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_HOST': 'https://itineroo.herokuapp.com/'
      }
    })
  ],
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
  }
}
