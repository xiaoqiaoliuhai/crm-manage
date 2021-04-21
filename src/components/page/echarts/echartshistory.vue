<template>
  <div>
    <div ref="historyEc" class="historyEc" style="height:450px;width:100%;"></div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import moment from 'moment'
import api from '@/api/api'
require('echarts/lib/chart/line')
export default {
  props: {
    obj: {
      type: Object,
      default () {
        return {}
      }
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
      data: [],
      chart: null,
      queryObj: {
        type: 1,
        date: []
      },
      oldStart: '',
      types: [1, 2, 3, 4]
    }
  },
  computed: {
    sanxian () {
      return this.types.includes(this.obj.type) && !this.isDanXiang
    }
  },
  mounted () {
  },
  methods: {
    query () {
      if (this.obj.dataType === 1) return
      this.chart.showLoading({
        text: '正在加载数据'
      })

      let start = new Date(moment(this.obj.date).format('YYYY-MM-DD') + ' ' + '00:00:00').getTime()
      let end = new Date(moment(this.obj.date).format('YYYY-MM-DD') + ' ' + '23:59:59').getTime()
      if (this.start === this.oldStart && this.data.length > 0) {
        this.init()
      } else {
        this.getData(start, end)
      }
    },
    clearInfo () {
      this.x = []
      this.y = []
    },
    getData (start, end) {
      let params = {
        endDate: moment(end).format('YYYY-MM-DD HH:mm:ss'),
        beginDate: moment(start).format('YYYY-MM-DD HH:mm:ss'),
        assetId: this.$route.query.assetId
      }
      this.oldStart = start
      api.queryMonitor(params).then(rs => {
        this.data = rs.data.reverse()
        this.init()
      })
    },
    initData () {
      let xData = []
      let yData = []
      let y2Data = []
      let y3Data = []
      this.data.forEach(item => {
        xData.push(item.ctime)
        if (this.obj.type === 1) {
          yData.push(item.inputI)
          if (!this.isDanXiang) {
            y2Data.push(item.inputI2)
            y3Data.push(item.inputI3)
          }
        } else if (this.obj.type === 2) {
          yData.push(item.inputV)
          if (!this.isDanXiang) {
            y2Data.push(item.inputV2)
            y3Data.push(item.inputV3)
          }
        } else if (this.obj.type === 3) {
          yData.push(item.realPower)
          if (!this.isDanXiang) {
            y2Data.push(item.realPower2)
            y3Data.push(item.realPower3)
          }
        } else if (this.obj.type === 4) {
          yData.push(item.powerFactor)
          if (!this.isDanXiang) {
            y2Data.push(item.powerFactor2)
            y3Data.push(item.powerFactor3)
          }
        } else if (this.obj.type === 5) {
          yData.push(item.temperature)
        } else if (this.obj.type === 6) {
          yData.push(item.powerHz)
        } else if (this.obj.type === 7) {
          yData.push(item.energy)
        }
      })
      return {xData, yData, y2Data, y3Data}
    },
    supplyData (data) {
      let arr = []
      data.forEach((item, index) => {
        if(item && !data[index+1] && index !== data.length) { // 当前有值，下一个没值,并且当前不是数组最后一个值
          arr.push(item)
        } else if (item && !data[index - 1] && index !== 0) { // 当前有值，上一个没值，并且不是第一个值
          arr.push(item)
        } else {
          arr.push('-')
        }
      })
      return arr
    },
    init () {
      let {xData, yData, y2Data, y3Data} = this.initData()
      // let ySupplyData = this.supplyData(yData)
      // let y2SupplyData = this.supplyData(y2Data)
      // let y3SupplyData = this.supplyData(y3Data)
      let series = []
      let legend = []
      if (this.sanxian) {
        series = [
          { type: 'line', data: yData, large: true, name: '(A)' },
          {
            name: '(A)',
            type: 'line',
            connectNulls: true,
            smooth: false,
            itemStyle: { normal: {lineStyle: {width: 1, type: 'dotted'}}},
            data: yData
          },
          { type: 'line', data: y2Data, large: true, name: '(B)' },
          {
            name: '(B)',
            type: 'line',
            connectNulls: true,
            smooth: false,
            itemStyle: { normal: {lineStyle: {width: 1, type: 'dotted'}}},
            data: y2Data
          },
          { type: 'line', data: y3Data, large: true, name: '(C)' },
          {
            name: '(C)',
            type: 'line',
            connectNulls: true,
            smooth: false,
            itemStyle: { normal: {lineStyle: {width: 1, type: 'dotted'}}},
            data: y3Data
          }
        ]
        legend = ['(A)', '(B)', '(C)']
      } else {
        series = [
          { type: 'line', data: yData, large: true }
        ]
      }
      var option = {
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        legend: {
          data: legend
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params, ticket, callback) {  
            let htmlStr = ''; 
            let valMap = {};
            for (let i = 0;i < params.length; i++) {  
              let param = params[i];  
              let xName = param.name; //x轴的名称  
              let seriesName = param.seriesName;//图例名称  
              let value = param.value;//y轴值  
              let color = param.color;//图例颜色   
              //过滤无效值
              if(value == '-'){
                continue
              }
              //过滤重叠值
              if(valMap[seriesName] == value){
                continue
              }
              if(i===0){  
                htmlStr += xName + '<br/>' // x轴的名称  
              }  
              htmlStr +='<div>'
              // 为了保证和原来的效果一样，这里自己实现了一个点的效果  
              htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>'
              //圆点后面显示的文本  
              htmlStr += seriesName + '：' + value
                
              htmlStr += '</div>'
              valMap[seriesName] = value
            }  
            return htmlStr 
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: {
          data: xData,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        series: series
      }
      this.chart.setOption(option, true)
      this.chart.hideLoading()
    }
  },
  watch: {
    'obj.dataType': {
      handler: function (val) {
        if (val === 2) {
          window.setTimeout(() => {
            this.chart = echarts.init(this.$refs.historyEc)
            this.queryObj.type = this.obj.type
            this.getData()
          }, 300)
        } else {
          this.clearInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
  .ui_dialog_02 /deep/ .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
  .package-sale /deep/ .el-date-editor{
    .el-range__icon,.el-range-separator {
      line-height: 25px;
    }
  }
</style>
