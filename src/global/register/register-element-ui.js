import 'element-ui/lib/theme-chalk/index.css';
import {
  MessageBox,
  Container,Main,Aside,Row,Col,
  Form,FormItem,Input, Button,
  Menu,MenuItem,Tabs,TabPane,Upload,
  Dialog,Backtop,Badge,Popover,CheckboxGroup,Checkbox,
  Tooltip,Avatar,Tag,Select,Option,Card,
  Pagination,Popconfirm,Drawer,Steps,Step,
  Skeleton,SkeletonItem,Radio,Cascader,
  Image,Dropdown, DropdownMenu,DropdownItem
} from 'element-ui';

const cpns = [
  Container,Main,Aside,Row,Col,
  Form,FormItem,Input, Button,
  Menu,MenuItem,Tabs,TabPane,Upload,
  Dialog,Backtop,Badge,Popover,CheckboxGroup,Checkbox,
  Tooltip,Avatar,Tag,Select,Option,Card,
  Pagination,Popconfirm,Drawer,Steps,Step,
  Skeleton,SkeletonItem,Radio,Cascader,
  Image,Dropdown, DropdownMenu,DropdownItem
];
import { Msg } from '@/utils';

export default function registerEl() {
  this.prototype.$confirm = MessageBox.confirm;
  ['showSuccess', 'showWarn', 'showFail', 'showInfo'].forEach((type) => (this.prototype[`$${type}`] = Msg[type]));
  for (const cpn of cpns) {
    this.component(cpn.name, cpn);
  }
}
