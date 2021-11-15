import CXRequest from './request/request';
import localCache from '@/utils/cache';
import { BASE_URL, TIME_OUT } from '@/global/config';
const cxRequest = new CXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //拦截器本质上是一个个我们这样传入的函数,由于new CXRequest时其构造器自动执行,所以在那边已创建axios的
    requestInterceptor: (config) => {
      //若已登陆(授权)成功,则说明token已保存缓存中,当用户有评论/点赞等操作时,会到这里取token,到服务器那里经过verifyAuth中间件验证
      const token = localCache.getCache('token');
      token ? (config.headers.authorization = `Bearer ${token}`) : null; //若有token就拼接一下信使变成真正的token放到请求头里,到时候验证权限就通过jwt.justfiy来验证
      console.log('<实例请求拦截器>', config);
      return config;
    },
    requestInterceptorCatch: (err) => {
      const errMsg = Object.getOwnPropertyDescriptors(err).response.value.data;
      console.log(`<实例响应拦截器>捕获错误:${errMsg}`);
      return err;
    },
    responseInterceptor: (config) => {
      console.log('<实例响应拦截器>', config);
      return config;
    },
    responseInterceptorCatch: (err) => {
      const errMsg = Object.getOwnPropertyDescriptors(err).response.value.data;
      console.log(`<实例响应拦截器>捕获错误:${errMsg}`);
      return err;
    }
  }
});

export { cxRequest };
