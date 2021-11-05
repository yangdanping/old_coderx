import router from './config/router.config';

router.beforeEach((to, from, next) => {
  console.log(to.matched.some((record) => record.meta.isAuth));
  document.title = `${to.matched[0].meta.title} - CoderX`;
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  true ? next() : null;
});

export default router;
