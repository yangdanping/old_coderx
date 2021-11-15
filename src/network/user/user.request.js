import { cxRequest } from '@/network';

export function getUserInfo(id) {
  return cxRequest.get({
    url: `/user/${id}/profile`
  });
}
