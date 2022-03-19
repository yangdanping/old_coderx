import { cxRequest } from '@/service';
const urlHead = '/article';

export function createArticle(title, content) {
  return cxRequest.post({
    url: `${urlHead}`,
    data: { title, content }
  });
}

export function getList(pageNum, pageSize, tagId) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  return cxRequest.get({
    url: `${urlHead}?offset=${offset}&limit=${limit}&tagId=${tagId}`
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

export function getTags(offset = 0, limit = 10) {
  return cxRequest.get({
    url: `/tag?offset=${offset}&limit=${limit}`
  });
}
export function addTags(articleId, tags) {
  console.log('addTags!!!!!!!!!!!!!!!!!!!!!', articleId, tags);
  return cxRequest.post({
    url: `${urlHead}/${articleId}/tag`,
    data: { tags }
  });
}
export function search(keywords) {
  return cxRequest.get({
    url: `${urlHead}/search?keywords=${keywords}`
  });
}
