<template>
    <div>
        <el-select v-model="select" placeholder="请选择" clearable>
            <el-option v-for="item in options" :key="item.id" :label="item.assetInfo" :value="item.id">
              <span style="float: left">{{ item.assetInfo }}</span>
            </el-option>
        </el-select>
    </div>

</template>
<script>
import api from '@/api/api'
export default {
  props: {
    value: {
      default: ''
    }
  },
  data () {
    return {
      options: [
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let params = {
          pageNum: 1,
          pageSize: 20000
        }
        let data = await api.assetList(params)
        data.data.list.forEach(item => {
          item.assetInfo = `${item.name}（${item.model || '-'} ${item.sn || '-'} ${item.vender || '-'} ${item.ctime.split(' ')[0] || '-'} ）`
        })
        this.options = data.data.list
      } catch (err) {
        // empty
      }
    }
  },
  computed: {
    select: {
      set (newVal) {
        this.$emit('input', newVal)
      },
      get () {
        return this.value
      }
    }
  }
}
</script>
