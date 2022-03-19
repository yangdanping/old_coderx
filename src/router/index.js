import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: () => '/home'},
  {
    name: 'home',
    path: '/home',
    meta: {title: '首页'},
    component: () => import('../views/home/Home.vue')
  },
  {
    name: 'article',
    path: '/article',
    meta: {title: '文章'},
    component: () => import('../views/article/Article.vue')
  },
  {
    name: 'detail',
    path: '/article/:articleId',
    meta: {title: '文章详情'},
    component: () => import('../views/detail/Detail.vue')
  },
  {
    name: 'edit',
    path: '/edit',
    meta: {title: '写文章'},
    component: () => import('../views/edit/Edit.vue')
  },
  {
    name: 'user',
    path: '/user/:userId',
    meta: {title: '个人空间'},
    component: () => import('../views/user/User.vue')
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: () => import('../views/NotFount.vue')
  }
];

const router = new VueRouter({routes, mode: 'history'});

// 路由前置守卫
router.beforeEach((to, from, next) => {
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  to.matched.forEach((record) => (document.title = record.meta.title ? `${record.meta.title} - CoderX` : 'CoderX'));
  if (from.path !== to.path) {
    store.commit('initPage');
    store.commit('u/initProfile');
  }
  if (to.path === '/article') {
    store.commit('a/initArticle');
    store.commit('c/initComment');
  }
  next();
});

// 路由后置守卫
router.afterEach(() => window.scrollTo(0, 0));

export default router;

// 解决vue-router重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
