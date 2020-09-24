<template>
  <el-container class="main">
    <el-header height="50px">
      <navbar />
    </el-header>

    <el-container class="main-body">
      <el-aside ref="appAside" width="auto">
        <common-aside />
      </el-aside>
      <el-main>
        <tags-view class="app-tags" />
        <app-main ref="appMain" class="app-main" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import CommonHeader from '@/components/main/CommonHeader'
import CommonAside from '@/components/main/CommonAside'
import Navbar from '@/components/main/Navbar'
import AppMain from '@/components/main/AppMain'
import TagsView from '@/components/main/TagsView'

export default {
  name: 'Main',
  components: {
    // CommonHeader,
    CommonAside,
    Navbar,
    AppMain,
    TagsView
  },
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('permission/generateRoutes')
  },
  mounted() {
    this.$refs.appAside.$el.style.height = document.body.clientHeight - 50 + 'px'
    this.$refs.appMain.$el.style.height = document.body.clientHeight - 91 + 'px'
  }
}
</script>

<style lang="scss" scoped>
  .el-container.main {
    height: 100%;
  }
  .el-header {
    padding: 0;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    border-bottom: 1px solid #f6f6f6;
  }

  .main-body {
    margin-top: 50px;
  }

  .el-main {
    background-color: #f0f2f5;
    padding: 0;
    overflow-x: hidden;

    .app-tags {
      height: 40px;
      line-height: 40px;
      padding: 0 80px 0 40px;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
      // position: fixed;
      // top: 50px;
      // right: 0;
      // z-index: 999;
    }

    .app-main {
      // height: calc(100% - 40px);
      margin-top: 1px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
