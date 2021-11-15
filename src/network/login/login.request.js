import { cxRequest } from '@/network';

export function userLogin(name, password) {
  // body中的数据存在data中
  return cxRequest.post({
    url: '/user/login',
    data: { name, password }
  });
}
