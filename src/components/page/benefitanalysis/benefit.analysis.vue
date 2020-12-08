<template>
  <div class="layout_inner">
    <div v-show="echartShow">
      <fieldset>
        <legend>基础数据</legend>
        <div class="bidder">
          <ever-form2 :schema="querySchema1" v-model="queryObj1" @query="query" ref="form" class="package-sale" :info="true" label-position="right" :nosubmit="true" :inline="true">
            <template slot="time">
              <div style="display: inline-block;width:150px;">
                <el-date-picker
                  v-model="basicInfo.beginDate"
                  type="date"
                  placeholder="开始时间">
                </el-date-picker>
              </div>
              -
              <div style="display: inline-block;width:150px;">
                <el-date-picker
                  v-model="basicInfo.endDate"
                  type="date"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </template>
            <template slot="btn">
              <el-button type="primary" @click="count">计算</el-button>
            </template>
          </ever-form2>
          <el-form ref="form" :model="basicInfo" label-width="40px" class="dept benefit-tag">
            <el-form-item label="设备">
              <el-tag
                v-for="(tag, index) in assetArr"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleClose(index)">
                {{tag.name + '('+ tag.sn+')'}}
              </el-tag>
               <el-button type="primary" @click="addAsset()">添加设备</el-button>
            </el-form-item>
          </el-form>
          <el-form ref="form" :model="basicInfo" label-width="100px" class="dept benefit-tag">
            <el-form-item label="收入费用分类">
              <el-tag
                v-for="(tag, index) in costArr"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleCostClose(index)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                style="width:200px;"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" type="primary" @click="showInput">添加费用分类</el-button>
            </el-form-item>
          </el-form>
          <el-form ref="form" :model="basicInfo" label-width="100px" class="dept benefit-tag">
            <el-form-item label="支出费用分类">
              <el-tag
                v-for="(tag, index) in costPayArr"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleCostPayClose(index)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputPayVisible"
                v-model="inputPayValue"
                ref="saveTagPayInput"
                size="small"
                style="width:200px;"
                @keyup.enter.native="handlePayInputConfirm"
                @blur="handlePayInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" type="primary" @click="showPayInput">添加费用分类</el-button>
            </el-form-item>
          </el-form>
        </div>
      </fieldset>
      <fieldset>
        <legend>收入</legend>
        <div class="bidder">
          <el-tabs type="border-card" v-model="incomeName">
            <el-tab-pane label="汇总数据">
              <el-form ref="form" :label-position="'right'"  label-width="80px">
                <el-form-item v-for="(item, index) in incomeSummary" :label="item.name" :key="index" class="form-style">
                  <el-input v-model="item.value" type="number" @blur="incomeSummaryChange" @keyup.enter.native="incomeSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="明细数据">
              <el-form ref="form" :label-position="'right'" label-width="80px">
                <el-row style="margin-bottom: 10px;">
                  <el-col :span="24">
                    <span style="margin-right:20px;" v-for="(item, index) in assetIncomeSummary" :key="index"><label>{{item.name}}：</label>¥ <span class="green">{{item.value | formatToFinacial}}</span></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-for="(item, index) in assetArr" v-if="!!item.name" :key="index" class="div-col">
                    <div class="container">
                      <el-form-item label="设备:">
                        <span>{{item.name + '('+ item.sn+')'}}</span>
                      </el-form-item>
                      <el-form-item  v-for="(lab, $index) in item.costCategory" :label="lab.name" :key="$index" class="form-width">
                        <el-input v-model="lab.value" type="number" @blur="assetInputChange(lab.name, lab.value)" @keyup.enter.native="assetInputChange(lab.name, lab.value)">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </fieldset>
      <fieldset>
        <legend>支出</legend>
        <div class="bidder">
          <el-tabs type="border-card" v-model="costName">
            <el-tab-pane label="汇总数据">
              <el-form ref="form" :label-position="'right'" label-width="80px">
                <el-form-item v-for="(item, index) in costSummary" :label="item.name" :key="index" class="form-style">
                  <el-input v-model="item.value" @blur="costSummaryChange" @keyup.enter.native="costSummaryChange">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="明细数据">
              <el-form ref="form" :label-position="'right'" :model="basicInfo" label-width="80px">
                <el-row style="margin-bottom: 10px;">
                  <el-col :span="24">
                    <span style="margin-right:20px;" v-for="(item, index) in assetCostSummary" :key="index"><label>{{item.name}}：</label>¥ <span class="green">{{item.value | formatToFinacial}}</span></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-for="(item, index) in assetArr" v-if="!!item.name" :key="index" class="div-col">
                    <div class="container">
                      <el-form-item label="设备:">
                        <span>{{item.name + '('+ item.sn+')'}}</span>
                      </el-form-item>
                      <el-form-item  v-for="(lab, $index) in item.payCategory" :label="lab.name" :key="$index" class="form-width">
                        <el-input v-model="lab.value" type="number" @blur="costInputChange(lab.name, lab.value)" @keyup.enter.native="costInputChange(lab.name, lab.value)">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </fieldset>
      <div>
        <el-table id="excelTable" style="width: 100%;height: 50px;visibility: hidden;overflow: hidden;" :data="tableData" border stripe max-height="470">
          <el-table-column type="index" width="50" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="设备名称">
          </el-table-column>
          <el-table-column prop="deptName" label="设备类别">
          </el-table-column>
          <el-table-column prop="model" label="型号">
          </el-table-column>
          <el-table-column prop="sn" label="SN序列号">
          </el-table-column>
          <el-table-column prop="vender" label="厂家">
          </el-table-column>
          <el-table-column prop="purchasePrice" label="采购价格">
          </el-table-column>
          <el-table-column prop="depreciationCharge" label="设备年折旧费">
          </el-table-column>
          <el-table-column v-for="(item, index) in incomeCol" :key="index" :prop="item.name + '(收入)'" :label="item.name + '(收入)'">
          </el-table-column>
          <el-table-column prop="维修费用(支出)" label="维修费用(支出)">
          </el-table-column>
          <el-table-column prop="质控费用(支出)" label="质控费用(支出)">
          </el-table-column>
          <el-table-column prop="保养费用(支出)" label="保养费用(支出)">
          </el-table-column>
          <el-table-column prop="折旧费用(支出)" label="折旧费用(支出)">
          </el-table-column>
          <el-table-column prop="合同费用(支出)" label="合同费用(支出)">
          </el-table-column>
          <el-table-column v-for="(item, index) in payCol" :key="index" :prop="item.name + '(支出)'" :label="item.name + '(支出)'">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="!echartShow">
      <div class="ever-bread-crumb">
        <el-button @click="echartShow = true" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
        <span>返回</span>
      </div>
      <div class="analysis" style="margin-top:10px;">
        <div class="title">
          <span>效益分析</span>
          <el-button @click="exportExcel" plain type="primary" class="backStyle">导出</el-button>
        </div>
        <div class="money">
          <ul>
            <li>
              <div class="money-title">收入</div>
              <div class="money-info">
                <span class="money-style red">{{analysisData.incomePrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
            <li>
              <div class="money-title">支出</div>
              <div class="money-info">
                <span class="money-style green">{{analysisData.expenditurePrice | formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
            <li>
              <div class="money-title">利润</div>
              <div class="money-info">
                <span class="money-style red">{{(analysisData.incomePrice - analysisData.expenditurePrice)| formatToFinacial}}</span>
                <span class="company">元</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="background-color:#fff;">
        <el-row>
          <el-col :span="12" style="border-right:1px solid #eee;">
            <income-echarts :eData="echartsDataArr.incomeEchartsData"></income-echarts>
          </el-col>
          <el-col :span="12">
            <income-echarts :eData="echartsDataArr.expenditureEchartsData"></income-echarts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-top:20px;">
            <asset-echarts :eData="echartsDataArr.assetIncomeData"></asset-echarts>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <cost-echarts :eData="echartsDataArr.assetCostData"></cost-echarts>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="设备列表" :visible.sync="assetTableLog" width="80%" :append-to-body="true" :close-on-click-modal="false">
      <el-table v-loading="loading" ref="everTable" :data="assetTableData" style="width: 100%" height="400" stripe  @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="设备名称" width="170">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sn" label="SN序列号" width="140">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="kind" label="设备类型" width="170">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="no" label="资产编号" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" label="科室" width="110">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="vender" label="厂家">
        </el-table-column>
      </el-table>
      <div style="text-align:left; padding-top: 20px;">
        <el-button type="primary" @click="addTableAssetInfo">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
import moment from 'moment'
import incomeEcharts from './income.echarts'
import assetEcharts from './asset.echarts'
import costEcharts from './cost.echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema1 = [
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
  mixins: [token],
  components: {
    incomeEcharts,
    assetEcharts,
    costEcharts
  },
  data () {
    let obj1 = this.createObjFromSchema(schema1)
    return {
      api,
      querySchema1: schema1,
      queryObj1: obj1,
      echartShow: true,
      tableData: [],
      basicInfo: {
        assetId: '',
        beginDate: '',
        endDate: '',
        otherPrice: 0,
        consumablesPrice: 0
      },
      incomeSummary: [ //  收入汇总数据
        { name: '设备费用', value: '' },
        { name: '耗材费用', value: '' },
        { name: '其他费用', value: '' },
        { name: '总费用', value: '' }
      ],
      assetIncomeSummary: [// 收入设备明细汇总数据
        { name: '设备费用', value: 0 }, // 设备费用
        { name: '耗材费用', value: 0 }, // 耗材费用
        { name: '其他费用', value: 0 }, // 其他费用
        { name: '总费用', value: 0 } // 总费用
      ],
      costSummary: [ // 支出汇总数据
        { name: '耗材支出', value: '' },
        { name: '其他支出', value: '' },
        { name: '总支出', value: '' }
      ],
      assetCostSummary: [ // 支出设备明细汇总数据
        { name: '耗材支出', value: 0 }, // 耗材支出
        { name: '其他支出', value: 0 }, // 其他支出
        { name: '总支出', value: 0 } // 总支出
      ],
      assetArr: [],
      assetOptions: [],
      assetArrObj: {},
      echartsDataArr: {
        incomeEchartsData: {},
        expenditureEchartsData: {},
        assetIncomeData: {},
        assetCostData: {}
      },
      incomeName: '',
      costName: '',
      analysisData: {
        incomePrice: 0, // 收入
        expenditurePrice: 0, // 支出
        profitPrice: 0, // 利润
        lossPrice: 0 // 设备损耗
      },
      assetCostInfo: {},
      loading: false,
      assetTableData: [],
      assetTableLog: false,
      checkAsset: [],
      costArr: [],
      inputVisible: false,
      inputValue: '',
      costPayArr: [],
      inputPayVisible: false,
      inputPayValue: '',
      publicCostCategory: [
        { name: '设备费用', value: '' },
        { name: '耗材费用', value: '' },
        { name: '其他费用', value: '' }
      ],
      publicPayCategory: [
        { name: '耗材支出', value: '' },
        { name: '其他支出', value: '' }
      ],
      incomeAssetInfo: [], // 数据整理过的设备收入费用
      payAssetsInfo: [], // 数据整理过的设备支出费用
      incomeCol: [], // 导出数据的收入列
      payCol: [] // 导出数据的支出列
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showPayInput () {
      this.inputPayVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagPayInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.costArr.push(inputValue)
        window.localStorage.setItem('costTypeInfo', this.costArr.join('*'))
      }
      this.inputVisible = false
      this.inputValue = ''
      this.addTableAssetInfo()
    },
    handlePayInputConfirm () {
      let inputPayValue = this.inputPayValue
      if (inputPayValue) {
        this.costPayArr.push(inputPayValue)
        window.localStorage.setItem('costPayTypeInfo', this.costPayArr.join('*'))
      }
      this.inputPayVisible = false
      this.inputPayValue = ''
      this.addTableAssetInfo()
    },
    handleSelectionChange (val) {
      this.checkAsset = val
    },
    query () {

    },
    goBack () {
      this.echartShow = true
    },
    costSummaryChange () {
      let price = 0
      this.costSummary.forEach((item, index) => {
        if (index !== this.costSummary.length - 1) {
          price += Number(item.value)
        }
      })
      this.costSummary[this.costSummary.length - 1]['value'] = price
    },
    costInputChange (key, value) {
      let price = 0
      let allPrice = 0
      this.assetArr.forEach(item => {
        price += Number(item.payCategory.find(lab => lab.name === key).value)
      })
      this.assetCostSummary.find(lab => lab.name === key).value = price
      this.assetCostSummary.forEach((item, index) => {
        if (index !== this.assetCostSummary.length - 1) {
          allPrice += Number(item.value)
        }
      })
      this.assetCostSummary[this.assetCostSummary.length - 1]['value'] = allPrice
    },
    incomeSummaryChange () {
      let price = 0
      this.incomeSummary.forEach((item, index) => {
        if (index !== this.incomeSummary.length - 1) {
          price += Number(item.value)
        }
      })
      this.incomeSummary[this.incomeSummary.length - 1]['value'] = price
    },
    assetInputChange (key, value) {
      let price = 0
      let allPrice = 0
      this.assetArr.forEach(item => {
        price += Number(item.costCategory.find(lab => lab.name === key).value)
      })
      this.assetIncomeSummary.find(lab => lab.name === key).value = price
      this.assetIncomeSummary.forEach((item, index) => {
        if (index !== this.assetIncomeSummary.length - 1) {
          allPrice += Number(item.value)
        }
      })
      this.assetIncomeSummary[this.assetIncomeSummary.length - 1]['value'] = allPrice
    },
    addTableAssetInfo () { // 将设备和费用类别组合起来
      let arr = []
      let costCategory = JSON.parse(JSON.stringify(this.publicCostCategory))
      this.assetIncomeSummary = [ // 收入设备明细汇总数据
        { name: '设备费用', value: 0 }, // 设备费用
        { name: '耗材费用', value: 0 }, // 耗材费用
        { name: '其他费用', value: 0 }, // 其他费用
        { name: '总费用', value: 0 } // 总费用
      ]
      this.incomeSummary = [ // 收入汇总数据
        { name: '设备费用', value: '' }, // 设备费用
        { name: '耗材费用', value: '' }, // 耗材费用
        { name: '其他费用', value: '' }, // 其他费用
        { name: '总费用', value: '' } // 总费用
      ]
      this.costArr.forEach(item => {
        let info = {
          name: item,
          value: ''
        }
        costCategory.splice(costCategory.length - 1, 0, info)
        this.assetIncomeSummary.splice(this.assetIncomeSummary.length - 2, 0, { name: item, value: 0 })
        this.incomeSummary.splice(this.incomeSummary.length - 2, 0, { name: item, value: '' })
      })
      let payCategory = JSON.parse(JSON.stringify(this.publicPayCategory))
      this.assetCostSummary = [ // 支出设备明细汇总数据
        { name: '耗材支出', value: 0 }, // 耗材支出
        { name: '其他支出', value: 0 }, // 其他支出
        { name: '总支出', value: 0 } // 总支出
      ]
      this.costSummary = [ // 支出汇总数据
        { name: '耗材支出', value: '' }, // 耗材支出
        { name: '其他支出', value: '' }, // 其他支出
        { name: '总支出', value: '' } // 总支出
      ]
      this.costPayArr.forEach(item => {
        let info = {
          name: item,
          value: ''
        }
        payCategory.splice(payCategory.length - 1, 0, info)
        this.assetCostSummary.splice(this.assetCostSummary.length - 2, 0, { name: item, value: 0 })
        this.costSummary.splice(this.costSummary.length - 2, 0, { name: item, value: '' })
      })
      this.checkAsset.forEach(item => {
        let info = {
          id: item.id,
          name: item.name,
          sn: item.sn,
          costCategory: JSON.parse(JSON.stringify(costCategory)),
          payCategory: JSON.parse(JSON.stringify(payCategory))
        }
        arr.push(info)
      })
      this.assetArr = arr
      this.assetTableLog = false
    },
    addAsset () {
      this.assetTableLog = true
      if (this.$refs.everTable) {
        this.$refs.everTable.clearSelection()
      }
      this.assetTableData.forEach(item => {
        let info = this.assetArr.find(lab => lab.id === item.id)
        if (info) {
          this.$refs.everTable.toggleRowSelection(item, true)
        }
      })
    },
    handleCostClose (index) {
      this.costArr.splice(index, 1)
      window.localStorage.setItem('costTypeInfo', this.costArr.join('*'))
      this.addTableAssetInfo() // 设备和费用类别改变一次就重新计算数据
    },
    handleCostPayClose (index) {
      this.costPayArr.splice(index, 1)
      window.localStorage.setItem('costPayTypeInfo', this.costPayArr.join('*'))
      this.addTableAssetInfo() // 设备和费用类别改变一次就重新计算数据
    },
    handleClose (index) {
      this.assetArr.splice(index, 1)
    },
    async count () {
      this.getAssetCost()
      this.initIncome()
      this.echartShow = false
    },
    initAssetsContractDataExport (data) {
      data.forEach(item => {
        item.assetServiceContracts.forEach(lab => {
          let obj = this.assetArr.find(e => e.id === lab.assetId)
          if (obj) {
            obj.htAmount = lab.amount
          }
        })
      })
    },
    async getAssetFeeInfo () {
      return new Promise((resolve, reject) => {
        let data = []
        this.assetArr.forEach(item => {
          let info = {
            id: item.id,
            name: item.name,
            faultPrice: 1, // 维修费用
            maintainPrice: 2, // 质控费用
            qaPrice: 3, // 保养费用
            assetPrice: 4, // 折旧费用
            assetContractPrice: 5 // 合同费用
          }
          data.push(info)
        })
        resolve(data)
      })
    },
    async getAssetCost () {
      let assetFeeInfo = await this.getAssetFeeInfo()
      this.assetCostInfo = {}
      let feeArr = [
        { name: '维修费用', value: 0 },
        { name: '质控费用', value: 0 },
        { name: '保养费用', value: 0 },
        { name: '折旧费用', value: 0 },
        { name: '合同费用', value: 0 }
      ]
      assetFeeInfo.forEach(item => {
        feeArr[0]['value'] += Number(item.faultPrice)
        feeArr[1]['value'] += Number(item.maintainPrice)
        feeArr[2]['value'] += Number(item.qaPrice)
        feeArr[3]['value'] += Number(item.assetPrice)
        feeArr[4]['value'] += Number(item.assetContractPrice)
      })
      let objInfo = []
      if (this.costName === '0') {
        objInfo = JSON.parse(JSON.stringify(this.costSummary))
        this.analysisData.expenditurePrice = this.costSummary[this.costSummary.length - 1]['value']
      } else {
        objInfo = JSON.parse(JSON.stringify(this.assetCostSummary))
        this.analysisData.expenditurePrice = this.assetCostSummary[this.assetCostSummary.length - 1]['value']
        this.initAssetPayIncomeData(assetFeeInfo) // 处理明细数据
      }
      objInfo.pop()
      objInfo = [...objInfo]
      let titleInfo = objInfo.map(item => { return item.name })
      this.echartsDataArr.expenditureEchartsData = {
        objInfo: objInfo,
        titleInfo: titleInfo,
        title: '支出明细'
      }
    },
    initAssetPayIncomeData (assetFeeInfo) {
      let assets = JSON.parse(JSON.stringify(this.assetArr))
      assets.forEach(item => {
        item.allPrice = item.payCategory.reduce((pre, cur) => { return Number(pre) + Number(cur.value) }, 0)
      })
      assets.sort((a, b) => { return b.allPrice - a.allPrice }) // 排序
      this.payAssetsInfo = assets
      let obj = {
        assetNames: [], // 名称
        yData: {
          '总费用': []
        },
        legend: [],
        titleData: assets[0]['payCategory'].map(item => { return item.name }).unshift('总费用')
      }
      assets.forEach(item => {
        obj.assetNames.push(item.name + '(' + item.sn + ')')
        obj.yData['总费用'].push(item.allPrice)
        item.payCategory.forEach(lab => {
          if (obj.yData[lab.name]) {
            obj.yData[lab.name].push(lab.value)
          } else {
            (obj.yData)[lab.name] = [lab.value]
            obj.legend.push(lab.name)
          }
        })
      })
      obj.legend.push('总费用')
      this.echartsDataArr.assetCostData = obj
    },
    initIncome () {
      this.echartsDataArr.assetIncomeData = {
        assetNames: [], // 名称
        assetPrice: [], // 设备费用
        consumablesPrice: [], // 耗材费用
        otherPrice: [], // 其他费用
        allPrice: []
      }
      let objInfo = []
      if (this.incomeName === '0') {
        objInfo = JSON.parse(JSON.stringify(this.incomeSummary))
        this.analysisData.incomePrice = this.incomeSummary[this.incomeSummary.length - 1]['value']
      } else {
        objInfo = JSON.parse(JSON.stringify(this.assetIncomeSummary))
        this.analysisData.incomePrice = this.assetIncomeSummary[this.assetIncomeSummary.length - 1]['value']
        this.initAssetIncomeData() // 处理明细数据
      }
      objInfo.pop()
      let titleInfo = objInfo.map(item => { return item.name })
      this.echartsDataArr.incomeEchartsData = {
        objInfo: objInfo,
        titleInfo: titleInfo,
        title: '收入明细'
      }
    },
    initAssetIncomeData () {
      let assets = JSON.parse(JSON.stringify(this.assetArr))
      assets.forEach(item => {
        item.allPrice = item.costCategory.reduce((pre, cur) => { return Number(pre) + Number(cur.value) }, 0)
      })
      assets.sort((a, b) => { return b.allPrice - a.allPrice }) // 排序
      this.incomeAssetInfo = assets
      let obj = {
        assetNames: [], // 名称
        yData: {
          '总费用': []
        },
        legend: [],
        titleData: assets[0]['costCategory'].map(item => { return item.name }).unshift('总费用')
      }
      assets.forEach(item => {
        obj.assetNames.push(item.name + '(' + item.sn + ')')
        obj.yData['总费用'].push(item.allPrice)
        item.costCategory.forEach(lab => {
          if (obj.yData[lab.name]) {
            obj.yData[lab.name].push(lab.value)
          } else {
            (obj.yData)[lab.name] = [lab.value]
            obj.legend.push(lab.name)
          }
        })
      })
      obj.legend.push('总费用')
      this.echartsDataArr.assetIncomeData = obj
    },
    exportExcel () {
      this.incomeCol = this.assetIncomeSummary
      this.payCol = this.costSummary
      let tableData = []
      this.checkAsset.forEach(item => {
        let asset = JSON.parse(JSON.stringify(item))
        let assetFee = this.incomeAssetInfo.filter(lab => { return lab.id === item.id })[0] || { costCategory: [] }
        let assetPayFee = this.payAssetsInfo.filter(lab => { return lab.id === item.id })[0] || { payCategory: [] }
        let allPrice = 0
        let allPayPrice = 0
        assetFee.costCategory.forEach(lab => {
          asset[lab.name + '(收入)'] = lab.value
          allPrice += Number(lab.value)
        })
        asset['总费用(收入)'] = allPrice
        assetPayFee.payCategory.forEach(lab => {
          asset[lab.name + '(支出)'] = lab.value
          allPayPrice += Number(lab.value)
        })
        asset['总支出(支出)'] = allPayPrice
        tableData.push(asset)
      })
      this.tableData = tableData
      this.$nextTick(_ => {
        var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '效益分析.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      })
    },
    getLocalVal (key) {
      let val = (window.localStorage.getItem(key) || '').split('*')
      if (val.length === 1 && !val[0]) {
        val = []
      }
      return val
    }
  },
  created () {
    api.assetList({ pageNum: 1, pageSize: 2000 }).then(rs => {
      if (rs.code === 200) {
        this.assetTableData = rs.data.list
      }
    })
    this.costArr = this.getLocalVal('costTypeInfo')
    this.costPayArr = this.getLocalVal('costPayTypeInfo')
    this.addTableAssetInfo()
    this.basicInfo.endDate = moment().format('YYYY-MM-DD')
    this.basicInfo.beginDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
  },
  watch: {
    // 'incomeName': {
    //   handler(val) {

    //   },
    //   immediate: true
    // }
  }
}
</script>
<style lang="less" scoped>
.layout_inner /deep/ .el-input-group__append{
  padding: 0 10px;
}
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.bidder {
  position: relative;
}
fieldset {
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 20px;
}
legend {
  padding: 0 10px;
}
.el-form-item {
  margin-bottom: 5px;
}
.icon-btn {
  margin-left: 5px;
  font-size: 18px;
  padding: 0;
}
.icon-btn-del {
  color:#fa5555;
}
.div-col {
  padding:5px;
  .container{
    padding: 5px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    background: #FFF;
    box-sizing: border-box;
    & /deep/ label {
      line-height: 30px !important;
    }
    & /deep/ .el-form-item__content {
      line-height: 30px !important;
    }
  }
}
.count-btn {
  right: 0;
  position: absolute;
  z-index: 100;
  .el-button {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
  }
}
.form-width {
  width:250px;
  display:inline-block;
}
.form-style {
  display: inline-block;
  width: 250px;
}
.analysis {
  background-color: #fff;
  position: relative;
  .title{
    width: 100%;
    border-bottom: 5px solid #f8fafe;
    box-sizing: border-box;
    padding: 10px;
  }
  .money {
    overflow: hidden;
    li {
      margin:10px;
      float: left;
      padding: 0 10px;
      display: inline-block;
      border-right: 1px solid #eee;
      .money-title {
        font-size: 14px;
        color: #606266;
      }
      .money-info {
        margin-top: 10px;
        .company {
          margin-left: 20px;
        }
        .money-style {
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
  }
  .money li:last-child {
    boder:none;
  }
}
.red {
  color: red;
}
.green {
  color: #55AA00;
}
.backStyle {
  text-align:right;
  padding:5px 10px;
  position: absolute;
  right: 10px;
}
.el-date-editor{
    height: 32px;
    line-height: 32px;
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
    height: 32px !important;
  }
  .dept /deep/ label {
    color: #000;
  }
  .ever-bread-crumb {
    margin: 0px 0 15px 0;
    color:#606266;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin: 0 5px 0 0 !important;
  }
  .benefit-tag /deep/ .el-tag {
    margin-right: 10px;
  }
</style>
