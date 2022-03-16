import '@/assets/css/base.less';
import 'element-tiptap/lib/index.css';
import store from '@/store';
import { cache } from '@/utils';
import { ElementTiptapPlugin } from 'element-tiptap';
import registerEl from './register/register-element-ui';

export default function init() {
  this.config.productionTip = false;
  registerEl.call(this);
  this.use(ElementTiptapPlugin, { lang: 'zh' });
  cache.getCache('token') && store.dispatch('u/checkAuthAction'); //每次刷新验证token
  store.dispatch('loadLoginAction');
}
