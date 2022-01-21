import { cxRequest } from '@/network';
const urlHead = '/article';

export function createArticle(article) {
  return cxRequest.post({
    url: `${urlHead}`,
    data: { ...article }
  });
}

export function getList(pageNum, pageSize) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  return cxRequest.get({
    url: `${urlHead}?offset=${offset}&limit=${limit}`
  });
}

export function getDetail(articleId) {
  return cxRequest.get({
    url: `${urlHead}/${articleId}`
  });
}

export function likeArticle(articleId) {
  return cxRequest.post({
    url: `${urlHead}/${articleId}/like`
  });
}

export function updateArticle(article) {
  const { articleId, title, content } = article;
  return cxRequest.put({
    url: `${urlHead}/${articleId}`,
    data: { title, content }
  });
}

export function removeArticle(articleId) {
  console.log(articleId);
  return cxRequest.delete({
    url: `${urlHead}/${articleId}`
  });
}

export function addView(articleId) {
  return cxRequest.put({
    url: `${urlHead}/${articleId}/view`
  });
}
