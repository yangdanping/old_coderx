class Interceptor {
  static reqSuccess(config) {
    // console.log('<全局请求拦截器>:请求拦截成功');
    return config;
  }
  static reqFailure(err) {
    console.log('<全局请求拦截器>:请求拦截失败');
    return Promise.reject(err);
  }
  static resSuccess(res) {
    // console.log('<全局响应拦截器>:响应拦截成功');
    const realData = res.data;
    return realData; //返回res.data就保证了我拿到的res就是我想要的数据了
  }
  static resFailure(err) {
    console.log('<全局响应拦截器>:响应拦截失败', err);
    return Promise.reject(err);
    // return err;
  }
}

export default Interceptor;
