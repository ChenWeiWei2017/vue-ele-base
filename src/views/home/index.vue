<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8" class="left-panel">
      <el-card shadow="hover" class="info-card">
        <div class="user-info">
          <b-avatar src="https://chenww-1259746772.cos.ap-shanghai.myqcloud.com/cmt/avatar/2-1564643605309.jpg" size="150" />
          <div class="info">
            <p class="name">William</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <el-divider />
        <div class="login-info">
          <p>上次登录时间：<span>2020-09-20</span></p>
          <p>上次登录地点：<span>无锡</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="table-card">
        <el-table
          :data="courseSaleInfo"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="课程"
            show-overflow-tooltip
          />
          <el-table-column
            prop="todaySaleroom"
            label="今日销售额"
            show-overflow-tooltip
          />
          <el-table-column
            prop="monthSaleroom"
            label="本月销售额"
            show-overflow-tooltip
          />
          <el-table-column
            prop="totalSaleroom"
            label="总销售额"
            show-overflow-tooltip
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" class="right-panel">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in orderInfo"
          :key="index"
          :span="8"
        >
          <el-card shadow="hover" class="order-card">
            <div class="icon" :style="{color: item.icon.color, backgroundColor: item.icon.bgColor}">
              <b-icon :icon="item.icon.class" />
            </div>
            <div class="order-info">
              <p class="data">{{ item.data }}</p>
              <p class="text">{{ item.text }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card shadow="hover" class="big-chart-card">
        <e-chart :chart-data="echartData.order" />
      </el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="sm-chart-card">
            <e-chart :chart-data="echartData.user" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="sm-chart-card">
            <e-chart :is-axis-chart="false" :chart-data="echartData.video" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeData } from '@/api/home'
import EChart from '@/components/ECharts'

export default {
  name: 'Home',
  components: {
    EChart
  },
  data() {
    return {
      orderInfo: [
        {
          icon: {
            class: 'cart3',
            color: '#fff',
            bgColor: '#17a2b8'
          },
          data: '56',
          text: '今日支付订单'
        },
        {
          icon: {
            class: 'star-fill',
            color: '#fff',
            bgColor: '#f3815a'
          },
          data: '108',
          text: '今日收藏数量'
        },
        {
          icon: {
            class: 'bag',
            color: '#fff',
            bgColor: '#409eff'
          },
          data: '25',
          text: '今日未支付订单'
        },
        {
          icon: {
            class: 'journal-check',
            color: '#fff',
            bgColor: '#67c23a'
          },
          data: '512',
          text: '本月支付订单'
        },
        {
          icon: {
            class: 'bookmark-star',
            color: '#fff',
            bgColor: '#f56c6c'
          },
          data: '1096',
          text: '本月收藏数量'
        },
        {
          icon: {
            class: 'trophy',
            color: '#fff',
            bgColor: '#ffc107'
          },
          data: '￥59816.00',
          text: '本月交易额'
        }
      ],
      courseSaleInfo: [],
      echartData: {
        order: {
          title: {
            text: '周订单详情'
          },
          xData: [],
          series: []
        },
        user: {
          title: {
            text: '用户活跃度统计'
          },
          xData: [],
          series: []
        },
        video: {
          title: {
            text: '视频销售量'
          },
          series: []
        }
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getHomeData().then(res => {
        this.courseSaleInfo = res.data.courseSaleInfo
        this.initOrderChart(res.data.orderChart)
        this.initUserChart(res.data.userChart)
        this.initVideoChart(res.data.videoChart)
      })
    },
    initOrderChart(orderChart) {
      this.echartData.order.xData = orderChart.date
      if (orderChart.data && orderChart.data.length) {
        const keys = Object.keys(orderChart.data[0])
        keys.forEach(key => {
          this.echartData.order.series.push({
            name: key,
            type: 'line',
            data: orderChart.data.map(item => item[key])
          })
        })
      }
    },
    initUserChart(userChart) {
      this.echartData.user.xData = userChart.date
      if (userChart.data && userChart.data.length) {
        const keys = Object.keys(userChart.data[0])
        keys.forEach(key => {
          this.echartData.user.series.push({
            name: key,
            type: 'bar',
            data: userChart.data.map(item => item[key])
          })
        })
      }
    },
    initVideoChart(videoChart) {
      this.echartData.video.series.push({
        name: '课程',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: videoChart.data
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/home';
</style>
