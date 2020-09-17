<template>
  <b-navbar class="my-navbar" toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#"><img src="http://govt.cndy.org/newsroom/theme/default/img/logo.png" alt=""></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <b-nav-item href="#1">Link 1</b-nav-item>
        <b-nav-item href="#2">Link 2</b-nav-item>
        <b-nav-item class="avatar" right>
          <el-dropdown>
            <span class="el-dropdown-link">
              <b-avatar rounded="lg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg" />
              <!-- <b-icon icon="caret-down-fill" style="color: #fff" /> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-tools">设置中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'CommonHeader'
}
</script>

<style lang="scss" scoped>
  .my-navbar {
    height: 100%;
    background-image: linear-gradient(to bottom,#f9f9f9 0,#f9f9f9 100%);
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 5px #ccc;
    border-bottom: 0px solid #e0e0e0;
    padding-left: 0;
    padding-right: 0;

    .avatar {
      .nav-link {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
</style>
