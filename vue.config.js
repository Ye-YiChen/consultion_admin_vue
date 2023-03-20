module.exports = {
  devServer: {
    port: 8888, // 此处修改你想要的端口号
    // proxy: {
    //   '/api': {
    //     target: 'http://xaky.cpolar.cn',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  lintOnSave: false,
  publicPath: '/administer',
}
