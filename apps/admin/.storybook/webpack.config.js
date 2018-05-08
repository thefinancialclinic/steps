const path = require('path');

module.exports = (a, b, defaultConfig) => {
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  defaultConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      use: ['babel-loader', 'awesome-typescript-loader'],
      exclude: ['node_modules', '__tests__'],
      include: path.resolve(__dirname, '../src/'),
    }
  );

  return defaultConfig;
};
