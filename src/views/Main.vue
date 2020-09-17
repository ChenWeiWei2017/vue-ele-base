<template>
  <el-container>
    <el-header height="50px">
      <navbar />
    </el-header>

    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-main>
        <app-breadcrumb class="app-breadcrumb" />
        <app-main class="app-main" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import CommonHeader from '@/components/main/CommonHeader'
import CommonAside from '@/components/main/CommonAside'
import Navbar from '@/components/main/Navbar'
import AppBreadcrumb from '@/components/main/AppBreadcrumb'
import AppMain from '@/components/main/AppMain'

export default {
  name: 'Main',
  components: {
    // CommonHeader,
    CommonAside,
    Navbar,
    AppBreadcrumb,
    AppMain
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100%;
  }
  .el-header {
    padding: 0;
  }
  .el-main {
    background-color: #f0f2f5;

    .app-breadcrumb {
      height: 30px;
      line-height: 30px;
      margin-bottom: 15px;
      margin-left: 2px;
    }

    .app-main {
      height: calc(100% - 45px);
    }
  }
</style>
