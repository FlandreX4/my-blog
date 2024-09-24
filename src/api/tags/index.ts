import request from "@/utils/request";

/**
 * 根据标签查询文章列表
 *  @param slug 标签名
 */
export function getArticlesByTagName(params: any, slug: string) {
  return request({
    url: `/content/tags/${slug}/posts`,
    method: "get",
    params,
  });
}
