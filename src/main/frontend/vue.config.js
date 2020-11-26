module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // prod
    : '/', // dev
    devServer: {
      proxy: 'http://localhost:8087'
      // proxy: 'http://swdelivery.local/modules'             // SHOW!!!
      // https: true
    }
}