<template>
  <div>
    <div class="my-navbar">
      <hamburger id="hamburger-container" :is-active="!collapse" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

      <div class="right-menu">
        <nav-search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
          <div class="avatar-wrapper">
            <img src="https://chenww-1259746772.cos.ap-shanghai.myqcloud.com/cmt/avatar/2-1564643605309.jpg" class="user-avatar">
            <span class="name">William</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-tools">设置中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <tags-view class="app-tags" />
  </div>

</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import NavSearch from '@/components/NavSearch'
import TagsView from '@/components/main/TagsView'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    NavSearch,
    Screenfull,
    Breadcrumb,
    TagsView
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-navbar {
  height: 50px;
  border-bottom: 1px solid #f6f6f6;
  background: #fff;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        font-size: 14px;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          margin-right: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          // position: absolute;
          // right: -20px;
          // top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}

.app-tags {
  height: 40px;
  line-height: 40px;
  padding: 0 80px 0 40px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
}
</style>
