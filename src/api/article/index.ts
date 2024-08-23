import request from "@/utils/request";

/**
 * 查看文章列表
 * @param params 查询条件
 * @returns 文章列表
 */
export function getArticleList(params: any) {
  return request({
    url: "/article/list",
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
      slug: slug
    },
  });
}

/**
 * 查看推荐文章
 * @returns 推荐文章
 */
export function getArticleRecommend() {
  return request({
    url: "/article/recommend",
    method: "get",
  });
}

/**
 * 搜索文章
 * @returns 文章列表
 */
export function searchArticle(keyword: any) {
  return request({
    url: "/article/search",
    method: "get",
    params: {
      keyword,
    },
  });
}

/**
 * 点赞文章
 * @param articleId 文章id
 */
export function likeArticle(articleId: any) {
  return request({
    url: `/article/${articleId}/like`,
    method: "post",
  });
}
