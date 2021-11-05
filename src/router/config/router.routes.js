const Register = () => import('../../views/register/Register.vue');
const Login = () => import('../../views/login/Login.vue');
const Home = () => import('../../views/home/Home.vue');
const NotFount = () => import('../../views/NotFount.vue');

const routes = [
  {
    path: '/',
    redirect: (to) => {
      return '/home';
    }
  },
  {
    name: 'register',
    path: '/register',
    meta: { title: '注册' },
    component: Register
  },
  {
    name: 'login',
    path: '/login',
    meta: { title: '登陆' },
    component: Login
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '首页' },
    //如果是我们子组件就不能加/,它会自动在后面拼接上/ (注意,若有子路由则父路由不要命名)
    children: [
      { path: '', redirect: 'main' },
      {
        name: 'home-main',
        path: 'main',
        component: () => import('../../views/home/cpns/HomeMain.vue')
      },
      {
        path: 'article',
        component: () => import('../../views/home/cpns/HomeAticle.vue')
      }
    ]
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: NotFount
  }
];
export default routes;
