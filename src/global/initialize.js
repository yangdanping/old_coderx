import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.less';
import store from '@/store';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
import VEmojiPicker from 'v-emoji-picker';
import {
  MessageBox,Message,
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem ,Badge,Popover,Tooltip,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem} from 'element-ui';

const cpns = [
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem,Badge,Popover,Tooltip,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem];

export default function initialize() {
  this.config.productionTip = false;
  this.use(ElementTiptapPlugin,{lang:'zh'})
  this.use(VEmojiPicker);
  this.prototype.$confirm = MessageBox.confirm;
  this.prototype.$msg = Message;
  store.dispatch('l/loadLoginAction');
  cpns.forEach((cpn) => this.use(cpn));
}
