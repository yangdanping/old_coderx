import 'normalize.css';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/atom-one-dark.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.less';
import {
  MessageBox,
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem ,Badge,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem} from 'element-ui';

const cpns = [
  Container, Main, Aside,Row,Col,
  Form, FormItem, Dialog, Input, Button,
  Menu, MenuItem,Badge,
  Avatar,Tag,Pagination,Popconfirm,Drawer,
  Skeleton,SkeletonItem,
  Dropdown,DropdownMenu,DropdownItem];

export default function initialize() {
  this.use(VueHighlightJS);
  this.prototype.$confirm = MessageBox.confirm;
  cpns.forEach((cpn) => this.use(cpn));
}
