const path = require('path');

module.exports = (a, b, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.story\.tsx?$/,
    loader: require.resolve('awesome-typescript-loader'),
    include: path.resolve(__dirname, "../src/")
  });

  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig;
};
