const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  outputDir: 'dist',
  configureWebpack: {},

  chainWebpack: (config) => {
    config.resolve.alias.set('~$', resolve('./')).set('@$', resolve('src'))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('autoprefixer')()],
      },
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://rcowdmyzcf.execute-api.ap-southeast-2.amazonaws.com/',
      },
    },
  },

  assetsDir: 'static',
  runtimeCompiler: true,
}
