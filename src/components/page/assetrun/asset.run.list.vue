<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="keys">
            <el-row style="margin-left:20px;">
              <el-col :span="12">
                <el-select v-model="queryObj.keys" @change="onChange" style="width:150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="queryObj.value"></el-input>
              </el-col>
            </el-row>
        </template>
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="seeEcharts">数据概览</el-button>
        </template>
      </ever-form2>
    </div>
    <div class="table-contant">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" border stripe>
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="assetName" align="center" label="设备名称" width="150">
          </el-table-column>
          <el-table-column prop="assetModel" align="center" label="设备型号" width="200">
          </el-table-column>
          <el-table-column prop="assetSn" align="center" label="设备SN序列号" width="200">
          </el-table-column>
          <el-table-column prop="assetNo" align="center" label="设备编号" width="150">
          </el-table-column>
          <el-table-column prop="deptName" label="科室" width="150">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
          </el-table-column>
          <el-table-column prop="networkStatus" align="center" label="网络状态" width="150">
            <template slot-scope="scope">
              <div :class="{red: scope.row.networkStatus === '离线', zx:scope.row.networkStatus !== '离线'}">
                {{scope.row.networkStatus}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="assetStatus" align="center" label="运行状态" width="100">
            <template slot-scope="scope">
              <div :class="{red: scope.row.assetStatus == '50'}">
                {{scope.row.assetStatus | filterAssetStatus}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="routerNo1" label="位置1" width="400">
            <template slot-scope="scope">
              <div v-if="scope.row.networkStatus == '离线'">
                未知
              </div>
              <div v-else>
                <div v-if="scope.row.room1">
                  <span style="color:red;"> ( {{scope.row.room1.area || '未知'}} / {{scope.row.room1.building}} / {{scope.row.room1.roomNo}} )</span>
                </div>
                <div v-else>
                  {{scope.row.routerNo1}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="routerNo2" label="位置2" width="400">
            <template slot-scope="scope">
              <div v-if="scope.row.networkStatus == '离线'">
                未知
              </div>
              <div v-else>
                <div v-if="scope.row.room2">
                  <span style="color:red;"> ( {{scope.row.room2.area}} / {{scope.row.room2.building}} / {{scope.row.room2.roomNo}} )</span>
                </div>
                <div v-else>
                  {{scope.row.routerNo2}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="routerNo3" label="位置3" width="400">
            <template slot-scope="scope">
              <div v-if="scope.row.networkStatus == '离线'">
                未知
              </div>
              <div v-else>
                <div v-if="scope.row.room3">
                  <span style="color:red;"> ( {{scope.row.room3.area}} / {{scope.row.room3.building}} / {{scope.row.room3.roomNo}} )</span>
                </div>
                <div v-else>
                  {{scope.row.routerNo3}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="temperature" align="center" label="温度" width="90">
            <template slot-scope="scope">
              {{scope.row.temperature}}<span style="color:#409EFF;">{{scope.row.temperature&&scope.row.networkStatus == '在线'? ' °C': ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="energy" align="center" label="电能计量" width="120">
            <template slot-scope="scope">
              {{scope.row.energy}}<span style="color:#409EFF;">{{scope.row.energy&&scope.row.networkStatus == '在线'? ' kWh': ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="energy" align="center" label="电能" width="120">
            <template slot-scope="scope">
              {{scope.row.electricType | electricType}}
            </template>
          </el-table-column>
          <el-table-column prop="inputI" align="center" label="输入电流" width="80">
            <template slot-scope="scope">
              <div>
                <div>
                  {{scope.row.inputI}}
                  <span style="color:#409EFF;">{{scope.row.inputI&&scope.row.networkStatus == '在线'? ' A': ''}}</span>
                  <span v-if="scope.row.electricType === '2'">(A)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.inputI2}}
                  <span style="color:#409EFF;">{{scope.row.inputI&&scope.row.networkStatus == '在线'? ' A': ''}}</span>
                  <span>(B)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.inputI3}}
                  <span style="color:#409EFF;">{{scope.row.inputI&&scope.row.networkStatus == '在线'? ' A': ''}}</span>
                  <span>(C)</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="inputV" align="center" label="输入电压" width="80">
            <template slot-scope="scope">
              <div>
                <div>
                  {{scope.row.inputV}}
                  <span style="color:#409EFF;">{{scope.row.inputV&&scope.row.networkStatus == '在线'? ' V': ''}}</span>
                  <span v-if="scope.row.electricType === '2'">(A)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.inputV2}}
                  <span style="color:#409EFF;">{{scope.row.inputV&&scope.row.networkStatus == '在线'? ' V': ''}}</span>
                  <span>(B)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.inputV3}}
                  <span style="color:#409EFF;">{{scope.row.inputV&&scope.row.networkStatus == '在线'? ' V': ''}}</span>
                  <span>(C)</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="powerFactor" align="center" label="功率因数" width="80">
            <template slot-scope="scope">
              <div>
                <div>
                  {{scope.row.powerFactor}}
                  <span v-if="scope.row.electricType === '2'">(A)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.powerFactor2}}
                  <span>(B)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.powerFactor3}}
                  <span>(C)</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="realPower" align="center" label="有功功率" width="100">
            <template slot-scope="scope">
              <div>
                <div>
                  {{scope.row.realPower}}
                  <span style="color:#409EFF;">{{scope.row.realPower&&scope.row.networkStatus == '在线'? ' W': ''}}</span>
                  <span v-if="scope.row.electricType === '2'">(A)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.realPower2}}
                  <span style="color:#409EFF;">{{scope.row.realPower&&scope.row.networkStatus == '在线'? ' W': ''}}</span>
                  <span>(B)</span>
                </div>
                <div v-if="scope.row.electricType === '2'">
                  {{scope.row.realPower3}}
                  <span style="color:#409EFF;">{{scope.row.realPower&&scope.row.networkStatus == '在线'? ' W': ''}}</span>
                  <span>(C)</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="powerHz" align="center" label="电源频率" width="80">
            <template slot-scope="scope">
              {{scope.row.powerHz}}<span style="color:#409EFF;">{{scope.row.powerHz&&scope.row.networkStatus == '在线'? ' Hz': ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mtime" label="更新时间" width="180">
          </el-table-column>
          <el-table-column prop="extra" label="其他扩展信息" width="180">
          </el-table-column>
          <el-table-column prop="name" align="center" label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-search" @click="seeDetails(scope.row)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table id="excelTable" :data="tableData" style="width: 100%" height="100%" border stripe>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="assetName" label="设备名称" width="150">
        </el-table-column>
        <el-table-column prop="assetModel" label="设备型号" width="150">
        </el-table-column>
        <el-table-column prop="assetSn" label="设备SN序列号" width="150">
        </el-table-column>
        <el-table-column prop="assetNo" label="设备编号" width="120">
        </el-table-column>
        <el-table-column prop="deptName" label="科室" width="150">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
        </el-table-column>
        <el-table-column prop="assetStatus" align="center" label="网络状态" width="150">
          <template slot-scope="scope">
            {{scope.row.networkStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="assetStatus" label="运行状态" width="100">
          <template slot-scope="scope">
            {{scope.row.assetStatus | filterAssetStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="routerNo1" label="位置1" width="400">
          <template slot-scope="scope">
            <div v-if="scope.row.networkStatus == '离线'">
              未知
            </div>
            <div v-else>
              <div v-if="scope.row.room1">
                <span style="color:red;"> ( {{scope.row.room1.area || '未知'}} / {{scope.row.room1.building}} / {{scope.row.room1.roomNo}} )</span>
              </div>
              <div v-else>
                {{scope.row.routerNo1}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="routerNo2" label="位置2" width="400">
          <template slot-scope="scope">
            <div v-if="scope.row.networkStatus == '离线'">
              未知
            </div>
            <div v-else>
              <div v-if="scope.row.room2">
                <span style="color:red;"> ( {{scope.row.room2.area}} / {{scope.row.room2.building}} / {{scope.row.room2.roomNo}} )</span>
              </div>
              <div v-else>
                {{scope.row.routerNo2}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="routerNo3" label="位置3" width="400">
          <template slot-scope="scope">
            <div v-if="scope.row.networkStatus == '离线'">
              未知
            </div>
            <div v-else>
              <div v-if="scope.row.room3">
                <span style="color:red;"> ( {{scope.row.room3.area}} / {{scope.row.room3.building}} / {{scope.row.room3.roomNo}} )</span>
              </div>
              <div v-else>
                {{scope.row.routerNo3}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="temperature" label="温度" width="50">
        </el-table-column>
        <el-table-column prop="energy" label="电能计量" width="80">
        </el-table-column>
        <el-table-column prop="inputI" label="输入电流" width="80">
        </el-table-column>
        <el-table-column prop="inputV" label="输入电压" width="80">
        </el-table-column>
        <el-table-column prop="powerFactor" label="功率因数" width="80">
        </el-table-column>
        <el-table-column prop="powerHz" label="电源频率" width="80">
        </el-table-column>
        <el-table-column prop="realPower" label="有功功率" width="80">
        </el-table-column>
        <el-table-column prop="mtime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="userId" label="创建者ID" width="180">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    name: 'assetStatus',
    label: '设备状态',
    comp: 'el-select',
    props: {
      options: [
        {
          id: '10',
          name: '关机'
        },
        {
          id: '20',
          name: '开机'
        },
        {
          id: '30',
          name: '待机'
        },
        {
          id: '50',
          name: '故障'
        }
      ]
    }
  },
  {
    name: 'keys',
    label: '',
    comp: 'custom'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  },
  {
    label: '',
    name: 'rightbtn',
    comp: 'custom'
  }
]
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    obj.value = ''
    obj.keys = 'sn'
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      options: [
        { id: 'sn', name: 'SN序列号' },
        { id: 'macAddress', name: 'MAC地址' },
        { id: 'no', name: '资产编号' }
      ],
      listApiName: 'tempList',
      queryTime: null,
      automaticTime: null,
      banAutomatic: true,
      assetList: {},
      isLen: false
    }
  },
  filters: {
    electricType (val) {
      return val === 2 ? '三相电' : val === 1 ? '单相电' : ''
    }
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备监测.xlsx')
      } catch (e) {
        // empty
      }
      return wbout
    },
    onChange () {
      this.queryObj.value = ''
    },
    query () {
      this.banAutomatic = false
      this.list()
      this.queryTime = window.setTimeout(() => {
        this.banAutomatic = true
        window.clearTimeout(this.queryTime)
        this.queryTime = null
      }, 60000)
    },
    automaticQuery () {
      this.automaticTime = window.setInterval(() => {
        if (this.banAutomatic) {
          this.list()
        }
      }, 60000)
    },
    seeDetails (row) {
      this.$router.push({
        path: 'assetdetail2',
        query: {
          macAddr: row.macAddr,
          assetId: row.assetId
        }
      })
    },
    seeEcharts () {
      this.$router.push('/page/home')
    },
    list () {
      let params = {
        assetStatus: this.queryObj.assetStatus
      }
      if (this.queryObj.keys) {
        params[this.queryObj.keys] = this.queryObj.value
      }
      api.tempList(params).then(rs => {
        if (rs.code === 200) {
          this.tableData = rs.data
        }
      })
    },
    getAssetList (callback) {
      let params = {
        pageNum: 1,
        pageSize: 2000
      }
      api.assetList(params).then(rs => {
        if (rs.code === 200 && rs.data.totalCount > 0) {
          rs.data.list.forEach(item => {
            this.assetList[item.id] = item.deptName
          })
          this.isLen = true
          callback()
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      let height = document.documentElement.clientHeight
      document.querySelector('.table-contant').style.height = height - 220 + 'px'
    })
    window.onresize = () => {
      if (document.querySelector('.table-contant')) {
        let height = document.documentElement.clientHeight
        document.querySelector('.table-contant').style.height = height - 220 + 'px'
      }
    }
    this.automaticQuery()
  },
  beforeDestroy () {
    clearInterval(this.automaticTime)
    this.automaticTime = null
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
  .red {
    color: red;
  }
  .table-contant /deep/ .zx {
    color:#409EFF;
  }
  .lx {
    color: #F56C6C;
  }
</style>
