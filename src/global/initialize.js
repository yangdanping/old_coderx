// import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.less';
import store from '@/store';
import {
  MessageBox,
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem ,Badge,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem} from 'element-ui';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
const cpns = [
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem,Badge,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem];

export default function initialize() {
  this.config.productionTip = false;
  this.use(ElementTiptapPlugin,{lang:'zh'})
  this.prototype.$confirm = MessageBox.confirm;
  store.dispatch('l/loadLoginAction');
  cpns.forEach((cpn) => this.use(cpn));
}
