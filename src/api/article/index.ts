import request from "@/utils/request";

/**
 * 查看文章列表
 * @param params 查询条件
 * @returns 文章列表
 */
export function getArticleList(params: any) {
  return request({
    url: "/content/posts",
    method: "get",
    params,
  });
}

/**
 * 查看文章
 * @param articleId 文章id
 */
export function getArticleById(articleId: any) {
  return request({
    url: `/content/posts/slug/${articleId}`,
    method: "get",
  });
}

/**
 * 查看文章
 * @param slug 文章名称
 */
export function getArticleByName(slug: any) {
  return request({
    url: `/content/posts/slug`,
    method: "get",
    params: {
      slug: slug,
    },
  });
}

/**
 * 获取上一篇文章
 * @param postId 文章Id
 */
export function getPrevArticle(postId: any) {
  return request({
    url: `/content/posts/${postId}/prev`,
    method: "get",
  });
}

/**
 * 获取下一篇文章
 * @param postId 文章Id
 */
export function getNextArticle(postId: any) {
  return request({
    url: `/content/posts/${postId}/next`,
    method: "get",
  });
}
