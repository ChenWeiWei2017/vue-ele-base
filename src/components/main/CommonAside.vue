<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/logo.png" :style="{width: collapse ? '0' : '186px', height: '50px'}" alt="">
      <img src="@/assets/logos.png" alt="" :style="{width: collapse ? '40px' : '0', height: '40px'}">
    </div>
    <div class="sidemenu">
      <el-menu
        :default-active="activeMenu"
        :background-color="variable.menuBg"
        :text-color="variable.menuText"
        :active-text-color="variable.menuActiveText"
        :collapse="collapse"
        :router="true"
        class="app-menu"
      >
        <aside-menu-item v-for="item in menu" :key="item.path" :item="item" :base-path="menu.path" />
      </el-menu>
    </div>
  </div>

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
      menu: state => state.permission.routes,
      collapse: state => state.app.collapse
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

<style lang="scss">
  .sidebar {
    height: 100%;
  }

  .logo {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // height: 50px;
      transition: all .3s;
      -webkit-transition: all .3s;
    }
  }

  .sidemenu {
    height: calc(100% - 50px);
  }

  .el-menu {
    overflow: scroll;
    height: 100%;
    border-right: 0 !important;
  }

  .app-menu:not(.el-menu--collapse) {
    width: 210px;
  }

  .el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }

  .el-menu--collapse .el-menu-item .el-submenu__icon-arrow, .el-menu--collapse .el-submenu>.el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }

  .el-menu-item .b-icon, .el-submenu .b-icon {
    vertical-align: middle !important;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 16px;
  }
</style>
