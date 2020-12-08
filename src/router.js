import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const page = r => require.ensure([], () => r(require('@/components/manage')), 'manage')
const Home = r => require.ensure([], () => r(require('@/components/page/home.vue')), 'home')
const AgencyList = r => require.ensure([], () => r(require('@/components/page/agency/agency.list.vue')), 'agencylist')
const AgencyAdd = r => require.ensure([], () => r(require('@/components/page/agency/agency.add.vue')), 'agencyadd')
const RoleList = r => require.ensure([], () => r(require('@/components/page/role/role.list.vue')), 'rolelist')
const RoleAdd = r => require.ensure([], () => r(require('@/components/page/role/role.add.vue')), 'roleadd')
const UserList = r => require.ensure([], () => r(require('@/components/page/users/users.list.vue')), 'userslist')
const UserAdd = r => require.ensure([], () => r(require('@/components/page/users/users.add.vue')), 'usersadd')
const assetManage = r => require.ensure([], () => r(require('@/components/page/assetManage/asset.manage.list.vue')), 'assetManage')
const assetManageAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/asset.manage.add.vue')), 'assetmanage')

const assetFailure = r => require.ensure([], () => r(require('@/components/page/fault/asset.failure.list.vue')), 'assetFailure')
const assetFailurAdd = r => require.ensure([], () => r(require('@/components/page/fault/asset.failure.add.vue')), 'assetFailureadd')
const maintenanceQa = r => require.ensure([], () => r(require('@/components/page/maintain/maintenanceqa.vue')), 'maintenanceqa')
const maintenanceQaAdd = r => require.ensure([], () => r(require('@/components/page/maintain/maintenanceqaadd.vue')), 'maintenanceqaadd')
const maintenanceMain = r => require.ensure([], () => r(require('@/components/page/maintain/maintenancemain.vue')), 'maintenancemain')
const maintenanceMainAdd = r => require.ensure([], () => r(require('@/components/page/maintain/maintenancemainadd.vue')), 'maintenancemain')
const complaint = r => require.ensure([], () => r(require('@/components/page/complaint/complaint.list.vue')), 'complaint')
const complaintAdd = r => require.ensure([], () => r(require('@/components/page/complaint/complaint.add.vue')), 'complaintadd')
const assetRun = r => require.ensure([], () => r(require('@/components/page/assetrun/asset.run.list.vue')), 'assetRun')
const assetDetail2 = r => require.ensure([], () => r(require('@/components/page/assetrun/asset.detail2.vue')), 'assetdetail')
const device = r => require.ensure([], () => r(require('@/components/page/device/device.list.vue')), 'device')
const deviceAdd = r => require.ensure([], () => r(require('@/components/page/device/device.add.vue')), 'deviceAdd')
const houseAdd = r => require.ensure([], () => r(require('@/components/page/house/house.add.vue')), 'houseAdd')
const house = r => require.ensure([], () => r(require('@/components/page/house/house.list.vue')), 'house')
const sectionList = r => require.ensure([], () => r(require('@/components/page/section/section.list.vue')), 'sectionList')
const sectionAdd = r => require.ensure([], () => r(require('@/components/page/section/section.add.vue')), 'sectionAdd')
const parkList = r => require.ensure([], () => r(require('@/components/page/park/park.list.vue')), 'parkList')
const parkAdd = r => require.ensure([], () => r(require('@/components/page/park/park.add.vue')), 'parkAdd')
const agencybuildingsList = r => require.ensure([], () => r(require('@/components/page/agencybuildings/agencybuildings.list.vue')), 'agencybuildingsList')
const agencybuildingsAdd = r => require.ensure([], () => r(require('@/components/page/agencybuildings/agencybuildings.add.vue')), 'agencybuildingsAdd')
const contractList = r => require.ensure([], () => r(require('@/components/page/contract/contract.list.vue')), 'contractList')
const contractAdd = r => require.ensure([], () => r(require('@/components/page/contract/contract.add.vue')), 'contractAdd')

const benefitAnalysis = r => require.ensure([], () => r(require('@/components/page/benefitanalysis/benefit.analysis.vue')), 'benefitAnalysis')
const efficiencyAnalysis = r => require.ensure([], () => r(require('@/components/page/efficiencyanalysis/efficiency.analysis.vue')), 'efficiencyAnalysis')
const exportData = r => require.ensure([], () => r(require('@/components/page/efficiencyanalysis/export.data.vue')), 'exportData')
const assettypeList = r => require.ensure([], () => r(require('@/components/page/assettype/asset.type.list.vue')), 'assettypeList')
const documentList = r => require.ensure([], () => r(require('@/components/page/documentmanage/document.list.vue')), 'documentList')
const documentAdd = r => require.ensure([], () => r(require('@/components/page/documentmanage/document.add.vue')), 'documentAdd')

