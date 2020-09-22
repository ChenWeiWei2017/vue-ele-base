import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'
import './plugins/bootstrap.js'
import './plugins/element.js'

// 引入全局样式
import '@/assets/scss/index.scss'
import http from '@/api/config'
import './mock'

Vue.config.productionTip = false
// 挂载到Vue上，使其在Vue组件中可以直接使用
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
