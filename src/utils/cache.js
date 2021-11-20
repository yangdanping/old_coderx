/* 当我准备把一些东西把他封装到一块时,一般选择类,这样封装性更强一点
new出来对象并导出去,这样外面就可以拿到对象去使用我们这里的属性/方法 */

class Cache {
  /* setCache--------进行数据缓存
  isLocalStorage判断是否是本地缓存,若true则是,false则进行sessionStorage
  注意!默认localStorage的value参数要求是字符串类型,
  但是我们传过来有可能是对象/数组...,用JSON.stringify统一转成字符串类型(序列化 obj --> string)在进行缓存
   */
  setCache(key, value, isSessionStorage) {
    isSessionStorage ? window.sessionStorage.setItem(key, JSON.stringify(value)) : window.localStorage.setItem(key, JSON.stringify(value));
  }
  // getCache--------获取数据缓存
  getCache(key, isSessionStorage) {
    // 由于上面stringify了,所有这里拿到的一切value都是string类型的,这里用JSON.parse由JSON字符串转换为JSON对象(反序列化 string --> obj,因为已经stringify所以不怕转字符串报错)
    const value = isSessionStorage ? window.sessionStorage.getItem(key) : window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  // removeCache--------删除数据缓存
  removeCache(key, isSessionStorage) {
    isSessionStorage ? window.sessionStorage.removeItem(key) : window.localStorage.removeItem(key);
  }
  // clearCache--------清除所有数据缓存
  clearCache() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
}

export default new Cache();
