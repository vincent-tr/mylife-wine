const path    = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR   = path.resolve(__dirname, 'public/app');

const config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;