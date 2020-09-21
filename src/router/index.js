import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [
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
          icon: 's-home'
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

const router = new VueRouter({
  routes
})

export default router
