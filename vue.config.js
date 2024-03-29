module.exports = {
  outputDir: './build',
  devServer: {
    open: true,
    // 配置proxy-------解决开发阶段跨域访问的问题(注意,只要是改了配置都要重新编译)
    proxy: {
      //这里配置好后要在service的config文件中的BASE_URL改为'/api'
      '/api': {
        target: 'http://119.91.150.141:9000', //接口的前缀
        pathRewrite: { '^/api': '' }, //重写路径
        changeOrigin: true //虚拟的站点需要更管origin
      },
      '/dev-api': {
        target: 'http://localhost:9000', //接口的前缀
        pathRewrite: { '^/dev-api': '' }, //重写路径
        changeOrigin: true //虚拟的站点需要更管origin
      },
      '/dev-cms-api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/dev-cms-api': '' },
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compiler = require('vue-template-babel-compiler');
        return options;
      });
  }
};
