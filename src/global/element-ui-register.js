import 'element-ui/lib/theme-chalk/index.css';
import { Form, FormItem, Input, Button, Menu, MenuItem } from 'element-ui';

const cpns = [Form, FormItem, Input, Button, Menu, MenuItem];

export default function registerEl() {
  cpns.forEach((cpn) => this.use(cpn));
}
