import { cxRequest } from '@/network';

export function createArticle(article) {
  return cxRequest.post({
    url: '/article',
    data: { ...article }
  });
}
export function getList(pageNum, pageSize) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const size = pageSize;
  return cxRequest.get({
    url: `/article?offset=${offset}&size=${size}`
  });
}

export function getDetail(articleId) {
  return cxRequest.get({
    url: `/article/${articleId}`
  });
}

export function getComment(articleId) {
  return cxRequest.get({
    url: `/comment?articleId=${articleId}`
  });
}

export function getLiked(userId) {
  return cxRequest.get({
    url: `/user/${userId}/like`
  });
}

export function likeArticle(articleId) {
  return cxRequest.post({
    url: `/article/${articleId}/like`
  });
}
