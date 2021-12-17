module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/getCol': {
        target: 'http://n41400z379.zicp.vip/added_cmp_crm_ddsupplier_feeback',
        changeOrigin: true,
        pathRewrite: {
          '^/getCol': '/zicp'
        }
      }
    },
  }

}