const path = require('path');
const SRC = path.resolve(__dirname, '..', 'src');

module.exports = (a, b, defaultConfig) => {
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  defaultConfig.resolve.modules.push(SRC);

  defaultConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      use: ['babel-loader', 'awesome-typescript-loader'],
      exclude: ['node_modules', '__tests__'],
      include: SRC,
    }
  );

  return defaultConfig;
};
