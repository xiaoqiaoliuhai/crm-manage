<template>
    <div class="layout_inner">
      <ever-bread-crumb :showTitle="'物联设备'"></ever-bread-crumb>
      <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="130px" label-position="right" :rules="rules">
          <template slot="urlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="roomIds">
            <!-- :disabled="roomDisabled" -->
            <el-select v-model="queryObj.roomIds" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="extra">
            <el-button size="small" type="primary" @click="popShow=true">设置</el-button>
          </template>
          <template slot="default">
            <div></div>
          </template>
        </ever-form2>
      </div>
      <div class="log-btn-container" style="margin-bottom:60px;padding-left:130px;">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
      <el-dialog :title="'阈值设置'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="60%" :close-on-click-modal="false" :append-to-body="true">
        <div>
          <ever-form2 :schema="schema1" v-model="obj1" ref="form" class="package-sale" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
            <template slot="btn">
              <el-button @click="importData" type="primary" size="mini">导入模版</el-button>
            </template>
            <template slot="macid">
              <el-select v-model="obj1.macid" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.macAddr"
                  :value="item.id">
                  <span>{{item.macAddr + ' ' + item.model}}</span>
                </el-option>
              </el-select>
            </template>
          </ever-form2>
          <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column prop="name" align="center" label="参数类型"></el-table-column>
            <el-table-column prop="lower" align="center" label="下限">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lower"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="upper" align="center" label="上限">
              <template slot-scope="scope">
                <el-input v-model="scope.row.upper"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="单位">
            </el-table-column>
          </el-table>
          <el-table :data="tableData1" style="width: 100%" border stripe>
            <el-table-column prop="name" align="center" label="参数类型"></el-table-column>
            <el-table-column prop="min" align="center" label="最短时间">
              <template slot-scope="scope">
                <el-input v-model="scope.row.min"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="probably" align="center" label="最可能时间">
              <template slot-scope="scope">
                <el-input v-model="scope.row.probably"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="max" align="center" label="最长时间">
              <template slot-scope="scope">
                <el-input v-model="scope.row.max"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="单位">
            </el-table-column>
          </el-table>
        </div>
        <div class="pop-btn" style="margin-top:20px;">
          <el-button type="primary" @click="popShow=false">确认</el-button>
          <el-button @click="empty">重置</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
