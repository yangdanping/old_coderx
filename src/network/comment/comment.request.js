import { cxRequest } from '@/network';
const urlHead = '/comment';

export function getComment(articleId) {
  return cxRequest.get({
    url: `${urlHead}?articleId=${articleId}`
  });
}

export function addComment(commentInfo) {
  const { articleId, content } = commentInfo;
  return cxRequest.post({
    url: `${urlHead}`,
    data: { articleId, content }
  });
}

export function updateComment(commentInfo) {
  const { commentId, content } = commentInfo;
  return cxRequest.put({
    url: `${urlHead}/${commentId}`,
    data: { content }
  });
}

export function removeComment(commentId) {
  return cxRequest.delete({
    url: `${urlHead}/${commentId}`
  });
}

export function addReply(replyInfo) {
  const { isReplyToComment, articleId, content, commentId, replyId } = replyInfo;
  let url = null;
  let data = null;
  if (isReplyToComment) {
    url = `${urlHead}/${commentId}/reply`;
    data = { articleId, content };
  } else {
    url = !replyId ? `/reply` : `/reply/${replyId}/reply`;
    data = { articleId, commentId, content };
  }
  return cxRequest.post({ url, data });
}

export function like(payload) {
  const { commentId, replyId } = payload;
  const url = commentId ? `${urlHead}/${commentId}/like` : `/reply/${replyId}/like`;
  return cxRequest.post({ url });
}
