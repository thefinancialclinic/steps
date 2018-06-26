require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SimpleProgressPlugin = require('simple-progress-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const SRC = path.resolve(__dirname, 'src');
const BUILD = path.resolve(__dirname, '.build');

const AUTH0_REDIRECT_URL = process.env.AUTH0_REDIRECT_URL;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const BOT_URL = process.env.BOT_URL;

const baseConfig = {
  output: {
    publicPath: '/',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[file].map',
  },
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: ['node_modules', '__tests__'],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: [
          'node_modules',
          '__tests__',
          /\.story\.tsx?$/,
          /\.stories\.tsx?$/,
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 30000,
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|png|jpg|jpeg)?$/,
        loader: ['url-loader?limit=1024'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new webpack.EnvironmentPlugin({
      API_URL: isProduction ? '/api' : 'http://localhost:3001/api',
      AUTH0_REDIRECT_URL: AUTH0_REDIRECT_URL,
      AUTH0_AUDIENCE: AUTH0_AUDIENCE,
      BOT_URL: BOT_URL,
      NODE_ENV: 'development',
      CI: false,
    }),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', SRC],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
};

const devConfig = merge.smart(baseConfig, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/index.tsx',
    ],
  },
  output: {
    path: BUILD,
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    inline: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SimpleProgressPlugin({ format: 'compact' }),
  ],
  watch: true,
});

const productionConfig = merge.smart(baseConfig, {
  entry: {
    app: `${SRC}/index.tsx`,
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: BUILD,
  },
  plugins: [new SimpleProgressPlugin({ format: 'expanded' })],
});

module.exports = isProduction ? productionConfig : devConfig;
