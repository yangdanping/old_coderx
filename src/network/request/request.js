import axios from 'axios';

class DXRequest {
  constructor(config) {
    this.instance = axios.create(config); //this.instance才是其创建的实例
    this.interceptors = config.interceptors;
    console.log(this.interceptors);
    [this.myReqIn, this.myReqInC, this.myResIn, this.myResInC] = [
      this.interceptors.requestInterceptor,
      this.interceptors.requestInterceptorCatch,
      this.interceptors.responseInterceptor,
      this.interceptors.responseInterceptorCatch
    ];
    // 从config中取出的拦截器是对应的实例的拦截器(只属于我DxRequest实例的拦截器,在demo中说了request/response拦截器都有它的响应成功/失败拦截)
    this.myReqIn ? this.instance.interceptors.request.use(this.myReqIn, this.myReqInC) : null;
    this.myResIn ? this.instance.interceptors.response.use(this.myResIn, this.myResInC) : null;
    // 全局拦截器(一旦new DXRequest则立即执行)-------------------
    this.instance.interceptors.request.use(
      config => {
        console.log('<全局请求拦截器>:请求拦截成功');
        return config; //注意!!!拦截后你得把config原封不动得给别人还回去
      },
      err => {
        console.log('<全局请求拦截器>:请求拦截失败');
        return err;
      }
    );
    this.instance.interceptors.response.use(
      res => {
        console.log('<全局响应拦截器>:响应拦截成功');
        const realData = res.data;
        return realData; //返回res.data就保证了我拿到的res就是我想要的数据了
      },
      err => {
        console.log('<全局响应拦截器>:响应拦截失败');
        return err;
      }
    );
  }
  async request(config) {
    try {
      const result = await this.instance.request(config);
      return result;
    } catch (error) {
      return error;
    }
    // return new Promise((resolve, reject) => {
    //   this.instance.request(config).then(res => { //pending状态
    //       resolve(res); //fulfilled状态
    //     }).catch(err => {
    //       reject(err); //rejected状态
    //       return err;
    //     });
    // });
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
  patch(config) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default DXRequest;
