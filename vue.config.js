module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData:
          `@import "@/scss/_color.scss";
            @import "@/scss/_component.scss";
            @import "@/scss/_text.scss";
            @import "@/scss/_utility.scss";
            
            `
      }
    }
  },
  devServer: {
    proxy: "http://localhost:9933/api"


  },
  configureWebpack: {
    devtool: 'source-map'
  }
}