// 使用路由守卫，在进到每个路由时，判断是否有权限访问
import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = `Vue后台管理系统 - ${to.meta.title}`

  // determine whether the user has logged in
  // todo 权限校验
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
