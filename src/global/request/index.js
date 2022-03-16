import axios from 'axios';
import Interceptor from './interceptor';
class CXRequest {
  constructor(config) {
    console.log('我是CXRequest的构造器,每次用new调用CXRequest我就会初始化一次');
    this.instance = axios.create(config); //this.instance才是其创建的实例
    // ★全局拦截器-------------------
    this.instance.interceptors.request.use(Interceptor.reqSuccess, Interceptor.reqFailure);
    this.instance.interceptors.response.use(Interceptor.resSuccess, Interceptor.resFailure);
    // ★实例拦截器-------------------
    this.instance.interceptors.request.use(config.interceptors.reqSuccess, config.interceptors.reqFailure);
    this.instance.interceptors.response.use(config.interceptors.resSuccess, config.interceptors.resFailure);
  }

  async request(config) {
    const result = await this.instance.request(config);
    return result;
  }
  get(config) {
    return this.request({ ...config, method: 'GET' });
  }
  post(config) {
    return this.request({ ...config, method: 'POST' });
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' });
  }
  put(config) {
    return this.request({ ...config, method: 'PUT' });
  }
}

export default CXRequest;
