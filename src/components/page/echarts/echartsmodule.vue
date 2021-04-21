<template>
  <div ref="echarts" style="height:450px;width:100%;margin-top:20px;"></div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/line')
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    eData: {
      type: Object,
      default () {
        return { x: 0, y: 0 }
      }
    },
    time: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    isDanXiang: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      x: [],
      y: [],
      y2: [],
      y3: [],
      chart: null,
      option: [],
      types: [1, 2, 3, 4]
    }
  },
  methods: {
    init () {
      let self = this
      let series = []
      let legend = []
      if (this.sanxian) {
        series = [
          {
            name: '(A)',
            data: this.y,
            type: 'line'
          },
          {
            name: '(B)',
            data: this.y2,
            type: 'line'
          },
          {
            name: '(C)',
            data: this.y3,
            type: 'line'
          }
        ]
        legend = ['(A)', '(B)', '(C)']
      } else {
        series = [
          {
            name: '',
            data: this.y,
            type: 'line'
          }
        ]
      }
      this.chart = echarts.init(this.$refs.echarts)
      this.option = {
        title: {
          text: this.title
        },
        legend: {
          data: legend
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.x
        },
        yAxis: {
          name: '单位：' + this.unit,
          nameTextStyle: {
            align: 'left'
          },
          type: 'value'
        },
        series: series
      }
      this.chart.setOption(this.option)
    },
    handleData (val) {
      if (this.x.length > 7) {
        this.x.shift()
        this.y.shift()
        if (this.sanxian) {
          this.y2.shift()
          this.y3.shift()
        }
      }
      this.x.push(this.eData.x)
      this.y.push(this.eData.y)
      if (this.sanxian) {
          this.y2.push(this.eData.y2)
          this.y3.push(this.eData.y3)
        }
      if (this.chart && this.chart.setOption) {
        this.chart.setOption(this.option, true)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  computed: {
    sanxian () {
      return this.types.includes(this.type) && !this.isDanXiang
    }
  },
  watch: {
    'eData.x': {
      handler: function (val) {
        if (val) {
          this.handleData()
        }
      },
      immediate: true
    },
    'title': {
      handler: function (val) {
        if (val) {
          this.x = []
          this.y = []
          this.y2 = []
          this.y2 = []
          window.setTimeout(() => {
            this.init()
            this.handleData()
          }, 300)
        }
      },
      immediate: true
    }
  }

}
</script>
