import request from "@/utils/request";

/**
 * 获取关于页面
 */
export function getAbout(slug: string) {
  return request({
    url: `/content/sheets/slug`,
    method: "get",
    params: {
      slug: slug,
    },
  });
}

/**
 * 获取评论列表
 * @param postId id
 * @param currentPage 当前页
 * @returns 评论列表
 */
export function getCommentList(postId: any, currentPage: Number) {
  return request({
    url: `/content/sheets/${postId}/comments/tree_view`,
    method: "get",
    params: {
      page: currentPage,
    },
  });
}

/**
 * 发表评论
 * @param params 评论表单参数
 */
export function addComment(params: any) {
  return request({
    url: `/content/sheets/comments`,
    method: "post",
    data: params,
  });
}
