<template>
  <div v-if="!item.hidden">
    <el-menu-item v-if="!item.children" :key="item.path" :index="resolvePath(item.path)">
      <i v-if="item.meta && item.meta.icon" :class="`el-icon-${item.meta.icon}`" />
      <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
    <template v-else-if="item.children && !item.meta">
      <aside-menu-item v-for="subitem in item.children" :key="subitem.path" :item="subitem" :base-path="resolvePath(item.path)" />
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="`el-icon-${item.meta.icon}`" />
        <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
      </template>
      <aside-menu-item v-for="subitem in item.children" :key="subitem.path" :item="subitem" :base-path="resolvePath(item.path)" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'AsideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
