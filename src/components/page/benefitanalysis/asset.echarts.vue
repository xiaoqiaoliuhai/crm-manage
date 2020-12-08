<template>
  <div>
    <div ref="incomeEcharts" style="height:500px;width:100%;">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/pie')
export default {
  props: {
    eData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      incomeEcharts: null
    }
  },
  methods: {
    initIncomeEcharts () { // 收入图表
      this.incomeEcharts = echarts.init(this.$refs.incomeEcharts)
      var xData = this.eData.assetNames
      let yData = []
      for (let key in this.eData.yData) {
        let info = {
          name: key,
          type: 'bar',
          barMaxWidth: 30,
          large: true,
          data: this.eData.yData[key]
        }
        yData.push(info)
      }
      let option = {
        title: {
          text: '设备收入'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: this.eData.legend,
          itemGap: 6
        },
        grid: {
          top: '12%',
          left: '5%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLabel: {
              formatter: function (name) {
                return name.split('（')[0]
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位（元）'
          }
        ],
        series: yData
      }
      this.incomeEcharts.setOption(option)
    }
  },
  watch: {
    'eData': {
      handler (val) {
        if (JSON.stringify(val) !== '{}') {
          this.initIncomeEcharts()
        }
      },
      immediate: true
    }
  }
}
</script>
