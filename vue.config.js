const path = require('path')

module.exports = {
  lintOnSave: undefined,

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
}
