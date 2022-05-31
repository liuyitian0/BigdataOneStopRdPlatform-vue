module.exports = {
  lintOnSave: false,
  devServer: {
    // proxy: {
    //   '/getCol': {
    //     target: 'http://n41400z379.zicp.vip/added_cmp_crm_ddsupplier_feeback',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/getCol': '/zicp'
    //     }
    //   }
    // },
  },
  devServer: {
    proxy: {
      '/api': {//请求的前缀 类似ngnix 转发的前缀
        target: 'http://localhost:8080',//转发服务器对象端口
        pathRewrite: { '^/api': '' },//请求到服务器的把/api的前缀去掉
        // ws: true,//用于支持websocket
        // changeOrigin: true//用于控制请求头中的host值
      }
    }
  }
}