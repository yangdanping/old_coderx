import { Message } from 'element-ui';
const duration = 1500;
class Msg {
  static showSuccess(message) {
    return Message({ message, type: 'success', duration });
  }
  static showWarn(message) {
    return Message({ message, type: 'warning', duration });
  }
  static showFail(message) {
    return Message({ message, type: 'error', duration });
  }
  static showInfo(message) {
    return Message({ message, type: 'info', duration });
  }
}
export default Msg;
