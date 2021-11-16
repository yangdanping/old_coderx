let BASE_URL = null;
const TIME_OUT = 15000;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api-dev';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api';
}
export { BASE_URL, TIME_OUT };

//开发阶段已配置proxy选项解决跨域问题,生产环境到时再说
/* 以上是根据process.env.NODE_ENV(我们项目用的方式)
process.env.NODE_ENV会根据DefinePlugin注入不同的值
开发环境:development 生产环境:prodoct 测试环境:test
官网原话:注意!!!只有NODE_ENV/BASE_URL/以VUE_APP_开头的变量将通过
webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
这是为了避免意外公开机器上可能具有相同名称的私钥
到时npm run serve 就会使用开发环境下.env.development的环境变量
到时npm run build 就会使用生产环境下.env.production的环境变量
*/
