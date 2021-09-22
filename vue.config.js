module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData:
          `@import "@/scss/_color.scss";
            @import "@/scss/_component.scss";`
      }
    }
  },
  devServer: {
    proxy: "http://localhost:9911/api"


  },
  configureWebpack: {
    devtool: 'source-map'
  }
}