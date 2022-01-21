import { cxRequest } from '@/network';
const urlHead = '/collect';

export function getCollect(pageNum = 0, pageSize = 10) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  return cxRequest.get({
    url: `${urlHead}?offset=${offset}&limit=${limit}`
  });
}

export function addCollect(collectName) {
  console.log(collectName);
  return cxRequest.post({
    url: `${urlHead}`,
    data: {
      name: collectName
    }
  });
}
