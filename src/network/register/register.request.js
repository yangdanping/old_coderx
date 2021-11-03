import { dxRequest } from '@/network';

export function userRegister(name, password) {
  // body中的数据存在data中
  return dxRequest.post({
    url: '/register',
    data: { name, password }
  });
}
