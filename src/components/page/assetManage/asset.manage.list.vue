<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <div class="table-contant">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" stripe>
        <el-table-column  type="index" width="40" label="">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="设备名称" width="170">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="kind" label="设备类型" width="170">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="no" label="资产编号" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sn" label="SN序列号" width="140">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="electricType" label="电能" width="110">
          <template slot-scope="scope">
            {{scope.row.electricType | electricType}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" label="科室" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="vender" label="厂家">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="responsiblePersonName" width="110" label="责任人">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="purchasePrice" label="采购价格" width="110">
          <template slot-scope="scope">
            {{scope.row.purchasePrice | formatToFinacial}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="depreciationCharge" label="折旧价值" width="110">
          <template slot-scope="scope">
            {{scope.row.depreciationCharge | formatToFinacial}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="setupStartAt" label="装机日期" width="180">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="matainExpiryDate" width="110" label="保修日期">
          <template slot-scope="scope">
            {{scope.row.matainExpiryDate&&scope.row.matainExpiryDate.split(' ')[0]}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="acceptStatus" label="验收状态">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="contractUrlList" label="采购合同照片" width="150">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.contractUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="receiptUrlList" label="票据照片" width="150">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.receiptUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="manualUrlList" label="用户手册照片" width="150">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.manualUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
            <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
            <el-button type="text" class="delete-btn-color"  icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination v-if="pageShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 10px;visibility: hidden;overflow: hidden;">
      <el-table :data="tableData" style="width: 100%" stripe id="excelTable">
        <el-table-column type="index" width="30" label="">
        </el-table-column>
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="sn" label="SN序列号" width="140">
        </el-table-column>
        <el-table-column prop="deptName" label="科室" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
        </el-table-column>
        <el-table-column prop="no" label="资产编号" width="110">
        </el-table-column>
        <el-table-column prop="purchasePrice" label="采购价格">
          <template slot-scope="scope">
            {{scope.row.purchasePrice | formatToFinacial}}
          </template>
        </el-table-column>
        <el-table-column prop="depreciationCharge" label="折旧价值">
          <template slot-scope="scope">
            {{scope.row.depreciationCharge | formatToFinacial}}
          </template>
        </el-table-column>
        <el-table-column prop="responsiblePersonName" label="责任工程师">
        </el-table-column>
        <el-table-column prop="matainExpiryDate" width="110" label="保修截止日期">
          <template slot-scope="scope">
            {{scope.row.matainExpiryDate&&scope.row.matainExpiryDate.split(' ')[0]}}
          </template>
        </el-table-column>
        <el-table-column prop="acceptStatus" label="验收状态">
        </el-table-column>
        <el-table-column prop="alternativeAppendant" label="耗材替代品" width="100">
        </el-table-column>
        <el-table-column prop="appendant" label="配套耗材">
        </el-table-column>
        <el-table-column prop="contact" label="联系方式">
        </el-table-column>
        <!-- <el-table-column prop="dept" label="临床科室">
        </el-table-column> -->
        <el-table-column prop="contractUrlList" label="采购合同照片" width="110">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.contractUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="receiptUrlList" label="票据照片" width="100">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.receiptUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="manualUrlList" label="用户手册照片" width="110">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.manualUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="isDedicatedAppendant" label="配套耗材是否专机专用" width="160">
          <template slot-scope="scope">
            {{scope.row.isDedicatedAppendant | getAppendant}}
          </template>
        </el-table-column>
        <el-table-column prop="kind" label="设备类别">
        </el-table-column>
        <el-table-column prop="model" label="设备型号">
        </el-table-column>
        <el-table-column prop="prodDate" label="生产日期" width="180">
        </el-table-column>
        <el-table-column prop="setupStartAt" label="装机开始时间" width="180">
        </el-table-column>
        <el-table-column prop="setupEndAt" label="装机结束时间" width="180">
        </el-table-column>
        <el-table-column prop="setupStepName" label="设备装机状态" width="180">
        </el-table-column>
        <el-table-column prop="sn" label="SN序列号" width="150">
        </el-table-column>
        <el-table-column prop="vender" label="厂家">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="mtime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="extra" label="其他拓展信息" width="150">
        </el-table-column>
        <el-table-column prop="orgName" label="机构" width="180">
        </el-table-column>
        <el-table-column prop="userId" label="创建者ID" width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="'设备详情'" v-if="popShow" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'contractUrlList' || item.id == 'receiptUrlList' || item.id == 'manualUrlList'?24:6">
            <div v-if="item.id == 'contractUrlList' || item.id == 'receiptUrlList' || item.id == 'manualUrlList'">
               <label>{{item.label}}</label>: <span><fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow></span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>: <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else-if="item.id == 'purchasePrice' || item.id == 'depreciationCharge'">
              <label>{{item.label}}</label>: <span>{{item.value | formatToFinacial}}</span>
            </div>
            <div v-else>
              <label>{{item.label}}</label>: <span>{{item.value}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="log-btn-container">
        <el-button @click="popShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
import list from '@/plugins/list'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    label: '设备名称',
    name: 'name'
  },
  {
    label: '资产编号',
    name: 'no'
  },
  {
    label: '设备型号',
    name: 'model'
  },
  {
    label: 'SN序列号',
    name: 'sn'
  },
  {
    label: '厂家',
    name: 'vender'
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
let arr = [
  {
    id: 'name',
    label: '设备名称',
    value: ''
  },
  {
    id: 'iotDeviceIds',
    label: '物联设备',
    value: ''
  },
  {
    id: 'no',
    label: '资产编号',
    value: ''
  },
  {
    id: 'acceptStatus',
    label: '验收状态',
    value: ''
  },
  {
    id: 'electricType',
    label: '电能',
    value: ''
  },
  {
    id: 'brand',
    label: '品牌',
    value: ''
  },
  {
    id: 'spec',
    label: '规格型号',
    value: ''
  },
  {
    id: 'purchasePrice',
    label: '采购价格',
    value: ''
  },
  {
    id: 'depreciationCharge',
    label: '折旧价值',
    value: ''
  },
  {
    id: 'responsiblePersonName',
    label: '责任工程师',
    value: ''
  },
  {
    id: 'matainExpiryDate',
    label: '保修截止日期',
    value: ''
  },
  {
    id: 'kind',
    label: '设备类别',
    value: ''
  },
  {
    id: 'model',
    label: '设备型号',
    value: ''
  },
  {
    id: 'setupStep',
    label: '设备装机状态',
    value: ''
  },
  {
    id: 'alternativeAppendant',
    label: '耗材替代品',
    value: ''
  },
  {
    id: 'appendant',
    label: '配套耗材',
    value: ''
  },
  {
    id: 'contact',
    label: '联系方式',
    value: ''
  },
  {
    id: 'dept',
    label: '临床科室',
    value: ''
  },
  {
    id: 'isDedicatedAppendant',
    label: '配套耗材是否专机专用',
    value: ''
  },
  {
    id: 'prodDate',
    label: '生产日期',
    value: ''
  },
  {
    id: 'setupStartAt',
    label: '装机开始时间',
    value: ''
  },
  {
    id: 'setupEndAt',
    label: '装机结束时间',
    value: ''
  },
  {
    id: 'sn',
    label: 'SN序列号',
    value: ''
  },
  {
    id: 'vender',
    label: '厂家',
    value: ''
  },
  {
    id: 'extra',
    label: '其他扩展信息',
    value: ''
  },
  {
    id: 'ctime',
    label: '创建时间',
    value: ''
  },
  {
    id: 'mtime',
    label: '更新时间',
    value: ''
  },
  {
    id: 'manualUrlList',
    label: '用户手册照片',
    value: ''
  },
  {
    id: 'receiptUrlList',
    label: '票据照片',
    value: ''
  },
  {
    id: 'contractUrlList',
    label: '采购合同照片',
    value: ''
  }
]
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      arr,
      tableData: [],
      listApiName: 'assetList',
      popShow: false
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
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备.xlsx')
      } catch (e){
        // empty
      }
      return wbout
    },
    seeDetail (row) {
      arr.forEach(item => {
        item.value = row[item.id] || ''
      })
      this.popShow = true
    },
    addAsset () {
      this.$router.push('/page/assetmanageadd')
    },
    emitInfo (row) {
      // this.$router.push('/page/assetmanageadd?id=' + row.id)
      this.$router.push({
        path: '/page/assetmanageadd',
        query: {
          id: row.id,
          offset: this.offset
        }
      })
    },
    async delInfo (row) {
      this.$confirm('确定要删除该设备信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.deleteAsset({ id: row.id })
          if (data && data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.query()
          }
        } catch (err) {
          // empty
        }
      })
    },
    initAssetType (data) {
      let obj = []
      data.forEach(item => {
        let info = obj.find(lab => lab.id === item.firstType)
        if (info) {
          let secondInfo = info.children.find(lab => lab.id === item.secondType)
          if (secondInfo && secondInfo.children) {
            secondInfo.children.push(item)
          } else {
            let description = {
              id: secondInfo.secondType,
              name: secondInfo.secondType,
              children: [item]
            }
            info.children.push(description)
          }
        } else {
          let firstInfo = {
            id: item.firstType,
            name: item.firstType,
            children: [
              {
                id: item.secondType,
                name: item.secondType,
                chidren: [item]
              }
            ]
          }
          obj.push(firstInfo)
        }
      })
      return obj
    }
  },
  watch: {
    'popShow': {
      handler: function (val) {
        if (!val) {
          this.arr.forEach(item => {
            item.value = ''
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.$nextTick(() => {
      let height = document.documentElement.clientHeight
      document.querySelector('.table-contant').style.height = height - 300 + 'px'
    })
    window.onresize = () => {
      if (document.querySelector('.table-contant')) {
        let height = document.documentElement.clientHeight
        document.querySelector('.table-contant').style.height = height - 300 + 'px'
      }
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
.main-head .package-sale /deep/ .el-form-item:last-child {
  position: relative;
  display: block;
  text-align: right;
}
</style>
