import { dxRequest } from '@/network';

export function userLogin(name, password) {
  // body中的数据存在data中
  return dxRequest.post({
    url: '/login',
    data: { name, password }
  });
}
