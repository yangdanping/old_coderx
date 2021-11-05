import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router.routes';
Vue.use(VueRouter);

// 解决vue-router重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const router = new VueRouter({ routes, mode: 'history' });

export default router;
