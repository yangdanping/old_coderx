const Register = () => import('../../views/register/Register.vue');
const Login = () => import('../../views/login/Login.vue');
const Main = () => import('../../views/main/Main.vue');
const Edit = () => import('../../views/edit/Edit.vue');
const Detail = () => import('../../views/detail/Detail.vue');
const NotFount = () => import('../../views/NotFount.vue');

const routes = [
  { path: '/', redirect: () => '/main' },
  {
    path: '/main',
    component: Main,
    //如果是我们子组件就不能加/,它会自动在后面拼接上/ (注意,若有子路由则父路由不要命名)
    children: [
      { path: '', redirect: 'home' },
      {
        name: 'home',
        meta: { title: '首页' },
        path: 'home',
        component: () => import('../../views/main/home/Home.vue')
      },
      {
        name: 'article',
        meta: { title: '文章' },
        path: 'article',
        component: () => import('../../views/main/article/Article.vue')
      }
    ]
  },
  {
    name: 'detail',
    path: '/article/:articleId',
    meta: { title: '文章详情' },
    component: Detail
  },
  {
    name: 'edit',
    path: '/edit',
    meta: { title: '写文章' },
    component: Edit
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
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: NotFount
  }
];
export default routes;
