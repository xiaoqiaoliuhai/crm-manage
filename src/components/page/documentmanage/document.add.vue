<template>
  <div class="layout_inner" v-loading="loading">
    <ever-bread-crumb :showTitle="'文档'"></ever-bread-crumb>
    <ever-form2
      :schema="querySchema"
      v-model="queryObj"
      ref="form"
      class="package-sale"
      :info="true"
      :rules="rules"
      labelWidth="100px"
      label-position="right">
      <template slot="enclosure">
        <div>
          <el-button size="small" type="primary" @click="targetUpload" style="margin-right: 10px;">上传</el-button>
          <div>
            <el-tag
            v-for="tag in queryObj.file"
            :key="tag"
            closable
            :type="tag.type">
            <a href="javascript:void(0)" @click="open">{{tag}}</a>
            </el-tag>
          </div>
        </div>
      </template>
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
      <template slot="default">
        <div></div>
      </template>
    </ever-form2>
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <div style="visibility: hidden;">
      <input id="file1" type="file"  name="file1" multiple="multiple" @change="inputChange">
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    let schema = [
      {
        name: 'enclosure',
        label: '文件',
        comp: 'custom'
      },
      {
        name: 'fileName',
        label: '文件名称'
      },
      {
        name: 'no',
        label: '编号'
      },
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
      }
    ]
    let rules = {
      name: [{ required: true, message: '必填项', trigger: 'blur' }]
    }
    var obj = this.createObjFromSchema(schema)
    obj.file = ''
    return {
      api,
      rules,
      querySchema: schema,
      queryObj: obj,
      deptOptions: [],
      id: '',
      loading: false
    }
  },
  created () {
    this.id = this.$route.query.id || ''
    if (this.id) {
      this.getInfo()
    }
    api.deptList({ pageNum: 1, pageSize: 100 }).then(rs => {
      this.deptOptions = rs.data.list
    })
  },
  methods: {
    getInfo () {
      api.LearningCenterfindById({ id: this.id }).then(rs => {
        this.queryObj.dept = rs.data.dept
        this.queryObj.fileName = rs.data.fileName
        this.queryObj.no = rs.data.no
        this.queryObj.kind = rs.data.kind
        this.queryObj.model = rs.data.model
        this.queryObj.vender = rs.data.vender
        this.queryObj.file = rs.data.file.split(',')
      })
    },
    open () {
      if (this.queryObj.file) {
        window.open(this.queryObj.file)
      }
    },
    targetUpload () {
      document.querySelector('#file1').click()
    },
    inputChange (e) {
      this.loading = true
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      api.uploadfile(formData).then(rs => {
        if (rs.code === 200) {
          this.loading = false
          this.queryObj.file.push(rs.data.file)
          // this.queryObj.fileName = e.target.files[0]['name']
          this.$messageTips(this, 'success', '上传成功')
        } else {
          this.loading = true
          this.$messageTips(this, 'error', '上传失败')
        }
      })
    },
    prev () {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.queryObj))
          delete params.enclosure
          let url = 'LearningCentercreate'
          let tips = '创建'
          params.file = params.file.join(',')
          if (this.id) {
            params.id = this.id
            url = 'LearningCenterupdate'
            tips = '编辑'
          }
          api[url](params).then(rs => {
            if (rs.code === 200) {
              this.$messageTips(this, 'success', tips + '成功')
              this.$router.go(-1)
            } else {
              this.$messageTips(this, 'error', tips + '失败')
            }
          })
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
