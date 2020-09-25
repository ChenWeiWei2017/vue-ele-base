<template>
  <el-container class="main">
    <el-aside ref="appAside" width="auto">
      <common-aside />
    </el-aside>

    <el-container class="main-body">
      <el-header height="90px">
        <navbar />
      </el-header>
      <el-main>
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

export default {
  name: 'Main',
  components: {
    // CommonHeader,
    CommonAside,
    Navbar,
    AppMain
  },
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('permission/generateRoutes')
  }
}
</script>

<style lang="scss" scoped>
  .el-container.main {
    height: 100%;
  }
  .el-header {
    padding: 0;
    border-bottom: 1px solid #f6f6f6;
    z-index: 999;
  }

  .el-main {
    background-color: #f0f2f5;
    padding: 0;
    overflow-x: hidden;
  }
</style>
