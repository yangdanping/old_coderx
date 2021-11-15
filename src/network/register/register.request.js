import { cxRequest } from '@/network';

export function userRegister(name, password) {
  // body中的数据存在data中
  return cxRequest.post({
    url: '/user/register',
    data: { name, password }
  });
}
