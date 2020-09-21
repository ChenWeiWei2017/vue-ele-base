<template>
  <el-menu
    :default-active="activeMenu"
    :background-color="variable.menuBg"
    :text-color="variable.menuText"
    :active-text-color="variable.menuActiveText"
    :collapse="false"
    :router="true"
  >
    <aside-menu-item v-for="item in menu" :key="item.path" :item="item" :base-path="menu.path" />
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import variable from '@/assets/scss/_variable.scss'
import AsideMenuItem from '@/components/main/AsideMenuItem'

export default {
  name: 'CommonAside',
  components: {
    AsideMenuItem
  },
  computed: {
    ...mapState({
      menu: state => state.permission.routes
    }),
    variable() {
      return variable
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
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
