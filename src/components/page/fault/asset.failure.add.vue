<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'设备故障'"></ever-bread-crumb>
    <fieldset>
      <legend>故障信息</legend>
      <ever-form2 :schema="infoQuerySchema2" v-model="infoQueryObj2" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
        <template slot="faultUrlList">
          <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.faultList:[]" :on-remove="handleFaultRemove" :on-success="handleFaultSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="dept">
          <el-select v-model="infoQueryObj2.dept" filterable placeholder="请选择">
            <el-option
              v-for="item in deptArr"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>
    </fieldset>
    <fieldset style="margin-top:50px;">
      <legend>维修信息</legend>
      <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
        <template slot="receiptUrlList">
          <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.receiptList:[]" :on-remove="handleReceiptRemove" :on-success="handleReceiptSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="contractUrlList">
          <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.contractList:[]" :on-remove="handleContractRemove" :on-success="handleContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="repairType2">
          <!-- 院内自修 -->
          <div style="margin-top: 30px;">
            <el-checkbox v-model="infoQueryObj.repairSelf" :true-label="1" :false-label="0">院内自修</el-checkbox>
            <fieldset style="margin:0 0 0 20px;">
              <div>
                <label class="contract-label">故障原因：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.faultReason"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">处理措施：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.measureSelf"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">更换配件情况：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.changePartsSelf"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">产生维修费用：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.costSelf">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">处理结果：</label>
                <div class="contract-div w400">
                  <el-radio v-model="infoQueryObj.resultSelf" :label="1">完全修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultSelf" :label="2">未修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultSelf" :label="3">无法修复建议报废</el-radio>
                </div>
              </div>
            </fieldset>
          </div>
          <!-- 院外工程师来院 -->
          <div>
            <el-checkbox v-model="infoQueryObj.repairOthers" :true-label="1" :false-label="0">院外工程师来院维修</el-checkbox>
            <fieldset style="margin:0 0 0 20px;">
              <div>
                <label class="contract-label">处理措施：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.measureOthers"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">更换配件情况：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.changePartsOthers"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">产生维修费用：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.costOthers">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">处理结果：</label>
                <div class="contract-div w400">
                  <el-radio v-model="infoQueryObj.resultOthers" :label="1">完全修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultOthers" :label="2">未修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultOthers" :label="3">无法修复建议报废</el-radio>
                </div>
              </div>
              <div>
                <label class="contract-label">工程师姓名：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.engineerOthers"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">工程师联系方式：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.engineerOthersPhone"></el-input>
                </div>
              </div>
            </fieldset>
          </div>
          <!-- 返厂维修 -->
          <div>
            <el-checkbox v-model="infoQueryObj.repairFactory" :true-label="1" :false-label="0">返厂维修</el-checkbox>
            <fieldset style="margin:0 0 0 20px;">
              <div>
                <label class="contract-label">处理措施：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.measureFactory"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">更换配件情况：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.changePartsFactory"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">产生维修费用：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.costFactory">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">处理结果：</label>
                <div class="contract-div w400">
                  <el-radio v-model="infoQueryObj.resultFactory" :label="1">完全修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultFactory" :label="2">未修复</el-radio>
                  <el-radio v-model="infoQueryObj.resultFactory" :label="3">无法修复建议报废</el-radio>
                </div>
              </div>
              <div>
                <label class="contract-label">厂家名称：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.factory"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">厂家联系方式：</label>
                <div class="contract-div">
                  <el-input v-model="infoQueryObj.factoryPhone"></el-input>
                </div>
              </div>
            </fieldset>
          </div>
        </template>
        <template slot="offerPrice">
          <fieldset style="margin: 0;">
            <legend>维修之前</legend>
            <div>
              <label class="contract-label">维修班长：</label>
              <div class="contract-div">
                <el-input v-model="infoQueryObj.repairLeader"></el-input>
              </div>
            </div>
            <div>
              <label class="contract-label">设备保障部负责人：</label>
              <div class="contract-div">
                <el-input v-model="infoQueryObj.personInCharge"></el-input>
              </div>
            </div>
          </fieldset>
          <fieldset style="margin: 0;">
            <legend>维修之后</legend>
            <div>
              <label class="contract-label">本次维修满意度：</label>
              <div class="contract-div w400">
                <el-radio v-model="infoQueryObj.satisfaction" :label="1">优</el-radio>
                <el-radio v-model="infoQueryObj.satisfaction" :label="2">良</el-radio>
                <el-radio v-model="infoQueryObj.satisfaction" :label="3">中</el-radio>
                <el-radio v-model="infoQueryObj.satisfaction" :label="4">差</el-radio>
                <el-radio v-model="infoQueryObj.satisfaction" :label="5">不合格</el-radio>
              </div>
            </div>
            <div>
              <label class="contract-label">使用科室负责人：</label>
              <div class="contract-div">
                <el-input v-model="infoQueryObj.departmentLeader"></el-input>
              </div>
            </div>
            <div>
              <label class="contract-label">维修人员：</label>
              <div class="contract-div">
                <el-input v-model="infoQueryObj.repairPerson"></el-input>
              </div>
            </div>
          </fieldset>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>
    </fieldset>
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">保存</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>
<script>
import token from '@/plugins/getUploadToken'
import api from '@/api/api'
let options = [
  {
    id: 'unknown',
    name: '未知'
  },
  {
    id: 'reported',
    name: '已上报'
  },
  {
    id: 'todo',
    name: '待维修'
  },
  {
    id: 'doing',
    name: '正在维修'
  },
  {
    id: 'done',
    name: '完成'
  },
  {
    id: 'abort',
    name: '取消'
  }
]
let infoSchema2 = [
  {
    name: 'assetId',
    label: '设备名称',
    comp: 'assets-select'
  },
  {
    name: 'dept',
    label: '故障发生的科室',
    comp: 'custom'
  },
  {
    name: 'descr',
    label: '故障现象'
  },
  {
    name: 'faultAt',
    label: '故障发生时间',
    comp: 'el-date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    name: 'reporter',
    label: '上报人'
  },
  {
    name: 'contact',
    label: '联系方式'
  },
  {
    name: 'faultUrlList',
    label: '故障照片',
    comp: 'custom'
  }
]
let infoSchema = [
  {
    name: 'repairTime',
    label: '维修时间',
    comp: 'el-date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  {
    name: 'fixStep',
    label: '维修进度',
    comp: 'el-select',
    props: {
      options: options
    }
  },
  {
    name: 'kind',
    label: '故障类别'
  },
  {
    name: 'repairType2',
    label: '维修方',
    comp: 'custom'
  },
  {
    name: 'analysis',
    label: '故障分析'
  },
  {
    name: 'offerPrice',
    label: '维修确认',
    comp: 'custom'
  },
  {
    name: 'contractUrlList',
    label: '维修合同照片',
    comp: 'custom'
  },
  {
    name: 'receiptUrlList',
    label: '票据照片',
    comp: 'custom'
  }
]
export default {
  mixins: [token],
  data () {
    let info = {
      repairSelf: '',
      faultReason: '',
      measureSelf: '',
      changePartsSelf: '',
      costSelf: '',
      resultSelf: '',
      repairOthers: '',
      measureOthers: '',
      changePartsOthers: '',
      costOthers: '',
      resultOthers: '',
      engineerOthers: '',
      repairFactory: '',
      measureFactory: '',
      changePartsFactory: '',
      costFactory: '',
      resultFactory: '',
      factory: '',
      repairLeader: '',
      personInCharge: '',
      satisfaction: '',
      departmentLeader: '',
      repairPerson: '',
      userId: ''
    }
    let infoObj = this.createObjFromSchema(infoSchema)
    let infoObj2 = this.createObjFromSchema(infoSchema2)
    infoObj = Object.assign(infoObj, info)
    return {
      api,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      infoQueryObj2: infoObj2,
      infoQuerySchema2: infoSchema2,
      popShow: false,
      popTitle: '新建',
      detailId: '',
      venderOptions: JSON.parse(this.getStore('mainVenderOptions')) || [],
      // 保存图片地址
      imgObj: {
        faultImg: [],
        receiptImg: [],
        contractImg: []
      },
      // 回显图片地址
      filelistObj: {
        faultList: [],
        receiptList: [],
        contractList: []
      },
      rules: {
        assetId: [
          {
            required: true,
            message: '必填项',
            trigger: ['blur', 'change']
          }
        ]
      },
      deptArr: [],
      contractInfo: {},
      resultSelf: []
    }
  },
  methods: {
    // 删除数组里面删除的图片地址
    handleRemove (file, fileList, type) {
      let obj = this.imgObj['reportImg' + type]
      obj = this.sliceArr(obj, file, 'key')
    },
    // 保存上传的图片地址
    handleSuccess (response, file, fileList, type) {
      let obj = this.imgObj['reportImg' + type]
      obj.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      })
    },
    // 删除数组里面删除的图片地址
    handleFaultRemove (file, fileList) {
      this.imgObj.faultImg = this.sliceArr(this.imgObj.faultImg, file, 'key')
    },
    // 保存上传的图片地址
    handleFaultSuccess (response, file, fileList) {
      this.imgObj.faultImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      })
    },
    // 删除数组里面删除的图片地址
    handleReceiptRemove (file) {
      this.imgObj.receiptImg = this.sliceArr(
        this.imgObj.receiptImg,
        file,
        'key'
      )
    },
    // 保存上传的图片地址
    handleReceiptSuccess (response, file, fileList) {
      this.imgObj.receiptImg.push({
        name: file.name,
        type: this.getFileType(file.raw.name),
        url: `${this.imgBaseUrl}/${file.response.key}`,
        key: file.response.key
      })
    },
    // 删除数组里面删除的图片地址
    handleContractRemove (file, fileList) {
      this.imgObj.contractImg = this.sliceArr(
        this.imgObj.contractImg,
        file,
        'key'
      )
    },
    // 保存上传的图片地址
    handleContractSuccess (response, file, fileList) {
      this.imgObj.contractImg.push({
        name: file.name,
        type: this.getFileType(file.raw.name),
        url: `${this.imgBaseUrl}/${file.response.key}`,
        key: file.response.key
      })
    },
    beforeUploadGetKey () {
      // 每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID()
      this.uploadData.token = this.uploadToken
    },
    prev () {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let tips = this.detailId ? '更新' : '创建'
          let params = Object.assign({}, this.infoQueryObj, this.infoQueryObj2)
          delete params.repairType
          delete params.guaranteeType
          delete params.repairType2
          let url = 'createFault'
          if (this.detailId) {
            url = 'updateFault'
          } else {
            if (!params.fixStep) {
              params.fixStep = 'reported'
            }
          }
          params.faultUrlList =
            this.imgObj.faultImg.length > 0
              ? JSON.stringify(this.imgObj.faultImg)
              : ''
          params.receiptUrlList =
            this.imgObj.receiptImg.length > 0
              ? JSON.stringify(this.imgObj.receiptImg)
              : ''
          params.contractUrlList =
            this.imgObj.contractImg.length > 0
              ? JSON.stringify(this.imgObj.contractImg)
              : ''
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
    handleClose () {
      this.$router.go(-1)
    },
    emitInfo (row) {
      this.detailId = row.id
      Object.assign(this.infoQueryObj, row)
      for (let key in this.infoQueryObj) {
        if (row[key]) {
          this.infoQueryObj[key] = row[key]
        }
      }
      for (let key in this.infoQueryObj2) {
        if (row[key]) {
          this.infoQueryObj2[key] = row[key]
        } 
      }
      this.filelistObj.faultList =
        (this.infoQueryObj.faultUrlList &&
          JSON.parse(this.infoQueryObj.faultUrlList)) ||
        []
      this.imgObj.faultImg =
        (this.infoQueryObj.faultUrlList &&
          JSON.parse(this.infoQueryObj.faultUrlList)) ||
        []
      this.filelistObj.receiptList =
        (this.infoQueryObj.receiptUrlList &&
          JSON.parse(this.infoQueryObj.receiptUrlList)) ||
        []
      this.imgObj.receiptImg =
        (this.infoQueryObj.receiptUrlList &&
          JSON.parse(this.infoQueryObj.receiptUrlList)) ||
        []

      this.filelistObj.contractList =
        (this.infoQueryObj.contractUrlList &&
          JSON.parse(this.infoQueryObj.contractUrlList)) ||
        []
      this.imgObj.contractImg =
        (this.infoQueryObj.contractUrlList &&
          JSON.parse(this.infoQueryObj.contractUrlList)) ||
        []
    },
    getInfo () {
      api.faultFindById({ id: this.$route.query.id }).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      this.getInfo()
    }
    api.deptList({ pageNum: 1, pageSize: 200 }).then(rs => {
      this.deptArr = rs.data.list
    })
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.package-sale /deep/ .el-row {
  margin-top: 20px;
}
.log-btn-container {
  margin-top: 20px;
}
fieldset {
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 10px;
  margin-left: 30px;
}
legend {
  padding: 0 10px;
}
.package-sale /deep/ .el-radio__label {
  color: #606266;
}
.package-sale /deep/ .el-checkbox__label {
  color: #606266;
}
.contract-label {
  width: 160px;
  display: inline-block;
  text-align: right;
}
.contract-div {
  display:inline-block;
  width: calc(100% - 170px);
  &/deep/ input {
    height: 32px;
  }
}
.contract-label-only {
  width: 90px;
  display: inline-block;
  text-align: right;
  position: absolute;
}
.contract-div-only {
  display: inline-block;
  margin-left:90px;
  width: calc(100% - 90px);
}
</style>
