<template>
  <el-breadcrumb separator="/">
    <template v-if="current != null">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="current.path">{{ current.label }}</el-breadcrumb-item>
    </template>
    <el-breadcrumb-item v-else>首页</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBreadcrumb',
  data: function() {
    return {
    }
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
