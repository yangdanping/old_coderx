import { Message } from 'element-ui';
export default function showMsg(key, message, duration = 1500) {
  let type;
  switch (key) {
    case 1:
      type = 'success';
      break;
    case 2:
      type = 'warning';
      break;
    case 3:
      type = 'error';
      break;
    case 4:
      type = 'info';
      break;
    default:
      break;
  }
  return Message({ type, message, duration });
}
