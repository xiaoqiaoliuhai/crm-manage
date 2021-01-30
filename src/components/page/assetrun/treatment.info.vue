<template>
  <div>
    <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
      <template slot="type">
        <el-select v-model="queryObj.type" @change="typeChange" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template slot="date">
        <div style="display: inline-block;width:150px;">
          <el-date-picker
            v-model="queryObj.date.beginDate"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
        </div>
        -
        <div style="display: inline-block;width:150px;">
          <el-date-picker
            v-model="queryObj.date.endDate"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </div>
      </template>
      <template slot="btn">
        <el-button @click="query">查看</el-button>
      </template>
    </ever-form2>
    <div ref="historyEc" class="historyEc" style="height:450px;width:100%;"></div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import api from '@/api/api'
import moment from 'moment'
require('echarts/lib/chart/line')
export default {
  data () {
    let schema = [
      {
        label: '',
        name: 'type',
        comp: 'custom'
      },
      {
        name: 'date',
        label: '',
        comp: 'custom'
      },
      {
        name: 'btn',
        label: '',
        comp: 'custom'
      }
    ]
    var obj = this.createObjFromSchema(schema)
    obj.type = 1
    obj.date = {
      beginDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    }
    return {
      queryObj: obj,
      querySchema: schema,
      options: [
        {id: 1, name: '诊疗次数推断'},
        {id: 2, name: '平均诊疗时间'}
      ],
      chart: null,
      unit: ''
    }
  },
  methods: {
    typeChange () {
      this.query()
    },
    query () {
      if (new Date(this.queryObj.date.beginDate) > new Date(this.queryObj.date.endDate)) {
        this.$messageTips(this, 'error', '开始时间不能大于结束时间')
        return
      }
      let params = {
        assetId: this.$route.query.assetId,
        beginDate: moment(this.queryObj.date.beginDate).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.queryObj.date.endDate).format('YYYY-MM-DD') + ' 23:59:59'
      }
      api.queryTreatCountAndAverageTime(params).then(rs => {
        this.initData(rs.data)
      })
    },
    initData (data) {
      let x = []
      let y = []
      this.unit = this.queryObj.type === 1 ? '次' : '分钟'
      data.forEach(item => {
        x.push(item.dataTime)
        if (this.queryObj.type === 1) { 
          y.push(item.treatCount)
        } else {
          let time = (item.averageTreatTime / (60*1000)).toFixed(2)
          y.push(time)
        }
      })
      this.initOption(x, y)
    },
    initOption (x, y) {
      let self = this
      this.option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0]['data'] + ' ' + self.unit
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: x
        },
        yAxis: {
          name: '单位：' + this.unit,
          nameTextStyle: {
            align: 'left'
          },
          type: 'value'
        },
        series: [{
          data: y,
          type: 'line'
        }]
      }
      this.chart.setOption(this.option)
    }
  },
  created () {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.historyEc)
      this.query()
    })
  }
}
</script>
<style lang="less" scoped>
  .el-button {
    padding: 8px 10px;
  }
</style>