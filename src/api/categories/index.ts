import request from "@/utils/request";

/**
 * 根据类别查询文章列表
 *  @param slug 类别
 */
export function getArticlesByCategory(params: any, slug: string) {
  return request({
    url: `/content/categories/${slug}/posts`,
    method: "get",
    params,
  });
}
