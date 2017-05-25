const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssModulesName = '[name]__[local]___[hash:base64:5]';
const context = path.resolve(__dirname, 'src');

module.exports = {
  context,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index'
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[hash].js'
  },
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          plugins: [
            'transform-async-to-generator',
            'transform-decorators-legacy',
            ['react-css-modules', {
              context,
              webpackHotModuleReloading: true,
              generateScopedName: cssModulesName,
              filetypes: {
                '.scss': 'postcss-scss'
              }
            }]
          ]
        }
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
              sourceMap: true,
              sourceMapContents: true,
            }
          }
        ]
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
      'sass-component': path.resolve(__dirname, 'src', 'sass', '_component-base.scss')
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: './index.html' }),
  ]
};
