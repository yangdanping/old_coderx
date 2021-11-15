import CXRequest from './request/request';
import localCache from '@/utils/cache';
const cxRequest = new CXRequest({
  baseURL: '/api',
  timeout: 5000,
  interceptors: {
    //拦截器本质上是一个个我们这样传入的函数,由于new CXRequest时其构造器自动执行,所以在那边已创建axios的
    requestInterceptor: (config) => {
      const token = localCache.getCache('token'); //从缓存里拿到我们在action里保存的token,
      token ? (config.headers.Authorization = `Bearer ${token}`) : null; //若有token就拼接一下信使变成真正的token放到请求头里,到时候验证权限就通过jwt.justfiy来验证
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
