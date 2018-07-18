require('dotenv').config({ path: '../../.env' });

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SimpleProgressPlugin = require('simple-progress-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const SRC = path.resolve(__dirname, 'src');
const BUILD = path.resolve(__dirname, '.build');

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(bmp|gif|png|jpg|jpeg)?$/,
        loader: ['url-loader?limit=1024'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.flow$/,
        loader: 'ignore-loader',
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
      AUTH0_ENABLED: 'true',
      AUTH0_REDIRECT_URL: 'http://localhost:3000/authenticate',
      AUTH0_MAGIC_LINK_REDIRECT_URL: 'http://localhost:3000/magic-link',
      AUTH0_AUDIENCE: 'http://steps-admin.herokuapp.com',
      AUTH0_DOMAIN: 'steps.auth0.com',
      AUTH0_CLIENT_ID: 'R4uBotWz7sHgmvfmlsBI3othCDEpo4Ga',
      BOT_URL: 'https://mockbin.org/request',
      NODE_ENV: 'development',
      SENTRY_FRONTEND_DSN: '',
      GA_PROPERTY_ID: '',
      KEEN_PROJECT_ID: '',
      KEEN_WRITE_KEY: '',
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
      'babel-polyfill',
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
    new SimpleProgressPlugin({ format: 'expanded' }),
  ],
  watch: true,
});

const productionConfig = merge.smart(baseConfig, {
  entry: {
    app: ['babel-polyfill', `${SRC}/index.tsx`],
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: BUILD,
  },
  plugins: [new SimpleProgressPlugin({ format: 'expanded' })],
});

module.exports = isProduction ? productionConfig : devConfig;
