import { dxRequest } from '@/network';

export function userLogin(name, password) {
  // body中的数据存在data中
  return dxRequest.post({
    url: '/users/login',
    data: { name, password }
  });
}
