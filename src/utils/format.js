import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

/**
 * 格式化时间
 * @param {array} time 时间
 * @returns 格式化后的时间
 */
export default function timeFormat(time) {
  return dayjs(time).fromNow();
}
