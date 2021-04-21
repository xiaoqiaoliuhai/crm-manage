<template>
  <div>
    <ever-bread-crumb class="title" :showTitle="'打印信息'"></ever-bread-crumb>
    <div class="print-container">
      <h3>西南医科大学附属中医医院医疗设备维修报告</h3>
      <table class="border-top">
        <tr class="border-bot">
          <td class="w50" rowspan="3">设备信息</td>
          <td colspan="2">使用科室: {{info.dept}}</td>
          <td colspan="2">报修日期:
            <div class="date-container">
              <span>{{info.ctime | formatTime(0)}}</span>年
              <span>{{info.ctime | formatTime(1)}}</span>月
              <span>{{info.ctime | formatTime(2)}}</span>日
              <span>{{info.ctime | formatTime(3)}}</span>时
            </div>
          </td>
        </tr>
        <tr class="border-bot">
          <td colspan="2">设备名称: {{info.assetName}}</td>
          <td colspan="2">修复日期: 
            <div class="date-container">
              <span>{{info.repairTime | formatTime(0)}}</span>年
              <span>{{info.repairTime | formatTime(1)}}</span>月
              <span>{{info.repairTime | formatTime(2)}}</span>日
              <span>{{info.repairTime | formatTime(3)}}</span>时
            </div>
          </td>
        </tr>
        <tr class="border-bot">
          <td colspan="2">型号及序列号: {{info.sn}}</td>
          <td colspan="2">资产编号: {{info.no}}</td>
        </tr>
      </table>
      <table>
        <tr class="border-bot">
          <td class="w50" :rowspan="16">故障处理</td>
          <td colspan="4">故障现象: {{info.descr}}</td>
        </tr>
        <tr class="border-bot">
          <td class="w100" :rowspan="5">
            <div class="checkbox" :class="{'nav': info.repairSelf === 1}"></div>
            院内自修
          </td>
          <td colspan="3">故障原因: {{info.faultReason}}</td>
        </tr>
        <tr>
          <td colspan="3">处理措施: {{info.measureSelf}}</td>
        </tr>
        <tr>
          <td colspan="3">更换配件情况: {{info.changePartsSelf}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">产生维修费用: {{info.costSelf}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            处理结果:
            <div class="checkbox ml10" :class="{'nav': info.resultSelf === 1}"></div>
            完全修复
            <div class="checkbox ml10" :class="{'nav': info.resultSelf === 2}"></div>
            未修复
            <div class="checkbox ml10" :class="{'nav': info.resultSelf === 3}"></div>
            无法修复，建议报废
          </td>
        </tr>
        
        <tr>
          <td class="w100 border-bot" :rowspan="5">
            <div class="checkbox" :class="{'nav': info.repairOthers === 1}"></div>
            院外工程师来院维修
          </td>
          <td colspan="3">处理措施: {{info.measureOthers}}</td>
        </tr>
        <tr>
          <td colspan="3">更换配件情况: {{info.changePartsOthers}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">产生维修费用: {{info.costOthers}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            处理结果:
            <div class="checkbox ml10" :class="{'nav': info.resultOthers === 1}"></div>
            完全修复
            <div class="checkbox ml10" :class="{'nav': info.resultOthers === 2}"></div>
            未修复
            <div class="checkbox ml10" :class="{'nav': info.resultOthers === 3}"></div>
            无法修复，建议报废
          </td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            工程师姓名及联系方式: {{info.engineerOthers}} {{info.engineerOthersPhone}}
          </td>
        </tr>

        <tr>
          <td class="w100 border-bot" :rowspan="5">
            <div class="checkbox" :class="{'nav': info.repairFactory === 1}"></div>
            返厂维修
          </td>
          <td colspan="3">处理措施: {{info.measureFactory}}</td>
        </tr>
        <tr>
          <td colspan="3">更换配件情况: {{info.changePartsFactory}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">产生维修费用: {{info.costFactory}}</td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            处理结果:
            <div class="checkbox ml10" :class="{'nav': info.resultFactory === 1}"></div>
            完全修复
            <div class="checkbox ml10" :class="{'nav': info.resultFactory === 2}"></div>
            未修复
            <div class="checkbox ml10" :class="{'nav': info.resultFactory === 3}"></div>
            无法修复，建议报废
          </td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            厂家名称及联系方式: {{info.factory}} {{info.factoryPhone}}
          </td>
        </tr>

        <tr>
          <td class="w50 border-bot" rowspan="2">故障分析</td>
          <td class="fonts12" colspan="4">（分析故障原因属于偶然现象？人为因素？环境因素？保养不到位？如何避免类似情况等）</td>
        </tr>
        <tr class="border-bot only-tr">
          <td colspan="4">
            <div v-if="!info.analysis" style="visibility: hidden;">111</div>
            <div v-else>{{info.analysis}}</div>
          </td>
        </tr>

        <tr class="border-bot">
          <td class="w50" rowspan="3">维修确认</td>
          <td>维修之前</td>
          <td colspan="3">
            维修班长: {{info.repairLeader}}
            <span class="seat"></span>
            设备保障部负责人: {{info.personInCharge}}
          </td>
        </tr>
        <tr>
          <td class="border-bot" rowspan="2">维修之后</td>
          <td colspan="3">
            本次维修满意度:
            <div class="checkbox ml10" :class="{'nav': info.satisfaction === 1}"></div>
            优
            <div class="checkbox ml10" :class="{'nav': info.satisfaction === 2}"></div>
            良
            <div class="checkbox ml10" :class="{'nav': info.satisfaction === 3}"></div>
            中
            <div class="checkbox ml10" :class="{'nav': info.satisfaction === 4}"></div>
            差
            <div class="checkbox ml10" :class="{'nav': info.satisfaction === 5}"></div>
            不合格
          </td>
        </tr>
        <tr class="border-bot">
          <td colspan="3">
            使用科室负责人: {{info.departmentLeader}}
            <span class="seat"></span>
            维修人员: {{info.repairPerson}}
          </td>
        </tr>
      </table>
    </div>
    <div class="button-container">
      <el-button @click="goPrev">返回</el-button>
      <el-button type="primary" @click="print">打印</el-button>
    </div>
  </div>
  
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {
      info: {}
    }
  },
  methods: {
    getInfo() {
      let id = this.$route.query.id
      let assetId = this.$route.query.assetId
      let params = {
        assetId: assetId,
        pageNum: 0,
        pageSize: 20
      }
      api.faultList(params).then(rs => {
        if (rs.code === 200) {
          console.log(rs.data.list, id)
          this.info = rs.data.list.find(item => item.id === id)
        }
      })
    },
    print() {
      window.print()
    },
    goPrev() {
      this.$router.go(-1)
    }
  },
  filters: {
    formatTime(val, len) {
      if (!val) return ''
      let value = val.split(':')[0].split(' ')
      let year = value[0].split('-')
      let date = [...year, value[1]]
      return date[len]
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style scoped>
.print-container {
  padding: 20px 50px;
}
.button-container {
  padding: 20px 50px;
  text-align: right;
}
.date-container {
  display: inline-block;
}
.date-container span {
  display: inline-block;
  width: 50px;
  text-align: center;
}
h3 {
  text-align: center;
  margin-bottom: 15px;
}
table {
  color: #000;
  width: 100%;
  border-collapse: collapse;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  line-height: 35px;
  text-align: center;
}
.border-bot {
  border-bottom: 1px solid #000 !important;
}
table tr td {
  border-right: 1px solid #000 !important;
  padding-right: 10px;
  text-align: left;
  padding: 0 5px;
  height: 38px;
}
.only-tr {
  height: 80px;
}
.only-tr td {
  position: relative;
}
.only-tr td div {
  position: absolute;
  top: 0;
  left: 15px;
  line-height: 1.2;
}
.w50 {
  width: 45px;
  padding: 0 10px;
  line-height: 1.5;
  text-align: center;
}
.w100 {
  width: 100px;
}
.w300 {
  width: 300px;
}
.mr10 {
  margin-right: 10px;
}
.ml50 {
  margin-left: 50px;
}
.ml10 {
  margin-left: 10px;
}
.fonts12 {
  font-size: 12px;
}
.seat {
  display: inline-block;
  width: 150px;
}
.border-top {
  border-top: 1px solid #000;
}
.checkbox {
  height: 10px;
  width: 10px;
  display: inline-block;
  border: 1px solid #000;
  position: relative;
}
.checkbox.nav::before{
  position: absolute;
  display: inline-block;
  content: '';
  width: 3px;
  height: 7px;
  border-color: #000;
  border-style: solid;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
  top: 0px;
  left: 3px;
}
</style>
<style>
@media print {
  .print-container {
    padding: 0;
    width: 900px;
  }
  .button-container {
    display: none;
  }
  .title {
    display: none;
  }
  .menu-container {
    display: none;
  }
  .right-content {
    margin-right: 0;
  }
  .header_container {
    display: none !important;
  }
  .right-content {
    margin-left: 0 !important;
  }
}
</style>