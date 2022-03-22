import { cxRequest } from '@/service';
const urlHead = '/user';

export function checkAuth() {
  // body中的数据存在data中
  return cxRequest.get({
    url: `${urlHead}/checkAuth`
  });
}
export function userRegister(name, password) {
  // body中的数据存在data中
  return cxRequest.post({
    url: `${urlHead}/register`,
    data: { name, password }
  });
}

export function userLogin(name, password) {
  // body中的数据存在data中
  return cxRequest.post({
    url: `${urlHead}/login`,
    data: { name, password }
  });
}

export function getUserInfo(id) {
  return cxRequest.get({
    url: `${urlHead}/${id}/profile`
  });
}

export function getLiked(id) {
  return cxRequest.get({
    url: `${urlHead}/${id}/like`
  });
}

export function getFollow(id) {
  return cxRequest.get({
    url: `${urlHead}/${id}/follow`
  });
}

export function follow(id) {
  return cxRequest.post({
    url: `${urlHead}/${id}/follow`
  });
}

export function getArticle(userId, pageNum, pageSize) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  return cxRequest.get({
    url: `${urlHead}/${userId}/article?offset=${offset}&limit=${limit}`
  });
}
export function getComment(userId, pageNum, pageSize) {
  const offset = pageNum <= 1 ? 0 : (pageNum - 1) * pageSize;
  const limit = pageSize;
  return cxRequest.get({
    url: `${urlHead}/${userId}/comment?offset=${offset}&limit=${limit}`
  });
}

export function getArtcileByCollectId(userId, collectId, offset = 0, limit = 10) {
  return cxRequest.get({
    url: `${urlHead}/${userId}/collect?collectId=${collectId}&offset=${offset}&limit=${limit}`
  });
}

export function updateProfile(profile) {
  return cxRequest.put({
    url: `${urlHead}/profile`,
    data: profile
  });
}

export function reportUser(userId, report) {
  return cxRequest.post({
    url: `${urlHead}/${userId}/report`,
    data: report
  });
}

export function feedback(userId, content) {
  return cxRequest.post({
    url: `${urlHead}/${userId}/feedback`,
    data: { content }
  });
}
