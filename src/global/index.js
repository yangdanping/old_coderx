import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.less';
import store from '@/store';
import { showMsg,cache } from '@/utils';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
// import VEmojiPicker from 'v-emoji-picker';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {
  MessageBox,
  Container,Main,Aside,Row,Col,
  Form,FormItem,Input, Button,
  Menu,MenuItem,Tabs,TabPane,
  Dialog,Backtop,Badge,Popover,
  Tooltip,Avatar,Tag,
  Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Image,Dropdown, DropdownMenu,DropdownItem
} from 'element-ui';

const cpns = [
  Container,Main,Aside,Row,Col,
  Form,FormItem,Input, Button,
  Menu,MenuItem,Tabs,TabPane,
  Dialog,Backtop,Badge,Popover,
  Tooltip,Avatar,Tag,
  Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Image,Dropdown, DropdownMenu,DropdownItem
];

export default function init() {
  this.config.productionTip = false;
  this.use(ElementTiptapPlugin, { lang: 'zh' });
  this.use(CollapseTransition);
  this.prototype.$confirm = MessageBox.confirm;
  this.prototype.$msg = showMsg;
  cache.getCache('token') && store.dispatch('u/checkAuthAction');
  store.dispatch('loadLoginAction');
  cpns.forEach((cpn) => this.use(cpn));
}
