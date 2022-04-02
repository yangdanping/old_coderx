import CXRequest from '@/global/request';
import { cache } from '@/utils';
import { BASE_URL, TIME_OUT } from '@/global/config';
const cxRequest = new CXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //拦截器本质上是一个个函数,new CXRequest时其构造器自动执行(在CXRequest中初始化axios)
    reqSuccess: (config) => {
      // console.log('<实例请求拦截器>', config);
      //若已登录(授权)成功,则说明token已保存缓存中,当用户有评论/点赞等操作时,会到这里取token,到服务器那里经过verifyAuth中间件验证
      const token = cache.getCache('token');
      token ? (config.headers.authorization = `Bearer ${token}`) : null; //若有token就拼接一下信使变成真正的token放到请求头里,到时候验证权限就通过jwt.justfiy来验证
      // console.log(config.headers.authorization);
      return config;
    },
    reqFailure: (err) => {
      // const errMsg = Object.getOwnPropertyDescriptors(err).response.value.data;
      // console.log(`<实例响应拦截器>捕获错误:${errMsg}`);
      return err;
    },
    resSuccess: (config) => {
      // console.log('<实例响应拦截器>', config);
      return config;
    },
    resFailure: (err) => {
      const errMsg = Object.getOwnPropertyDescriptors(err).response.value.data;
      console.log(`<实例响应拦截器>捕获错误:`, errMsg);
      return errMsg;
    }
  }
});

// const cmsRequest = new CXRequest({
//   baseURL: '/dev-cms-api',
//   timeout: TIME_OUT,
//   interceptors: {
//     //拦截器本质上是一个个我们这样传入的函数,
//     reqSuccess: (config) => config,
//     reqFailure: (err) => err,
//     resSuccess: (config) => config,
//     resFailure: (err) => err
//   }
// });

export { cxRequest };
