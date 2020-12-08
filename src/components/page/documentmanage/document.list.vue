<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="dept">
          <el-select v-model="queryObj.dept" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button @click="query" plain>查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addUsers" v-if="currentUser.icon!=2" plain>新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading.body="loading" :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="fileName" align="center" label="文档名称">
      </el-table-column>
      <el-table-column prop="dept" align="center" label="科室">
      </el-table-column>
      <el-table-column prop="kind" align="center" label="种类">
      </el-table-column>
      <el-table-column prop="model" align="center" label="型号">
      </el-table-column>
      <el-table-column prop="vender" align="center" label="厂家">
      </el-table-column>
      <el-table-column prop="username" align="center" label="下载地址" width="400">
        <template slot-scope="scope">
          <div v-for="(item, index) in (scope.row.file)" :key="index" @click="open(item)">
            <a href="javascript:void(0)">{{item}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="上传时间">
      </el-table-column>
      <el-table-column prop="name" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="emitInfo(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="text" class="delete-btn-color" @click="delInfo(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow:hidden;margin-bottom:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="20"
        :layout="layout"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
let schema = [
  // {
  //   name: 'name',
  //   label: '文档名称'
  // },
  {
    name: 'dept',
    label: '科室',
    comp: 'custom'
  },
  {
    name: 'kind',
    label: '种类'
  },
  {
    name: 'model',
    label: '型号'
  },
  {
    name: 'vender',
    label: '厂家'
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
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    let obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      listApiName: 'LearningCenterList',
      tableData: [],
      deptOptions: []
    }
  },
  created () {
    api.deptList({ pageNum: 1, pageSize: 100 }).then(rs => {
      this.deptOptions = rs.data.list
    })
  },
  methods: {
    open (file) {
      window.open(file)
    },
    addUsers () {
      this.$router.push('/page/documentadd')
    },
    list () {
      let params = {}
      if (this.queryObj.dept) {
        params.dept = this.queryObj.dept
      }
      if (this.queryObj.kind) {
        params.dept = this.queryObj.kind
      }
      if (this.queryObj.model) {
        params.dept = this.queryObj.model
      }
      if (this.queryObj.vender) {
        params.dept = this.queryObj.vender
      }
      api[this.listApiName](params).then(
        rs => {
          if (rs.code === 200) {
            rs.data.list.forEach(item => {
              item.file = item.file.split(',')
            })
            this.tableData = rs.data.list
            this.totalCount = rs.data.totalCount
          }
        }
      )
    },
    emitInfo (row) {
      this.$router.push('/page/documentadd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该文档?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.LearningCenterdelete({ id: row.id })
          if (data && data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.query()
          }
        } catch (err) {
          console.log(err)
        }
      }).then(() => {})
    },
    init () {
      if (Number(this.currentUser.orgId) === 0) {
        this.dialogInfo.superAdmin = true
      } else {
        this.queryInfoObj.orgId = this.currentUser.orgId
        this.dialogInfo.superAdmin = false
      }
    },
    getInfo () {
      api.userList({ id: this.id }).then(rs => {
        this.queryInfoObj = rs.data[0]
      })
    }
  },
  watch: {}
}
</script>
