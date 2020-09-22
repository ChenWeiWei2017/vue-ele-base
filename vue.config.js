const path = require('path')
function resolve(dir) {
  // __dirname 当前模块目录绝对路径
  return path.join(__dirname, dir)
}

const name = 'Vue后台管理系统'

module.exports = {
  devServer: {
    open: true,
    port: 8080
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        // 配置@指向src目录
        '@': resolve('src')
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // 引入全局的样式变量 旧键名为data，新键名为prependData
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
