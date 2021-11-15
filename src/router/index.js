import router from './config/router.config';
// 这个组件需要上车，我们先设立一个车站
// import bus from "@/utils/bus";
router.beforeEach((to, from, next) => {
  to.matched.forEach((record) => {
    document.title = record.meta.title ? `${record.meta.title} - CoderX` : 'CoderX';
  });
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  true ? next() : null;
});

export default router;
