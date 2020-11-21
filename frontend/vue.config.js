const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@store': path.resolve(__dirname, 'src/store'),
      },
    },
  },
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
};
