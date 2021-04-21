<template>
  <div class="layout_inner">
    <div class="ever-bread-crumb">
      <el-button @click="go" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
      <span>返回</span>
    </div>
    <div class="main-head">
      <ever-form2 :schema="schema1" v-model="obj1" ref="form" class="package-sale only" :info="true" :inline="true">
        <template slot="dept">
          <el-select v-model="obj1.dept" multiple placeholder="请选择科室">
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
            v-model="obj1.assetTypes"
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
        <template>
          <div></div>
        </template>
      </ever-form2>
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :inline="true">
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
        <template slot="type">
          <el-select v-model="queryObj.type" filterable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-button type="primary" @click="query">查看</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" id="excelTable" :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="name" label="设备名称" width="180">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="kind" label="设备类别" width="180">
      </el-table-column>
      <el-table-column prop="vender" label="厂家名称" width="120">
      </el-table-column>
      <el-table-column prop="deptName" label="所属科室" width="130">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
      </el-table-column>
      <el-table-column prop="sn" label="序列号" width="150">
      </el-table-column>
      <el-table-column prop="no" label="资产编号" width="180">
      </el-table-column>
      <el-table-column prop="timeSlot" label="日期" width="220">
        <template slot-scope="scope">
          {{scope.row.beginDate.split(' ')[0] + ' 至 ' + scope.row.endDate.split(' ')[0]}}
        </template>
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
      <el-table-column prop="averagePowerOnTime" align="center" label="平均开机时间" width="120">
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
</template>
<script>
import api from '@/api/api'
import FileSaver from 'file-saver'
import moment from 'moment'
import XLSX from 'xlsx'
let schema1 = [
  {
    label: '科室',
    name: 'dept',
    comp: 'custom'
  },
  {
    name: 'assetTypes',
    label: '设备类别',
    comp: 'custom'
  }
]
let schema = [
  {
    label: '导出分类',
    name: 'type',
    comp: 'custom'
  },
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  }
]
export default {
  data () {
    let obj = this.createObjFromSchema(schema)
    let obj1 = this.createObjFromSchema(schema1)
    obj1.dept = []
    obj1.assetTypes = []
    obj.type = 1
    obj.time = [
      moment(new Date().getTime() - 86400000 * 30).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      obj1,
      schema1,
      loading: false,
      options: [
        { id: 1, name: '按科室' },
        { id: 2, name: '按设备类别' }
      ],
      deptArr: [], // 科室列表
      allDeptIds: [],
      tableData: [],
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
      deptAssetInfo: {},
      deptAssetArr: [],
      areaNameInfo: {},
      assetList: {},
      kindOptions: []
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
        this.time = window.setTimeout(() => {
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
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备.xlsx')
      } catch (e) {
        // empty
      }
      return wbout
    },
    query () {
      this.loading = true
      let params = {
        deptIds: this.obj1.dept.length > 0 ? this.obj1.dept : this.allDeptIds,
        beginDate: moment(this.queryObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.queryObj.time[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.obj1.assetTypes.length > 0) {
        params['assetTypes'] = this.obj1.assetTypes
      }
      api.findAssetByDept(params).then(rs => {
        this.initTableData(rs.data.assets)
      })
    },
    initTableData (data) {
      let obj = {}
      if (this.queryObj.type === 1) {
        data.forEach(item => {
          if (obj[item.deptName]) {
            obj[item.deptName].push(item)
          } else {
            obj[item.deptName] = [item]
          }
        })
      } else {
        data.forEach(item => {
          if (obj[item.kind]) {
            obj[item.kind].push(item)
          } else {
            obj[item.kind] = [item]
          }
        })
      }
      let newData = []
      for (let key in obj) {
        newData = [...newData, ...obj[key]]
      }
      this.tableData = newData
      this.loading = false
    },
    datedifference (sDate1, sDate2) { // sDate1和sDate2是2006-12-18格式
      let dateSpan, iDays
      sDate1 = Date.parse(sDate1)
      sDate2 = Date.parse(sDate2)
      dateSpan = sDate2 - sDate1
      dateSpan = Math.abs(dateSpan)
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
      return iDays + 1
    },
    go () {
      this.$router.go(-1)
    },
    getDept () {
      api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.deptArr = rs.data.list || []
        this.allDeptIds = this.deptArr.map(item => { return item.id })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .scroll {
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .package-sale /deep/ .el-form-item__label {
    width: 80px;
  }
  .ever-bread-crumb {
    margin-bottom: 10px;
    color:#606266;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin-right: 5px;
  }
  .main-head /deep/ .el-date-editor {
    position: relative;
    top: 4px;
    .el-input__icon {
      position: relative;
      top: -3px;
    }
    .el-range-separator {
      position: relative;
      top: -3px;
    }
  }
  .package-sale /deep/ .el-form-item__label {
    width: 80px;
  }
  #excelTable /deep/ .warning-row {
    font-weight: 500;
  }
  #excelTable /deep/ .title-row {
    background: #eee;
  }
  #excelTable /deep/ .crevice {
    background: #f8fafe;
  }
  .package-sale /deep/ .el-button {
    top: 4px;
  }
  .package-sale.only {
    border-bottom: none;
  }
  .package-sale.only /deep/ .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: calc(100% - 100px)
    }
  }
</style>
