<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query" plain>查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="logInfo.visibile = true" plain>新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading.body="loading" :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="mainType" align="center" label="一级产品类别">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="firstType" align="center" label="二级产品类别">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="secondType" align="center" label="三级产品类别">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="description" align="center" label="产品描述">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="expect" align="center" label="预期用途">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="example" align="center" label="品名举例">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="manageCategory" align="center" label="管理类别">
      </el-table-column>
      <el-table-column prop="name" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="emitInfo(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="text" class="delete-btn-color" @click="delInfo(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-bottom:10px;">
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
    <el-dialog title="设备类别" :visible.sync="logInfo.visibile" class="dialog">
      <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
        <template slot="mainType">
          <el-select v-model="infoQueryObj.mainType" placeholder="请选择" @change="mainTypeChange" clearable>
            <el-option v-for="item in mainTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
        <template slot="firstType">
          <el-select v-model="infoQueryObj.firstType" placeholder="请选择" clearable>
            <el-option v-for="item in firstTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>
      <div slot="footer" style="text-align: left; padding-left:50px;">
        <el-button type="primary" @click="handleSure">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
let schema = [
  {
    name: 'mainType',
    label: '一级类别'
  },
  {
    name: 'firstType',
    label: '二级类别'
  },
  {
    name: 'secondType',
    label: '三级类别'
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
let infoQuerySchema = [
  {
    name: 'mainType',
    label: '一级类别',
    comp: 'custom'
  },
  {
    name: 'firstType',
    label: '二级类别',
    comp: 'custom'
  },
  {
    name: 'secondType',
    label: '三级类别'
  },
  {
    name: 'description',
    label: '产品描述',
    comp: 'textarea'
  },
  {
    name: 'expect',
    label: '预期用途',
    comp: 'textarea'
  },
  {
    name: 'example',
    label: '品名举例',
    comp: 'textarea'
  },
  {
    name: 'manageCategory',
    label: '管理类别',
    comp: 'select',
    props: {
      options: [
        { id: 'Ⅰ', name: 'Ⅰ' },
        { id: 'Ⅱ', name: 'Ⅱ' },
        { id: 'Ⅲ', name: 'Ⅲ' }
      ]
    }
  }
]
let rules = {
  mainType: [{ required: true, message: '必填项', trigger: 'blur' }],
  firstType: [{ required: true, message: '必填项', trigger: 'blur' }],
  secondType: [{ required: true, message: '必填项', trigger: 'blur' }]
}
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
    let infoQueryObj = this.createObjFromSchema(infoQuerySchema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      infoQuerySchema,
      infoQueryObj,
      rules,
      listApiName: 'assetTypeList',
      tableData: [],
      logInfo: {
        id: '',
        visibile: false
      },
      mainTypeOptions: [
        { id: 1, name: 'aaa' },
        { id: 2, name: 'bbb' },
        { id: 3, name: 'ccc' }
      ],
      firstTypeOptions: [
        { id: 1, name: 'aaa' },
        { id: 2, name: 'bbb' },
        { id: 3, name: 'ccc' }
      ],
      loading: false
    }
  },
  created () {},
  methods: {
    mainTypeChange () {
      this.infoQueryObj.firstType = ''
    },
    handleSure () {

    },
    handleCancel () {
      this.logInfo.visibile = false
    },
    list () {
      let params = {
        pageNum: this.offset,
        pageSize: this.pagesize
      }
      if (this.queryObj.mainType) {
        params.mainType = this.queryObj.mainType
      }
      if (this.queryObj.firstType) {
        params.firstType = this.queryObj.firstType
      }
      if (this.queryObj.secondType) {
        params.secondType = this.queryObj.secondType
      }
      this.loading = true
      api.assetTypeList(params).then(rs => {
        this.loading = false
        if (rs.code === 200) {
          this.tableData = rs.data.list
          this.totalCount = rs.data.totalCount
        }
      })
    },
    emitInfo (row) {
      this.infoQueryObj.mainType = row.mainType
      this.infoQueryObj.firstType = row.firstType
      this.infoQueryObj.secondType = row.secondType
      this.infoQueryObj.description = row.description
      this.infoQueryObj.expect = row.expect
      this.infoQueryObj.example = row.example
      this.infoQueryObj.manageCategory = row.manageCategory
      this.logInfo.id = row.id
      this.logInfo.visibile = true
    },
    delInfo (row) {
      this.$confirm('确定要删除该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.userDel({ id: row.id })
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
  watch: {
    'logInfo.visibile': {
      handler: function (val, oldval) {
        if (!val) {
          this.infoQueryObj.mainType = ''
          this.infoQueryObj.firstType = ''
          this.infoQueryObj.secondType = ''
          this.infoQueryObj.description = ''
          this.infoQueryObj.expect = ''
          this.infoQueryObj.example = ''
          this.infoQueryObj.manageCategory = ''
          this.logInfo.id = ''
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
 <style lang="less" scoped>
  .dialog /deep/ .el-button {
    position: relative;
    top: 1px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
  }
 </style>
