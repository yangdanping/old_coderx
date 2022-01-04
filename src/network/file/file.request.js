import { cxRequest } from '@/network';
const urlHead = '/upload';

export function uploadPicture(data, articleId = 1) {
  return cxRequest.post({
    url: `${urlHead}/picture?articleId=${articleId}`,
    data
  });
}
