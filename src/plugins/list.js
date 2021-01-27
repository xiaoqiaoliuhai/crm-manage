// import api from '@/api/api'
var component = {
  mounted () {
    if (this.$route.query.offset) {
      this.pageShow = false
      this.currentPage = this.offset = Number(this.$route.query.offset)
      this.$nextTick(() => {
        this.pageShow = true
      })
    }
    if (!this.noSearch) {
      this.list()
    } 
  },
  data () {
    return {
      tableData: [],
      offset: 0,
      pagesize: Number(this.$route.query.pagesize) || 20,
      totalCount: 0,
      currentPage: this.current || 1,
      loading: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [10, 20, 30, 50, 100],
      current: Number(this.$route.query.page) || 1,
      pageShow: true
    }
  },
  methods: {
    // 延迟400毫秒查询
    query () {
      setTimeout(queryObject => {
        this.handleCurrentChange()
      }, 400)
    },
    list: function (refresh) {
      this.loading = true
      if (refresh) {
        this.current = 1
        this.offset = 0
      }
      var params = Object.assign({}, this.queryObj, this.listParams)
      for (let key in params) {
        if (params[key] === '' || key === 'requestSwitch') {
          delete params[key]
        }
      }
      params.pageNum = this.offset
      params.pageSize = this.pagesize
      this.tableData = []
      // this.listApiName 自定义api名称
      this.api[this.listApiName || 'list'](params).then(result => {
        this.loading = false
        if (result) {
          this.tableData = result.data.list
          this.totalCount = result.data.totalCount ? result.data.totalCount : 0
        } else {
          this.emptyData = true
          this.totalCount = 0
        }
      }).catch(rj => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.offset = (this.current - 1)
      this.list()
    },
    handleCurrentChange (val) {
      if (val) {
        this.current = val
        this.offset = val
      }
      this.list()
      return this.pageAfter && this.pageAfter(this.pagesize)
    }
  },
  watch: {
    'queryObj.requestSwitch': {
      handler (cur, old) {
        this.list('queryObj.requestSwitch', cur)
      }
    }
  }
}

export default component
