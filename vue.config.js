module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  publicPath: "./",
  devServer: {
    proxy: {
      "/manage": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/manage": ""
        }
      }
    }
  }
}