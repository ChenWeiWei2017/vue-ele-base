import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

/*
  路由的配置项
  // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  hidden: true // (默认 false)

  //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
  redirect: 'noRedirect'

  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow: true

  name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
    title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 's-home' // 设置该路由的图标，支持 el-icon-x element-ui 的 icon
    noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true // 若果设置为true，它则会固定在tags-view中(默认 false)

    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu: '/article/list'
  }
 */

// 静态路由，即固定可访问的路由，如登录页、404页等公用页面
export const constantRoutes = [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          icon: 's-home',
          affix: true
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: {
          title: '用户管理',
          icon: 'user-solid'
        }
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: {
          title: '视频管理',
          icon: 'video-camera-solid'
        }
      }
    ]
  },
  {
    path: '/show',
    component: Main,
    redirect: '/show/page1',
    meta: {
      title: '页面演示',
      icon: 's-marketing'
    },
    children: [
      {
        path: 'page1',
        name: 'ShowPage1',
        component: () => import('@/views/show/Page1'),
        meta: {
          title: '页面一'
        }
      },
      {
        path: 'page2',
        name: 'ShowPage2',
        component: () => import('@/views/show/Page2'),
        meta: {
          title: '页面二'
        }
      },
      {
        path: 'page3',
        name: 'ShowPage3',
        component: () => import('@/views/show/Page3'),
        meta: {
          title: '页面三'
        }
      }
    ]
  }
]

// 动态路由，这些路由需要根据用户的权限信息进行加载
export const asyncRoutes = []

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  // 先将固定可访问的路由加载上，动态的路由等在获取到权限信息后再追加
  routes: constantRoutes
})

const router = createRouter()

// 在更改权限后，重置路由信息，如登出，赋权后重载
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
