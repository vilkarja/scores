const SERVER_ADDRESS = process.env.SERVER_ADDRESS || 'http://localhost:3000';

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api": {
        target: SERVER_ADDRESS,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
