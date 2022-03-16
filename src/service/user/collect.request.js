import { cxRequest } from '@/service';
const urlHead = '/collect';

export function getCollect(userId, pageNum = 0, pageSize = 10) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  console.log('getCollect', userId);
  return cxRequest.get({
    url: `${urlHead}/${userId}?offset=${offset}&limit=${limit}`
  });
}

export function addCollect(collectName) {
  return cxRequest.post({
    url: `${urlHead}`,
    data: {
      name: collectName
    }
  });
}

export function addToCollect({ collectId, articleId }) {
  return cxRequest.post({
    url: `${urlHead}/${collectId}`,
    data: {
      articleId
    }
  });
}
