<template>
  <div class="layout_inner"  :key="'qa'">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="actionUserId">
          <el-select v-model="queryObj.actionUserId" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="assetName" label="设备名称" fixed>
      </el-table-column>
      <el-table-column prop="actionUserId" label="实际质控人" width="120">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="areaName" label="院区" width="110">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="orgName" label="医院名称" width="110">
      </el-table-column>
      <el-table-column prop="sn" label="SN序列号" width="150">
      </el-table-column>
      <el-table-column prop="no" label="设备编号">
      </el-table-column>
      <el-table-column prop="vender" label="生产厂家">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="vender" label="服务提供方" width="150">
      </el-table-column>
      <el-table-column prop="progress" label="质控进度">
        <template slot-scope="scope">
          {{scope.row.progress | mainStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="planDate" label="质控计划时间" width="180">
      </el-table-column>
      <el-table-column prop="extra" label="实际费用" width="120">
        <template slot-scope="scope">
          {{scope.row.extra | formatToFinacial}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="testContent" label="质控内容" width="180">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tesResults" label="质控结果" width="180">
      </el-table-column>
      <el-table-column prop="reportUrlList" label="质控报告" width="150">
        <template slot-scope="scope">
          <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.reportUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
          <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button type="text" class="delete-btn-color"  icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <table id="excelTable">
        <tr>
          <td :colspan="10">西南医科大型附属中医医院质量控制检测记录表</td>
        </tr>
        <tr>
          <td>序号</td>
          <td>设备名称</td>
          <td>资产编码</td>
          <td>使用部门</td>
          <td>规格型号</td>
          <td>出厂编码</td>
          <td>检测内容</td>
          <td>检测结论</td>
          <td>检测时间</td>
          <td>检测人</td>
        </tr>
        <tr v-for="(item ,index) in tableData" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.assetName}}</td>
          <td>{{item.no}}</td>
          <td>{{item.deptName}}</td>
          <td>{{item.spec}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.testContent}}</td>
          <td>{{item.tesResults}}</td>
          <td>{{item.actionDate}}</td>
          <td>{{item.actionUserId}}</td>
        </tr>
      </table>
    </div>
    <el-dialog :title="'质控详情'" v-if="popShow" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'reportUrlList'?24:6">
            <div v-if="item.id == 'reportUrlList'">
               <label>{{item.label}}</label>: <span><fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow></span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>: <span>{{item.value | getAppendant}}</span>
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
import list from '@/plugins/list'
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    name: 'assetId',
    label: '设备名称',
    comp: 'assets-select'
  },
  {
    name: 'actionUserId',
    label: '实际质控人',
    comp: 'custom'
  },
  {
    label: '服务提供方',
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
    id: 'assetName',
    label: '设备名称',
    value: ''
  },
  {
    id: 'deptName',
    label: '科室',
    value: ''
  },
  {
    id: 'actionUserId',
    label: '实际质控人',
    value: ''
  },
  {
    id: 'vender',
    label: '服务提供方',
    value: ''
  },
  {
    id: 'actionDate',
    label: '质控实际发生时间',
    value: ''
  },
  {
    id: 'planDate',
    label: '质控计划时间',
    value: ''
  },
  {
    id: 'mtime',
    label: '更新时间',
    value: ''
  },
  {
    id: 'ctime',
    label: '创建时间',
    value: ''
  },
  {
    id: 'contact',
    label: '联系方式',
    value: ''
  },
  {
    id: 'testContent',
    label: '质控内容',
    value: ''
  },
  {
    id: 'tesResults',
    label: '质控结果',
    value: ''
  },
  {
    id: 'reportUrlList',
    label: '质控报告',
    value: ''
  },
  {
    id: 'extra',
    label: '其他扩展信息',
    value: ''
  }
]
export default {
  mixins: [list, token],
  data () {
    var obj = this.createObjFromSchema(schema)
    obj.kind = 'qa'
    return {
      api,
      arr,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      options: [],
      listApiName: 'mainList',
      popShow: false
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
  methods: {
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '西南医科大型附属中医医院质量控制检测记录表.xlsx')
      } catch (e) {
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
      this.$router.push('/page/maintenanceQaAdd')
    },
    emitInfo (row) {
      this.$router.push('/page/maintenanceQaAdd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该质控记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.deleteMain({ id: row.id })
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
    }
  },
  created () {
    api.userList({ id: '', name: '' }).then(rs => {
      if (rs.code === 200 && rs.data.length > 0) {
        this.options = rs.data
      }
    })
  }
}
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
