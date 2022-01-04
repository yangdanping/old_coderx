export default function debounce(fn, delay, immediate = false) {
  // 1.定义一个定时器,保存上一次的定时器
  let timer = null;
  let isInvoke = false; //定义个自由变量控制我们在中间停掉后下一次也可立即执行函数内部改变immediate不好,因为其应该由外部决定
  // 2.真正执行的函数
  return function (...args) {
    // 取消上一次的定时器
    timer && clearTimeout(timer);
    // 判断是否需要立即执行(先判断isInvoke为false说明之前没有立即执行过)
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoke = false;
      }, delay);
    }
  };
}
