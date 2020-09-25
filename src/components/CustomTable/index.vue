<template>
  <el-card v-loading="config.loading" shadow="hover" class="custom-table" :body-style="{ padding: '0px' }">
    <el-table :data="tableData" :border="config.border" stripe :max-height="config.maxHeight">
      <el-table-column
        type="index"
        width="70"
      />
      <el-table-column
        v-for="item in column"
        :key="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="actions && actions.length" label="操作">
        <template v-slot="scope">
          <el-button v-for="item in actions" :key="item.action" :size="item.size" :type="item.type" @click="handleAction(item.action, scope.row)">
            {{ item.text }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    column: {
      type: Array,
      default() {
        return []
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSizes: [10, 20, 50],
          pageSize: 10,
          total: 0
        }
      }
    },
    config: {
      type: Object,
      default() {
        return {
          loading: false,
          border: false
        }
      }
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('change-size', size)
    },
    handleCurrentChange(page) {
      this.$emit('change-page', page)
    },
    handleAction(action, row) {
      this.$emit(action, row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-table {
    .el-table {
      width: 100%;
    }

    .el-pagination {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 30px;
    }
  }
</style>
