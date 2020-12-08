<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale only" label-position="right" :nosubmit="true" :inline="true">
        <template slot="time">
          <el-date-picker
            v-model="queryObj.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </template>
        <template slot="dept">
          <el-select v-model="queryObj.dept" multiple placeholder="请选择科室">
            <el-option
              v-for="item in deptArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="assetTypes">
          <el-select
            v-model="queryObj.assetTypes"
            filterable
            remote
            multiple
            reserve-keyword
            placeholder="请输入设备类别"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in kindOptions"
              :key="item.id"
              :label="item.secondType"
              :value="item.secondType">
              <span>{{item.mainType}} > {{item.firstType}} > {{item.secondType}}</span>
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button icon="el-icon-search" type="primary" @click="query"></el-button>
          <el-button @click="exportData">导出数据</el-button>
        </template>
      </ever-form2>
    </div>
    <div style="padding-top:10px;">
      <el-row>
        <el-col :span="12" style="padding-left:0;">
          <div class="demo-css">
            <div><h3>设备总保有量</h3></div>
            <div style="color:#409EFF;font-size:50px;text-align:center;height:190px;line-height:150px;">{{totalCount}} 台</div>
            <div style="border-top:2px solid #eee;">
              <el-row>
                <el-col :span="5" style="text-align:left">
                  开机率 <span style="color:#409EFF;">{{(assetInfo.turnOnRate*100).toFixed(2) + ' %'}}</span>
                </el-col>
                <el-col :span="6" style="text-align:right">
                  故障率 <span style="color:#409EFF;">{{(assetInfo.failureRate*100).toFixed(2) + ' %'}}</span>
                </el-col>
                <el-col :span="8" style="text-align:right">
                  平均开机时间 <span style="color:#409EFF;">{{assetInfo.averageActivationTime | initTime}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right:0;">
          <div class="demo-css">
            <div ref="asset" class="asset" style="height:250px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding-left:0;">
          <div class="demo-css">
            <div>
              <el-row>
                <el-col :span="4">
                  <h3>设备详情</h3>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="470">
                <el-table-column type="index" width="50" fixed="left" align="center" label="序号">
                </el-table-column>
                <el-table-column prop="name" width="160" align="center" label="设备名称">
                </el-table-column>
                <el-table-column prop="sn" align="center" label="SN序列号" width="150">
                </el-table-column>
                <el-table-column prop="no" align="center" label="设备编号" width="200">
                </el-table-column>
                <el-table-column prop="kind" align="center" label="设备类别" width="200">
                </el-table-column>
                <el-table-column prop="deptName" align="center" label="科室" width="150">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
                </el-table-column>
                <el-table-column prop="faultRate" align="center" label="故障率" width="100">
                  <template slot-scope="scope">
                    {{(scope.row.faultRate*100).toFixed(2) + ' %'}}
                  </template>
                </el-table-column>
                <el-table-column prop="utilization" align="center" label="满负荷率" width="120">
                  <template slot-scope="scope">
                    {{(scope.row.averageUtilization*100).toFixed(2) + ' %'}}
                  </template>
                </el-table-column>
                <el-table-column prop="treatCount" align="center" label="诊疗次数推断" width="120">
                  <template slot-scope="scope">
                    {{scope.row.treatCount || ''}}
                  </template>
                </el-table-column>
                <el-table-column prop="averageTreatTime" align="center" label="平均诊疗时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.averageTreatTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="boots" align="center" label="总开机次数" width="120">
                  <template slot-scope="scope">
                    {{scope.row.boots}}
                  </template>
                </el-table-column>
                <el-table-column prop="boots" align="center" label="平均开机次数" width="120">
                  <template slot-scope="scope">
                    {{scope.row.averageBoots}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOnTime" align="center" label="总开机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.powerOnTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOnTime" align="center" label="平均开机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.averagePowerOnTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="standbyTime" align="center" label="总待机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.standbyTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="standbyTime" align="center" label="平均待机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.averageStandbyTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOffTime" align="center" label="总关机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.powerOffTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOffTime" align="center" label="平均关机时间" width="120">
                  <template slot-scope="scope">
                    {{scope.row.averagePowerOffTime | initTime}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding:5px 0;">
          <div class="demo-css">
            <el-row>
              <el-col :span="4">
                <h3>设备类别</h3>
              </el-col>
            </el-row>
            <div ref="assetTypeDetails" class="asset" style="height:400px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
      <div class="demo-css">
        <el-row>
          <el-col :span="8">
            <div ref="kaijilv" class="placeEc" style="height:700px;width:100%;"></div>
          </el-col>
          <el-col :span="8">
            <div ref="guzhanglv" class="placeEc" style="height:700px;width:100%;"></div>
          </el-col>
          <el-col :span="8">
            <div ref="manfuhelv" class="placeEc" style="height:700px;width:100%;"></div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24" style="padding:5px 0;">
          <div class="demo-css">
            <el-row>
              <el-col :span="4">
                <h3>设备明细</h3>
              </el-col>
              <el-col :span="20" style="text-align:right;padding-right:10px;">
                <ever-form2 :schema="typeSchema" v-model="typeObj" @query="seeAsssetDetail" ref="form" class="package-sale" label-position="right" :nosubmit="true" :inline="true">
                  <template slot="time">
                    <el-date-picker
                      v-model="typeObj.time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                  </template>
                  <template slot="asset">
                    <el-select v-model="typeObj.asset" filterable placeholder="请选择设备">
                      <el-option
                        v-for="item in tableData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sn }}</span>
                      </el-option>
                    </el-select>
                  </template>
                  <template slot="btn">
                    <el-button icon="el-icon-search" type="primary" @click="seeAsssetDetail"></el-button>
                  </template>
                </ever-form2>
              </el-col>
            </el-row>
            <div ref="assetDetails" class="asset" style="height:400px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import echarts from 'echarts/lib/echarts'
import moment from 'moment'
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
let schema = [
  {
    label: '科室',
    name: 'dept',
    comp: 'custom'
  },
  {
    name: 'assetTypes',
    label: '设备类别',
    comp: 'custom',
    span: 12
  },
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn1',
    comp: 'custom'
  }
]
let typeSchema = [
  {
    label: '设备',
    name: 'asset',
    comp: 'custom'
  },
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn1',
    comp: 'custom'
  }
]
export default {
  data () {
    let obj = this.createObjFromSchema(schema)
    let typeObj = this.createObjFromSchema(typeSchema)
    obj.dept = []
    obj.time = [
      moment(new Date().getTime() - 86400000 * 7).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      typeSchema,
      typeObj,
      listApiName: 'deptList',
      tableData: [],
      loading: false,
      assetChart: null,
      assetDetailsChart: null,
      assetTypeDetailsChart: null,
      assetRankChart: {
        kaiJiLv: null,
        guZhangLv: null,
        manFuheLv: null
      },
      totalCount: 0,
      deptArr: [],
      kindOptions: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      assetInfo: {
        turnOnRate: 0, // 开机率
        failureRate: 0, // 故障率
        totalActivationTime: 0, // 总激活时间
        averageActivationTime: 0 // 平均激活时间
      },
      dataAsset: {},
      timeData: {},
      assetDeptInfo: {},
      isLen: false
    }
  },
  created () {
    this.getDept()
  },
  filters: {
    initTime (value) {
      if (!value) {
        return 0
      }
      return (value / 60).toFixed(2) + ' H'
    }
  },
  methods: {
    remoteMethod (val) {
      if (val !== '') {
        window.clearTimeout(this.time)
        this.loading = true
        this.time = window.setTimeout(_ => {
          let params = {
            pageNum: 1,
            pageSize: 20,
            secondType: val
          }
          api.assetTypeList(params).then(rs => {
            if (rs.code === 200) {
              this.loading = false
              this.kindOptions = rs.data.list
            }
          })
        }, 300)
      } else {
        this.kindOptions = []
      }
    },
    query () {
      let params = {
        assetTypes: this.queryObj.assetTypes,
        deptIds: this.queryObj.dept,
        beginDate: moment(this.queryObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.queryObj.time[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }
      this.getDeptAssetList(params)
    },
    exportData () {
      this.$router.push('/page/exportdata')
    },
    getDept () {
      api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.deptArr = rs.data.list || []
      })
    },
    async getDeptAssetList (params) {
      api.findAssetByDept(params).then(rs => {
        this.tableData = rs.data.assets
        this.totalCount = rs.data.total
        this.assetInfo.turnOnRate = rs.data.averagePowerOnRate
        this.assetInfo.failureRate = rs.data.averageFaultRate
        this.assetInfo.averageActivationTime = rs.data.averagePowerOnTime
        this.initKindChart()
        this.initAssetTypeDetails()
        this.initAssetRank()
      })
    },
    initKindChart (json) {
      this.assetChart = echarts.init(this.$refs.asset)
      let data = []
      let obj = {}
      this.tableData.map(item => {
        if (obj[item.kind]) {
          obj[item.kind] = obj[item.kind] + 1
        } else {
          obj[item.kind] = 1
        }
      })
      for (let key in obj) {
        data.push({ name: key, value: obj[key] })
      }
      let data2 = data.sort((a, b) => { return b.value - a.value })
      let data3 = []
      data2.forEach((item, index) => {
        if (index < 5) {
          data3.push(item)
        } else if (index === 5) {
          data3 = [...data3, ...[item, { name: '其它', value: 0 }]]
        } else {
          data3[6].value += item.value
        }
      })
      let option = {
        title: {
          text: '设备类别概览',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: data3,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.assetChart.setOption(option, true)
    },
    initAssetRank () {
      this.assetRankChart.kaiJiLv = echarts.init(this.$refs.kaijilv)
      this.assetRankChart.guZhangLv = echarts.init(this.$refs.guzhanglv)
      this.assetRankChart.manFuheLv = echarts.init(this.$refs.manfuhelv)
      let dataa = JSON.parse(JSON.stringify(this.tableData))
      let dataaa = dataa.sort((a, b) => { return a.utilization - b.utilization })
      let mfhzdata1 = []
      let mfhzdata2 = []
      dataaa.forEach(item => {
        mfhzdata1.push(`${item.name}（${item.sn || '-'} ${item.no || '-'}`)
        mfhzdata2.push((item.averageUtilization * 100).toFixed(2))
      })
      let datab = JSON.parse(JSON.stringify(this.tableData))
      let databb = datab.sort((a, b) => { return a.powerOnRate - b.powerOnRate })
      let kjldata1 = []
      let kjldata2 = []
      databb.forEach(item => {
        kjldata1.push(`${item.name}（${item.sn || '-'} ${item.no || '-'}`)
        kjldata2.push((item.powerOnRate * 100).toFixed(2))
      })
      let datac = JSON.parse(JSON.stringify(this.tableData))
      let datacc = datac.sort((a, b) => { return a.faultRate - b.faultRate })
      let gzldata1 = []
      let gzldata2 = []
      datacc.forEach(item => {
        gzldata1.push(`${item.name}（${item.sn || '-'} ${item.no || '-'}`)
        gzldata2.push((item.faultRate * 100).toFixed(2))
      })
      let option1 = this.rankingOptions(kjldata1, kjldata2, '开机率排行榜', '开机率', '%')
      let option2 = this.rankingOptions(gzldata1, gzldata2, '故障率排行榜', '故障率', '%')
      let option3 = this.rankingOptions(mfhzdata1, mfhzdata2, '平均满负荷率排行榜', '满负荷率', '%')
      this.assetRankChart.kaiJiLv.setOption(option1, true)
      this.assetRankChart.guZhangLv.setOption(option2, true)
      this.assetRankChart.manFuheLv.setOption(option3, true)
    },
    rankingOptions (data1, data2, title, subtitle, unit) {
      let dataY = data1
      let dataX = data2
      while (dataY.length < 15) {
        dataY.unshift('--')
        dataX.unshift(0)
      }
      let option = {
        color: ['#3398DB'],
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> ' + subtitle + ': {c} ' + unit
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              // color: '#fff',
              fontWeight: '80'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: dataY,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            margin: 10,
            inside: false,
            textStyle: {
              fontWeight: '50'
            },
            formatter: function (name) {
              return (name.length > 4 ? (name.slice(0, 4) + '...') : name)
            }
          }
        },
        series: [{
          type: 'bar',
          label: {
            normal: {
              show: true,
              formatter: function (v) {
                var val = v.data
                if (val === 0) {
                  return ''
                }
                return val
              },
              color: '#fff'
            }
          },
          data: dataX
        }]
      }
      return option
    },
    initAssetTypeDetails () {
      let kindObj = {}
      this.tableData.forEach(item => {
        if (kindObj[item.kind]) {
          kindObj[item.kind]['sun'] += 1
          kindObj[item.kind]['kjl'] += item.averageUtilization
          kindObj[item.kind]['gzl'] += item.faultRate
        } else {
          kindObj[item.kind] = { sun: 1, kjl: item.averageUtilization, gzl: item.faultRate }
        }
      })
      let depts = []
      let data1 = []
      let data2 = []
      for (let key in kindObj) {
        depts.push(key)
        data1.push(((kindObj[key]['kjl'] * 100) / kindObj[key]['sun']).toFixed(2))
        data2.push(((kindObj[key]['gzl'] * 100) / kindObj[key]['sun']).toFixed(2))
      }
      this.assetTypeDetailsChart = echarts.init(this.$refs.assetTypeDetails)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: '0%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          data: ['平均满负荷率', '故障率']
        },
        xAxis: [
          {
            type: 'category',
            data: depts
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '百分比',
            min: 0,
            interval: 50,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '平均满负荷率',
            type: 'bar',
            barMaxWidth: 30,
            data: data1
          },
          {
            name: '故障率',
            type: 'bar',
            barMaxWidth: 30,
            data: data2
          }
        ]
      }
      this.assetTypeDetailsChart.setOption(option, true)
    },
    initAssetDetails (times, data1, data2, data3) {
      // data1 开机时间  data2待机时间  data3关机时间
      this.assetDetailsChart = echarts.init(this.$refs.assetDetails)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: '0%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          data: ['开机时间', '待机时间', '关机时间']
        },
        xAxis: [
          {
            type: 'category',
            data: times
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '时间(小时)',
            min: 0,
            interval: 50,
            axisLabel: {
              formatter: '{value} 小时'
            }
          }
        ],
        series: [
          {
            name: '开机时间',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 30,
            label: {
              show: true,
              position: 'insideRight'
            },
            data: data1
          },
          {
            name: '待机时间',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 30,
            label: {
              show: true,
              position: 'insideRight'
            },
            data: data2
          },
          {
            name: '关机时间',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 30,
            label: {
              show: true,
              position: 'insideRight'
            },
            data: data3
          }
        ]
      }
      this.assetDetailsChart.setOption(option, true)
    },
    seeAsssetDetail (row) {
      let params = {
        assetId: this.typeObj.asset,
        beginDate: moment(this.typeObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00', // 开始时间
        endDate: moment(this.typeObj.time[1]).format('YYYY-MM-DD') + ' 23:59:59' // 结束时间
      }
      api.findTimeByAsset(params).then(rs => [
        this.initAssetTime(rs.data)
      ])
    },
    initAssetTime (data) {
      let times = []
      let data1 = [] // 开机时间
      let data2 = [] // 待机时间
      let data3 = [] // 关机时间
      data.forEach(item => {
        times.push(item.time)
        data1.push((item.powerOnTime / 60).toFixed(2))
        data2.push((item.standbyTime / 60).toFixed(2))
        data3.push((item.powerOffTime / 60).toFixed(2))
      })
      this.initAssetDetails(times, data1, data2, data3)
    }
  },
  watch: {}
}
</script>
<style lang='less' scoped>
  .el-col {
    padding: 5px;
  }
  .demo-css {
    background-color: #FFF;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }
  .el-date-editor{
    height: 30px;
    line-height: 30px;
    & /deep/ .el-input__icon {
      line-height: 20px;
    }
    & /deep/ .el-range-separator {
      line-height: 22px !important;
    }
  }
  .el-button {
    margin-left: 10px;
    padding: 7px 8px;
  }
  .el-input /deep/ input {
    height: 30px !important;
  }
  .package-sale.only /deep/ .el-form-item:first-child {
    width: calc(100%);
    .el-form-item__content {
      width: calc(100% - 50px)
    }
  }
  .package-sale.only /deep/ .el-form-item:nth-child(2) {
    width: calc(100%);
    .el-form-item__content {
      width: calc(100% - 80px)
    }
  }
</style>
