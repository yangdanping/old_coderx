const Home = () => import('../../views/home/Home.vue');
const Article = () => import('../../views/article/Article.vue');
const Detail = () => import('../../views/detail/Detail.vue');
const Edit = () => import('../../views/edit/Edit.vue');
const User = () => import('../../views/user/User.vue');
const NotFount = () => import('../../views/NotFount.vue');
const routes = [
  { path: '/', redirect: () => '/home' },
  {
    name: 'home',
    path: '/home',
    meta: { title: '首页' },
    component: Home
  },
  {
    name: 'article',
    path: '/article',
    meta: { title: '文章' },
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
    name: 'user',
    path: '/user/:userId',
    meta: { title: '个人空间' },
    component: User
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)',
    component: NotFount
  }
];
export default routes;
