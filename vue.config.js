module.exports = {
  outputDir: './build',
  devServer: {
    open: true,
    // 配置proxy-------解决开发阶段跨域访问的问题(注意,只要是改了配置都要重新编译)
    proxy: {
      //这里配置好后要在service的config文件中的BASE_URL改为'/api'
      '/dev-api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/dev-api': '' },
        changeOrigin: true
      },
      '/dev-cms-api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/dev-cms-api': '' },
        changeOrigin: true
      }
    }
  }
};
