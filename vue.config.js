
module.exports = {
  devServer: {
    // proxy: {
    //   '/manage': {
    //     target: 'http://47.104.232.127:8080/', // 对应自己的接口
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/manage': '/'
    //     }
    //   }
    // }
    proxy: 'http://47.115.23.96'
    //proxy: 'http://fhhy-jn-0001.51vip.biz:25874'
    // 账号:superservice
    // 密码:cuta083001#
    // IP：47.115.23.96
  },
  runtimeCompiler: true
}
