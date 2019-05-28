var path = require('path')
var webpack = require('webpack')
var NODE_ENV = process.env.NODE_ENV
module.exports = {
  entry: NODE_ENV === 'development' ? './src/main.js' : './src/',
  output: {
    path: path.resolve(__dirname, ''),
    publicPath: '/dist/',
    library: 'vueMobileCarousel',
    filename: 'vue-mobile-carousel.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [ '.js','.vue'],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = 'vue-mobile-carousel.min.js'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ])
}