let schema = [
  {
    name: 'macAddr',
    label: 'MAC地址'
  },
  {
    name: 'model',
    label: '设备型号'
  },
  {
    name: 'kind',
    label: '物联设备类别',
    comp: 'el-select',
    props: {
      options: [
        {
          id: 'co',
          name: '协调器'
        },
        {
          id: 'gw',
          name: '网关'
        },
        {
          id: 'sensor',
          name: '监测终端'
        },
        {
          id: 'qr',
          name: '二维码'
        },
        {
          id: '4g',
          name: '4G模块'
        }
      ]
    }
  },
  {
    name: 'roomIds',
    label: '物联网络',
    comp: 'custom'
  },
  {
    name: 'extra',
    label: '阈值',
    comp: 'custom'
  },
  {
    name: 'urlList',
    label: '设备资料',
    comp: 'custom'
  }
]
let schema1 = [
  {
    name: 'macid',
    label: '阈值模版',
    comp: 'custom'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  }
]
export default {
  mixins: [token],
  data () {
    var obj = this.createObjFromSchema(schema)
    let obj1 = this.createObjFromSchema(schema1)
    return {
      querySchema: schema,
      queryObj: obj,
      obj1,
      schema1,
      detailId: '',
      iotDeviceIdsOptions: [],
      // 保存图片地址
      imgObj: {
        reportImg: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: []
      },
      rules: {
        macAddr: [
          {
            required: true,
            message: '必填项',
            trigger: ['blur']
          }
        ]
      },
      options: [],
      options1: [],
      popShow: false,
      roomDisabled: false,
      typeRelation: [
        {name: '关机电流下限', key: 'guanJiDianLiuXia', index: 0, val: 'lower'},
        {name: '关机电流上限', key: 'guanJiDianLiuShang', index: 0, val: 'upper'},
        {name: '关机功率下限', key: 'guanJiGongLvXia', index: 1, val: 'lower'},
        {name: '关机功率上限', key: 'guanJiGongLvShang', index: 1, val: 'upper'},
        {name: '待机电流下限', key: 'daiJiDianLiuXia', index: 2, val: 'lower'},
        {name: '待机电流上限', key: 'daiJiDianLiuShang', index: 2, val: 'upper'},
        {name: '待机功率下限', key: 'daiJiGongLvXia', index: 3, val: 'lower'},
        {name: '待机功率上限', key: 'daiJiGongLvShang', index: 3, val: 'upper'},
        {name: '运行电流下限', key: 'yunXingDianLiuXia', index: 4, val: 'lower'},
        {name: '运行电流上限', key: 'yunXingDianLiuShang', index: 4, val: 'upper'},
        {name: '运行功率下限', key: 'yunXingGongLvXia', index: 5, val: 'lower'},
        {name: '运行功率上限', key: 'yunXingGongLvShang', index: 5, val: 'upper'},
        {name: '正常电压下限', key: 'dianYaXia', index: 6, val: 'lower'},
        {name: '正常电压上限', key: 'dianYaShang', index: 6, val: 'upper'},
      ],
      tableData: [
        { name: '关机电流', lower: '', upper: '', company: 'A' },
        { name: '关机功率', lower: '', upper: '', company: 'W' },
        { name: '待机电流', lower: '', upper: '', company: 'A' },
        { name: '待机功率', lower: '', upper: '', company: 'W' },
        { name: '运行电流', lower: '', upper: '', company: 'A' },
        { name: '运行功率', lower: '', upper: '', company: 'W' },
        { name: '正常电压', lower: '', upper: '', company: 'V' }
      ],
      typeRelation2: [
        {name: '单次诊疗按开机最短时间', key: 'danZhenLiaoKaiJiDuan', index: 0, val: 'min'},
        {name: '单次诊疗按开机最可能时间', key: 'danZhenLiaoKaiJiKeNeng', index: 0, val: 'probably'},
        {name: '单次诊疗按开机最长时间', key: 'danZhenLiaoKaiJiChang', index: 0, val: 'max'},
        {name: '单次诊疗按运行最短时间', key: 'danZhenLiaoYunXingDuan', index: 1, val: 'min'},
        {name: '单次诊疗按运行最可能时间', key: 'danZhenLiaoYunXingKeNeng', index: 1, val: 'probably'},
        {name: '单次诊疗按运行最长时间', key: 'danZhenLiaoYunXingChang', index: 1, val: 'max'}
      ],
      tableData1: [
        { name: '单次诊疗(按开机时间)', min: '', probably: '', max: '', company: 'min' },
        { name: '单次诊疗(按运行时间)', min: '', probably: '', max: '', company: 'min' }
      ]
    }
  },
  methods: {
    query () {},
    importData () {
      if (!this.obj1.macid) return
      let info = this.options1.find(item => item.id === this.obj1.macid)
      this.initTypeVal(info)
    },
    empty () {
      this.tableData.forEach(item => {
        item.lower = ''
        item.upper = ''
      })
    },
    handleClose () {
      this.$router.go(-1)
    },
    // 删除数组里面删除的图片地址
    handleReportRemove (file, fileList) {
      this.imgObj.reportImg = this.sliceArr(this.imgObj.reportImg, file, 'key')
    },
    // 保存上传的图片地址
    handleReportContractSuccess (response, file, fileList) {
      this.imgObj.reportImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      })
    },
    beforeUploadGetKey (file) {
      // 每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID()
      this.uploadData.token = this.uploadToken
    },
    checkThreshold () {
      if (this.queryObj.kind === 'gw') return false
      let emptyVal = false
      this.tableData.forEach(item => {
        for (let key in item) {
          if (!item[key] && item[key] !== 0) {
            emptyVal = true
          }
        }
      })
      return emptyVal
    },
    prev (id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = 'createIotDevice'
          if (this.detailId) {
            url = 'updateIotDevice'
          }
          let tips = this.detailId ? '更新' : '创建'
          let params = Object.assign({}, this.queryObj)
          params.urlList =
            this.imgObj.reportImg.length > 0
              ? JSON.stringify(this.imgObj.reportImg)
              : ''
          params.extra = JSON.stringify(this.tableData)
          params.roomIds = params.roomIds ? [params.roomIds] : []
          this.initTypeData(params)
          api[url](params).then(rs => {
            this.popShow = false
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
    emitInfo (row) {
      this.detailId = row.id
      Object.assign(this.queryObj, row)
      this.queryObj.roomIds = this.queryObj.roomIds[0] || ''
      this.filelistObj.reportList =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || []
      this.imgObj.reportImg =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || []
      this.initTypeVal(row)
    },
    initTypeData (params) {
      this.typeRelation.forEach(item => {
        params[item.key] = this.tableData[item.index][item.val]
      })
      this.typeRelation2.forEach(item => {
        params[item.key] = this.tableData1[item.index][item.val]
      })
    },
    initTypeVal (json) {
      this.typeRelation.forEach(item => {
        this.tableData[item.index][item.val] = json[item.key]
      })
      this.typeRelation2.forEach(item => {
        this.tableData1[item.index][item.val] = json[item.key]
      })
    },
    clearInfo () {
      Object.keys(this.queryObj).map(key => {
        if (key === 'iotDeviceIds') {
          this.queryObj[key] = []
        } else {
          this.queryObj[key] = ''
        }
      })
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = []
      })
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = []
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.findById({ id: this.detailId }).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
    api.roomList({ pageNum: 1, pageSize: 1000 }).then(rs => {
      if (rs.code === 200) {
        let data = []
        rs.data.list.forEach(item => {
          let obj = {}
          obj.name = `${item.buildingName} > ${item.roomNo}`
          obj.id = item.id
          data.push(obj)
        })
        this.options = data
      }
    })
    api.iotDeviceList({ pageNum: 1, pageSize: 1000 }).then(rs => {
      if (rs.code === 200) {
        this.options1 = rs.data.list
      }
    })
  },
  watch: {
    'popShow': {
      handler (value) {
        if (!value) {
          this.obj1.macid = ''
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .pop-btn {
    .el-button--primary {
      color: #fff;
      background-color: #1c7bef;
      border-color: #1c7bef;
    }
    .el-button {
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
    }
  }
  .detail-log /deep/ .el-table.el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #ffffff;
  }
</style>
