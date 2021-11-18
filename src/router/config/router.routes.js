const Register = () => import('../../views/register/Register.vue');
const Login = () => import('../../views/login/Login.vue');
const Home = () => import('../../views/home/Home.vue');
const Article = () => import('../../views/article/Article.vue');
const Edit = () => import('../../views/edit/Edit.vue');
const Detail = () => import('../../views/detail/Detail.vue');
const NotFount = () => import('../../views/NotFount.vue');

const routes = [
  { path: '/', redirect: () => '/home' },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'article',
    path: '/article',
    component: Article
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
