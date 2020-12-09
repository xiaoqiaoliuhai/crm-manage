import axios from './config'

function login (params) { // 登陆
  return axios.post('/manage/admin/login', params)
}
function getUpToken (params) { // 七牛上传获取token
  return axios.post('/manage/file/getUpToken', params)
}
function agencyCreate (params) { // 新建机构
  return axios.post('/manage/organization/create', params)
}
function agencyList (params) { // 获取机构列表
  return axios.post('/manage/organization/list', params)
}
function agencyFindById (params) { // 获取机构信息
  return axios.post('/manage/organization/findById', params)
}
function agencyUpdate (params) { // 编辑机构
  return axios.post('/manage/organization/update', params)
}
function agencyDel (params) { // 删除机构
  return axios.post('/manage/organization/delete', params)
}
function roleList (params) { // 角色列表
  return axios.post('/manage/role/list', params)
}
function roleFindById (params) { // 角色列表
  return axios.post('/manage/role/findById', params)
}
function roleCreate (params) { // 添加角色
  return axios.post('/manage/role/create', params)
}
function roleDel (params) { // 删除角色
  return axios.post('/manage/role/delete', params)
}
function roleUpdate (params) { // 编辑角色
  return axios.post('/manage/role/update', params)
}
function userInfo (params) { // 获取当前用户
  return axios.post('/manage/admin/info', params)
}
function userCreate (params) { // 创建用户
  return axios.post('/manage/admin/create', params)
}
function userDel (params) { // 批量删除用户
  return axios.post('/manage/admin/delete', params)
}
function userList (params) { // 获取用户列表
  return axios.post('/manage/admin/list', params)
}
function userFindById (params) { // 获取账号信息
  return axios.post('/manage/admin/findById', params)
}
function userUpdate (params) { // 更新用户信息
  return axios.post('/manage/admin/update', params)
}
function updatePassword (params) { // 修改密码
  return axios.post('/manage/admin/updatePassword', params)
}
function assetList (params) { // 设备列表
  return axios.post('/manage/asset/list', params)
}
function assetFindById (params) { // 根据id获取设备信息
  return axios.post('/manage/asset/findById', params)
}
function deleteAsset (params) { // 删除设备列表
  return axios.post('/manage/asset/delete', params)
}
function createAsset (params) { // 创建设备列表
  return axios.post('/manage/asset/create', params)
}
function updateAsset (params) { // 更新设备列表
  return axios.post('/manage/asset/update', params)
}
function faultList (params) { // 设备故障列表
  return axios.post('/manage/fault/list', params)
}
function faultFindById (params) { // 通过id获取设备故障信息
  return axios.post('/manage/fault/findById', params)
}
function createFault (params) { // 创建故障列表
  return axios.post('/manage/fault/create', params)
}
function deleteFault (params) { // 删除故障列表
  return axios.post('/manage/fault/delete', params)
}
function updateFault (params) { // 更新故障列表
  return axios.post('/manage/fault/update', params)
}
function mainList (params) { // 保养质检列表
  return axios.post('/manage/maintainQa/list', params)
}
function mainFindById (params) { // 保养质检列表
  return axios.post('/manage/maintainQa/findById', params)
}
function createMain (params) { // 创建保养质检
  return axios.post('/manage/maintainQa/create', params)
}
function deleteMain (params) { // 删除保养质检
  return axios.post('/manage/maintainQa/delete', params)
}
function updateMain (params) { // 更新保养质检
  return axios.post('/manage/maintainQa/update', params)
}
function complaintList (params) { // 投诉列表
  return axios.post('/manage/complaint/list', params)
}
function complaintFindById (params) { // 获取投诉详情
  return axios.post('/manage/complaint/findById', params)
}
function createComplaint (params) { // 创建投诉
  return axios.post('/manage/complaint/create', params)
}
function deleteComplaint (params) { // 删除投诉
  return axios.post('/manage/complaint/delete', params)
}
function updateComplaint (params) { // 更新投诉
  return axios.post('/manage/complaint/update', params)
}
function unPageList (params) { // 无分页列表
  return axios.post('/manage/asset/unPageList', params)
}
function createRoom (params) { // 创建房间
  return axios.post('/manage/room/create', params)
}
function deleteRoom (params) { // 删除房间
  return axios.post('/manage/room/delete', params)
}
function updateRoom (params) { // 更新房间
  return axios.post('/manage/room/update', params)
}
function roomFindById (params) { // 查询房间信息
  return axios.post('/manage/room/findById', params)
}
function roomList (params) { // 房间列表
  return axios.post('/manage/room/list', params)
}
function createIotDevice (params) { // 创建物联
  return axios.post('/manage/iotDevice/create', params)
}
function deleteIotDevice (params) { // 删除物联
  return axios.post('/manage/iotDevice/delete', params)
}
function updateIotDevice (params) { // 更新物联
  return axios.post('/manage/iotDevice/update', params)
}
function iotDeviceList (params) { // 房间物联
  return axios.post('/manage/iotDevice/list', params)
}
function unPageiotDeviceList (params) { // 物联设备列表
  return axios.post('/manage/iotDevice/unPageList', params)
}
function findById (params) { // 查询物联设备信息
  return axios.post('/manage/iotDevice/findById', params)
}
function assetMetricsList (params) { // 根据条件查询某个设备的历史数据
  return axios.post('/manage/assetMetrics/list', params)
}
function tempList (params) { // 所有设备监测数据
  return axios.post('/manage/assetMetrics/tempList', params)
}
function areaList (params) { // 院区列表
  return axios.post('/manage/area/list', params)
}
function delArea (params) { // 删除院区
  return axios.post('/manage/area/delete', params)
}
function findByIdArea (params) { // 查看园区信息
  return axios.post('/manage/area/findById', params)
}
function createArea (params) { // 新建院区
  return axios.post('/manage/area/create', params)
}
function updateArea (params) { // 更新院区
  return axios.post('/manage/area/update', params)
}
function buildingList (params) { // 建筑列表
  return axios.post('/manage/building/list', params)
}
function delBuilding (params) { // 删除建筑
  return axios.post('/manage/building/delete', params)
}
function findByIdBuilding (params) { // 查看建筑信息
  return axios.post('/manage/building/findById', params)
}
function createBuilding (params) { // 新建建筑
  return axios.post('/manage/building/create', params)
}
function updateBuilding (params) { // 更新建筑
  return axios.post('/manage/building/update', params)
}
function deptList (params) { // 科室列表
  return axios.post('/manage/dept/list', params)
}
function delDept (params) { // 删除科室
  return axios.post('/manage/dept/delete', params)
}
function findByIdDept (params) { // 查看科室信息
  return axios.post('/manage/dept/findById', params)
}
function createDept (params) { // 新建科室
  return axios.post('/manage/dept/create', params)
}
function updateDept (params) { // 更新科室
  return axios.post('/manage/dept/update', params)
}
function countByDate (params) { // 获取某段时间新增设备个数
  return axios.post('/manage/asset/countByDate', params)
}
function createContract (params) { // 创建合同
  return axios.post('/manage/guaranteeContract/create', params)
}
function delContract (params) { // 删除合同
  return axios.post('/manage/guaranteeContract/delete', params)
}
function findByAssetContract (params) { // 根据设备id查询合同信息
  return axios.post('/manage/guaranteeContract/findByAssetId', params)
}
function findByAssetsContract (params) { //  根据多个设备id查询合同信息
  return axios.post('/manage/guaranteeContract/findByAssetIds', params)
}
function findByIdContract (params) { // 根据id查询合同信息
  return axios.post('/manage/guaranteeContract/findById', params)
}
function contractList (params) { // 合同列表
  return axios.post('/manage/guaranteeContract/list', params)
}
function updateContract (params) { // 更新合同信息1
  return axios.post('/manage/guaranteeContract/update', params)
}
function faultCount (params) { // 设备维修记录
  return axios.post('/manage/fault/count', params)
}
function maintainQaCount (params) { // 设备质控/保养记录
  return axios.post('/manage/maintainQa/count', params)
}
function findByMacAddr (params) { // 通过mac地址获取对应的物联网络信息（院区、楼、科室）
  return axios.post('/manage/iotDevice/findByMacAddr', params)
}
function findAnomalous (params) { // 获取设备异常信息列表
  return axios.post('/manage/assetMetrics/findAnomalous', params)
}
function powerStatistics (params) { // 设备开关机时间
  return axios.post('/manage/assetMetrics/powerStatistics', params)
}
function findByDept (params) { // 各科室下的设备明细
  return axios.post('/manage/asset/findByDept', params)
}
function powerTimeStatistics (params) {
  return axios.post('/manage/assetMetrics/powerTimeStatistics', params)
}
function publicCreate (params) { // 推送数据
  return axios.post('/manage/assetMetrics/publicCreate', params)
}
function findGroupByDept () { // 各科室设备总量
  return axios.post('/manage/asset/findGroupByDept', {})
}
function countDeptFault () { // 各科室设备故障率
  return axios.post('/manage/fault/countDeptFault', {})
}
function findHistory (params) { // 根据mac地址获取历史数据
  return axios.post('/manage/assetMetrics/findHistory', params)
}
function findByParam (params) { // 设备开机次数
  return axios.post('/manage/powerOn/findByParam', params)
}
function findAll (params) {
  return axios.post('/manage/powerOn/findAll', params)
}
function notDone () { // home页获取各状态个数
  return axios.post('/manage/count/notDone')
}
function findAssetByDept (params) { // 科室id和开始时间、结束时间 查询该科室下所有设备的统计数据
  return axios.post('/manage/asset/findAssetByDept', params)
}
function findAssetBootTime (params) { // 查询设备的开机时间和开机次数
  return axios.post('/manage/assetMetrics/bootTime', params)
}
function queryMonitor (params) { // 查询设备的历史监测数据
  return axios.post('/manage/assetMetrics/queryMonitor', params)
}
function findTimeByAsset (params) { // 查看设备每天的开机数据
  return axios.post('/manage/asset/findTimeByAsset', params)
}
function findAssetCountByAllDept () { // 所有科室的设备数量
  return axios.post('/manage/asset/findAssetCountByAllDept')
}
function faultRateGroupByDept (params) { // 获取所有科室的故障率
  return axios.post('/manage/asset/faultRateGroupByDept', params)
}
function powerOnRateGroupByDept (params) { // 获取所有科室的开机率
  return axios.post('/manage/asset/powerOnRateGroupByDept', params)
}
function assetTypeList (params) { // 获取设备类数据
  return axios.post('/manage/assetType/list', params)
}
function queryAnomalousByIdOrMac (params) { // 获取设备异常信息
  return axios.post('/manage/assetMetrics/queryAnomalousByIdOrMac', params)
}
function findAssetNum (params) { // 查询一段时间内地设备总量、故障数量、开机数量
  return axios.post('/manage/asset/findAssetNum', params)
}
function findBootInterval (params) { // 根据设备id或者mac地址、开始时间、结束时间查询 ，查询开机时间间隔
  return axios.post('/manage/powerOn/findBootInterval', params)
}
function findMaQaDeByAssetIds (params) { // 根据批量设备id和时间查询该设备的合同信息，在本时间段内的维修信息,在本时间段内的保养信息,在本时间段内的质控信息,设备的折旧费
  return axios.post('/manage/asset/findMaQaDeByAssetIds', params)
}
function uploadfile (params) { // 上传文件
  return axios.post('/manage/file/uploadfile', params)
}
function LearningCenterList (params) { // 学习园地列表
  return axios.post('/manage/LearningCenter/list', params)
}
function LearningCenterfindById (params) { // 学习园地查询某条数据信息
  return axios.post('/manage/LearningCenter/findById', params)
}
function LearningCenterupdate (params) { // 学习园地编辑
  return axios.post('/manage/LearningCenter/update', params)
}
function LearningCenterdelete (params) { // 学习园地删除
  return axios.post('/manage/LearningCenter/delete', params)
}
function LearningCentercreate (params) {
  return axios.post('/manage/LearningCenter/create', params)
}
function todo (params) {
  return axios.post('/manage/count/toDo', params)
}
function queryTreatCountAndAverageTime (params) {
  return axios.post('/manage/asset/queryTreatCountAndAverageTime', params)
}
function dataForToday (params) {
  return axios.post('/manage/assetMetrics/dataForToday', params)
}
export default {
  todo,
  dataForToday,
  queryTreatCountAndAverageTime,
  LearningCentercreate,
  LearningCenterdelete,
  LearningCenterupdate,
  LearningCenterfindById,
  LearningCenterList,
  uploadfile,
  findMaQaDeByAssetIds,
  findBootInterval,
  findAssetNum,
  queryAnomalousByIdOrMac,
  assetTypeList,
  powerOnRateGroupByDept,
  faultRateGroupByDept,
  findAssetCountByAllDept,
  findTimeByAsset,
  queryMonitor,
  findAssetBootTime,
  findAssetByDept,
  login,
  getUpToken,
  agencyDel,
  agencyList,
  agencyUpdate,
  agencyCreate,
  assetList,
  deleteAsset,
  createAsset,
  updateAsset,
  roleDel,
  roleList,
  roleCreate,
  roleUpdate,
  updatePassword,
  userInfo,
  userCreate,
  userDel,
  userList,
  userUpdate,
  faultList,
  createFault,
  deleteFault,
  updateFault,
  mainList,
  createMain,
  deleteMain,
  updateMain,
  complaintList,
  createComplaint,
  deleteComplaint,
  updateComplaint,
  unPageList,
  createRoom,
  deleteRoom,
  updateRoom,
  roomList,
  createIotDevice,
  deleteIotDevice,
  updateIotDevice,
  unPageiotDeviceList,
  iotDeviceList,
  assetMetricsList,
  assetFindById,
  faultFindById,
  findById,
  roomFindById,
  userFindById,
  roleFindById,
  agencyFindById,
  mainFindById,
  complaintFindById,
  tempList,
  areaList,
  delArea,
  findByIdArea,
  createArea,
  updateArea,
  buildingList,
  delBuilding,
  findByIdBuilding,
  createBuilding,
  updateBuilding,
  deptList,
  delDept,
  findByIdDept,
  createDept,
  updateDept,
  countByDate,
  createContract,
  delContract,
  findByAssetContract,
  findByAssetsContract,
  findByIdContract,
  contractList,
  updateContract,
  faultCount,
  maintainQaCount,
  findByMacAddr,
  findAnomalous,
  powerStatistics,
  publicCreate,
  notDone,
  findByDept,
  powerTimeStatistics,
  findGroupByDept,
  countDeptFault,
  findHistory,
  findByParam,
  findAll
}