const routerarr = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/page',
    component: page,
    name: '',
    redirect: '/page/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          name: '数据概览'
        }
      },
      {
        path: 'agencylist',
        component: AgencyList,
        meta: {
          name: '机构管理'
        }
      },
      {
        path: 'agencyadd',
        component: AgencyAdd,
        meta: {
          name: '机构管理'
        }
      },
      {
        path: 'rolelist',
        component: RoleList,
        meta: {
          name: '权限管理'
        }
      },
      {
        path: 'roleadd',
        component: RoleAdd,
        meta: {
          name: '权限管理'
        }
      },
      {
        path: 'userslist',
        component: UserList,
        meta: {
          name: '账号管理'
        }
      },
      {
        path: 'useradd',
        component: UserAdd,
        meta: {
          name: '账号管理'
        }
      },
      {
        path: 'assetmanage',
        component: assetManage,
        meta: {
          name: '设备台账'
        }
      },
      {
        path: 'assetmanageadd',
        component: assetManageAdd,
        meta: {
          name: '设备台账'
        }
      },
      {
        path: 'assetfailure',
        component: assetFailure,
        meta: {
          name: '设备维修'
        }
      },
      {
        path: 'assetfailuradd',
        component: assetFailurAdd,
        meta: {
          name: '设备维修'
        }
      },
      {
        path: 'assetRun',
        component: assetRun,
        meta: {
          name: '设备监测'
        }
      },
      {
        path: 'assetdetail2',
        component: assetDetail2,
        meta: {
          name: '设备监测'
        }
      },
      {
        path: 'maintenanceMain',
        component: maintenanceMain,
        meta: {
          name: '设备保养'
        }
      },
      {
        path: 'maintenanceMainadd',
        component: maintenanceMainAdd,
        meta: {
          name: '设备保养'
        }
      },
      {
        path: 'maintenanceQa',
        component: maintenanceQa,
        meta: {
          name: '设备质控'
        }
      },
      {
        path: 'maintenanceQaAdd',
        component: maintenanceQaAdd,
        meta: {
          name: '设备质控'
        }
      },
      {
        path: 'complaint',
        component: complaint,
        meta: {
          name: '不良事件/投诉'
        }
      },
      {
        path: 'complaintadd',
        component: complaintAdd,
        meta: {
          name: '不良事件/投诉'
        }
      },
      {
        path: 'device',
        component: device,
        meta: {
          name: '物联设备管理'
        }
      },
      {
        path: 'deviceadd',
        component: deviceAdd,
        meta: {
          name: '物联设备管理'
        }
      },
      {
        path: 'houseAdd',
        component: houseAdd,
        meta: {
          name: '物联网络配置'
        }
      },
      {
        path: 'house',
        component: house,
        meta: {
          name: '物联网络配置'
        }
      },
      {
        path: 'sectionAdd',
        component: sectionAdd,
        meta: {
          name: '科室管理'
        }
      },
      {
        path: 'sectionList',
        component: sectionList,
        meta: {
          name: '科室管理'
        }
      },
      {
        path: 'parkList',
        component: parkList,
        meta: {
          name: '院区管理'
        }
      },
      {
        path: 'parkAdd',
        component: parkAdd,
        meta: {
          name: '院区管理'
        }
      },
      {
        path: 'agencybuildingsList',
        component: agencybuildingsList,
        meta: {
          name: '建筑管理'
        }
      },
      {
        path: 'agencybuildingsAdd',
        component: agencybuildingsAdd,
        meta: {
          name: '建筑管理'
        }
      },
      {
        path: 'assettype',
        component: assettypeList,
        meta: {
          name: '设备类别管理'
        }
      },
      {
        path: 'contractAdd',
        component: contractAdd,
        meta: {
          name: '保修合同管理'
        }
      },
      {
        path: 'contractList',
        component: contractList,
        meta: {
          name: '保修合同管理'
        }
      },
      {
        path: 'benefitanalysis',
        component: benefitAnalysis,
        meta: {
          name: '效益分析'
        }
      },
      {
        path: 'efficiencyanalysis',
        component: efficiencyAnalysis,
        meta: {
          name: '效率分析'
        }
      },
      {
        path: 'exportdata',
        component: exportData,
        meta: {
          name: '导出数据'
        }
      },
      {
        path: 'documentlist',
        component: documentList,
        meta: {
          name: '学习园地'
        }
      },
      {
        path: 'documentadd',
        component: documentAdd,
        meta: {
          name: '学习园地'
        }
      }
    ]
  },
  { path: '*', component: login }
]
const router = new Router({ mode: 'history', base: process.env.BASE_URL, routes: routerarr })
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
