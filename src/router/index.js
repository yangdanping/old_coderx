import router from './config/router.config';
import store from '@/store';
router.beforeEach((to, from, next) => {
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  to.matched.forEach((record) => (document.title = record.meta.title ? `${record.meta.title} - CoderX` : 'CoderX'));
  from.path !== to.path && store.commit('initPage');
  true && next();
});

router.afterEach(() => window.scrollTo(0, 0));

export default router;
