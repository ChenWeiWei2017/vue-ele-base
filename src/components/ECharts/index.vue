<template>
  <div ref="echart" style="height: 100%" />
</template>

<script>
import echarts from 'echarts'

const themeColor = [
  '#2ec7c9',
  '#b6a2de',
  '#5ab1ef',
  '#ffb980',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#588dd5',
  '#f5994e',
  '#c05050',
  '#59678c',
  '#c9ab00',
  '#7eb00a',
  '#6f5553',
  '#c14089'
]

export default {
  name: 'ECharts',
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          title: {},
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      echart: null,
      axisOption: {
        title: {},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            // 图例⽂字的样式
            color: '#333'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3' // x轴颜⾊
            }
          },
          // 字体倾斜
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          },
          axisLine: {
            lineStyle: {
              color: '#17b3a3' // 坐标轴颜⾊
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eee'],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [],
        color: themeColor
      },
      normalOption: {
        title: {},
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20
        },
        series: [],
        color: themeColor
      }
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse() {
      return this.$store.state.app.collapse
    }
  },
  watch: {
    chartData: {
      handler() {
        this.initChart()
      },
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initChart() {
      this.initChartData()
      if (!this.echart) {
        this.echart = echarts.init(this.$refs.echart)
      }
      this.echart.setOption(this.options)
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.title = this.chartData.title
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
        this.axisOption.legend.data = this.chartData.series.map(item => item.name)
      } else {
        this.normalOption.title = this.chartData.title
        this.normalOption.series = this.chartData.series
        this.normalOption.legend.data = this.chartData.series[0].data.map(item => item.name)
      }
    },
    resizeChart() {
      if (this.echart) {
        this.echart.resize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
