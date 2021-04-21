<template>
  <div class="aaa" style="width: 1000px;">
    <h3>西南医科大学附属中医医院医疗设备维修报告</h3>
    <table class="border-top">
      <tr class="border-bot">
        <td class="w50" rowspan="3">设备信息</td>
        <td colspan="2">使用科室:</td>
        <td colspan="2">保修日期:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="2">设备名称:</td>
        <td colspan="2">修复日期:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="2">型号及序列号:</td>
        <td colspan="2">资产编号:</td>
      </tr>
    </table>
    <table>
      <tr class="border-bot">
        <td class="w50" :rowspan="16">故障处理</td>
        <td colspan="4">故障现象:</td>
      </tr>
      <tr class="border-bot">
        <td class="w100" :rowspan="5">
          <div class="checkbox"></div>
          院内自修
        </td>
        <td colspan="3">故障原因:</td>
      </tr>
      <tr>
        <td colspan="3">处理措施:</td>
      </tr>
      <tr>
        <td colspan="3">更换配件情况:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">产生维修费用:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          处理结果:
          <div class="checkbox ml10"></div>
          完全修复
          <div class="checkbox ml10"></div>
          未修复
          <div class="checkbox ml10"></div>
          无法修复，建议报废
        </td>
      </tr>
      
      <tr>
        <td class="w100 border-bot" :rowspan="5">
          <div class="checkbox nav"></div>
          院外工程师来院维修
        </td>
        <td colspan="3">处理措施:</td>
      </tr>
      <tr>
        <td colspan="3">更换配件情况:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">产生维修费用:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          处理结果:
          <div class="checkbox ml10"></div>
          完全修复
          <div class="checkbox ml10"></div>
          未修复
          <div class="checkbox ml10"></div>
          无法修复，建议报废
        </td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          工程师姓名及联系方式:
        </td>
      </tr>

      <tr>
        <td class="w100 border-bot" :rowspan="5">
          <div class="checkbox nav"></div>
          返厂维修
        </td>
        <td colspan="3">处理措施:</td>
      </tr>
      <tr>
        <td colspan="3">更换配件情况:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">产生维修费用:</td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          处理结果:
          <div class="checkbox ml10"></div>
          完全修复
          <div class="checkbox ml10"></div>
          未修复
          <div class="checkbox ml10"></div>
          无法修复，建议报废
        </td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          厂家名称及联系方式:
        </td>
      </tr>

      <tr>
        <td class="w50" rowspan="2">故障分析</td>
        <td class="fonts12" colspan="4">（分析故障原因属于偶然现象？人为因素？环境因素？保养不到位？如何避免类似情况等）</td>
      </tr>
      <tr class="border-bot">
        <td colspan="4">
          <div style="visibility: hidden;">111</div>
        </td>
      </tr>

      <tr class="border-bot">
        <td class="w50" rowspan="3">维修确认</td>
        <td>维修之前</td>
        <td colspan="3">
          维修班长:
          <span class="seat"></span>
          设备保障部负责人:
        </td>
      </tr>
      <tr>
        <td class="border-bot" rowspan="2">维修之后</td>
        <td colspan="3">
          本次维修满意度:
          <div class="checkbox ml10"></div>
          优
          <div class="checkbox ml10"></div>
          良
          <div class="checkbox ml10"></div>
          差
          <div class="checkbox ml10"></div>
          不合格
        </td>
      </tr>
      <tr class="border-bot">
        <td colspan="3">
          使用科室负责人:
          <span class="seat"></span>
          维修人员:
        </td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
h3 {
  text-align: center;
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