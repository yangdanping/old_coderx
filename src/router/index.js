import Vue from 'vue';
import VueRouter from 'vue-router';
// import localCache from '@/utils/cache';
Vue.use(VueRouter);
const Register = () => import('../views/register/Register.vue');
const Login = () => import('../views/login/Login.vue');
const Home = () => import('../views/home/Home.vue');
const NotFount = () => import('../views/NotFount.vue');

const routes = [
  { path: '/', redirect: '/home' },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: NotFount
  }
];

const router = new VueRouter({ routes, mode: 'history' });
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localCache.getCache('token'); //未登录,token过期等
//   if (to.name === 'notfound') {
//     next();
//     return;
//   }
//   if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
//     console.log(`<路由守卫>检测到路由${from.name} --> ${to.name}`);
//     next({ name: 'login' });
//   } else {
//     next(); //已授权登录,可进入跳转页面
//   }
// });

export default router;
