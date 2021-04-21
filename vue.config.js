
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
    proxy: 'http://smart-hcp.com'
    //proxy: 'http://fhhy-jn-0001.51vip.biz:25874'

  },
  runtimeCompiler: true
}
