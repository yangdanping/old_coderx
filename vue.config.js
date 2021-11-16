const path = require('path');
module.exports = {
  outputDir: './build',
  devServer: {
    open: true,
    // 配置proxy-------解决开发阶段跨域访问的问题(注意,只要是改了配置都要重新编译)
    proxy: {
      //这里配置好后要在service的config文件中的BASE_URL改为'/api'
      '^/api': {
        target: 'http://localhost:8000',
        // target: 'http://119.91.150.141:8000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
