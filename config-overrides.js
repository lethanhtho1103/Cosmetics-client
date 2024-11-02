const { override, useBabelRc, overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.setupMiddlewares = (middlewares, devServer) => {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }
    return middlewares;
  };
  return config;
};

module.exports = {
  webpack: override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
  ),
  devServer: overrideDevServer(devServerConfig()),
};
