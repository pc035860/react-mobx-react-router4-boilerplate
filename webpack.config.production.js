const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const cssModulesName = '[hash:base64:6]';
const context = path.resolve(__dirname, 'src');

module.exports = {
  context,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'mobx',
      'core-js',
    ],
    app: ['babel-polyfill', './index']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[chunkhash].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          plugins: [
            'transform-async-to-generator',
            'transform-decorators-legacy',
            'transform-react-constant-elements',
            [
              'react-css-modules',
              {
                context,
                webpackHotModuleReloading: true,
                generateScopedName: cssModulesName,
                filetypes: {
                  '.scss': 'postcss-scss'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.scss|css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: {
                  sourcemap: false
                },
                importLoaders: 3,
                modules: true,
                localIdentName: cssModulesName
              }
            },
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      _utils: path.join(context, 'utils'),
      _components: path.join(context, 'components'),
      _hocs: path.join(context, 'hocs'),
      _app: context,
      'sass-component': path.resolve(
        __dirname,
        'src',
        'sass',
        '_component-base.scss'
      )
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'assets/[name].[contenthash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html'
    }),
    new PreloadWebpackPlugin()
  ]
};
