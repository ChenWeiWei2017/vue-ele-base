<template>
  <el-menu
    :default-active="current.path"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409eff"
    :collapse="false"
  >
    <template v-for="(item, index) in menu">
      <el-menu-item v-if="!item.children" :key="item.path" :index="item.path" @click="selectMenu(item)">
        <i :class="`el-icon-${item.icon}`" />
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-else :key="index" :index="`${index}`">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`" />
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="(subitem) in item.children" :key="subitem.path" :index="subitem.path" @click="selectMenu(subitem)">
          {{ subitem.label }}
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'CommonAside',
  data() {
    return {
      // 默认最多只有二级子菜单
      menu: [
        {
          path: '/',
          label: '首页',
          name: 'home',
          icon: 's-home'
        },
        {
          path: '/user',
          label: '用户管理',
          name: 'user',
          icon: 'user-solid'
        },
        {
          path: '/video',
          label: '视频管理',
          name: 'video',
          icon: 'video-camera-solid'
        },
        {
          label: '菜单演示',
          icon: 'data-analysis',
          name: 'show',
          children: [
            {
              path: '/show/page1',
              name: 'show-page1',
              label: '页面一'
            },
            {
              path: '/show/page2',
              name: 'show-page2',
              label: '页面二'
            },
            {
              path: '/show/page3',
              name: 'show-page3',
              label: '页面三'
            }
          ]
        }
      ],
      current: {}
    }
  },
  created() {
    if (this.menu && this.menu.length) {
      this.current = this.getFirstRouteMenu(this.menu[0])
      this.$store.dispatch('tab/selectMenu', this.current)
    }
  },
  methods: {
    selectMenu(item) {
      if (item !== this.current) {
        this.current = item
        this.$store.dispatch('tab/selectMenu', item)
      }
    },
    getFirstRouteMenu(menu) {
      if (!menu.children || !menu.children.length) {
        return menu
      } else {
        return this.getFirstRouteMenu(menu.children[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100%;
    width: 210px;
  }
</style>
