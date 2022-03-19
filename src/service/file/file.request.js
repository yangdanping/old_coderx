import { cxRequest } from '@/service';
const urlHead = '/upload';

export function uploadPicture(data) {
  return cxRequest.post({
    url: `${urlHead}/picture`,
    data
  });
}
// export function uploadPicture(data, articleId = 1) {
//   return cxRequest.post({
//     url: `${urlHead}/picture?articleId=${articleId}`,
//     data
//   });
// }

export function uploadAvatar(payload) {
  const { action, file } = payload;
  const fd = new FormData();
  fd.append('avatar', file);
  return cxRequest.post({
    url: `${urlHead}/${action}`,
    data: fd
  });
}

export function addPictureForArticle(articleId, uploaded) {
  return cxRequest.post({
    url: `${urlHead}/picture/${articleId}`,
    data: { uploaded }
  });
}
