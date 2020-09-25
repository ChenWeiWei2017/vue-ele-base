<template>
  <div class="user-manage">
    <div class="manage-head">
      <el-button icon="el-icon-plus" type="primary">新增</el-button>
      <el-input v-model="searchData" class="search-box" placeholder="请输入搜索内容" width="200px">
        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
    </div>
    <div class="manage-body">
      <custom-table
        :table-data="table.data"
        :column="table.column"
        :config="table.config"
        :pagination="table.pagination"
        :actions="table.actions"
        @change-page="changePage"
        @change-size="changeSize"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable'
import { getUserList } from '@/api/user'

export default {
  name: 'User',
  components: {
    CustomTable
  },
  data() {
    return {
      searchData: '',
      table: {
        config: {
          loading: false,
          border: false,
          maxHeight: 1000
        },
        column: [
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'age',
            label: '年龄'
          },
          {
            prop: 'sexLabel',
            label: '性别'
          },
          {
            prop: 'birth',
            label: '出生日期'
          },
          {
            prop: 'addr',
            label: '地址'
          }
        ],
        data: [],
        pagination: {
          currentPage: 1,
          pageSizes: [10, 20, 50],
          pageSize: 10,
          total: 0
        },
        actions: [
          {
            action: 'edit',
            text: '编辑',
            size: 'small'
          },
          {
            action: 'delete',
            text: '删除',
            size: 'small',
            type: 'danger'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    search() {
      console.log('搜索', this.searchData)
    },
    getUserList() {
      this.table.config.loading = true
      getUserList(this.table.pagination.currentPage, this.table.pagination.pageSize).then(res => {
        this.table.pagination.total = res.data.total
        this.table.data = res.data.list.map(item => {
          item.sexLabel = item.sex ? '男' : '女'
          return item
        })
        this.table.config.loading = false
      })
    },
    changePage(page) {
      this.table.pagination.currentPage = page
      this.getUserList()
    },
    changeSize(size) {
      this.table.pagination.currentPage = 1
      this.table.pagination.pageSize = size
      this.getUserList()
    },
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-manage {
    padding: 20px;

    .manage-head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .search-box {
        width: 300px;
      }
    }
  }
</style>
