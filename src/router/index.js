import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Home',
    meta: {
      title: '首页',
      icon: 's-home'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
