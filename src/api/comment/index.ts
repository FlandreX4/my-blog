import request from "@/utils/request";

/**
 * 获取文章评论列表
 * @param postId 文章id
 * @param currentPage 当前页
 * @returns 评论列表
 */
export function getCommentList(postId: any, currentPage: Number) {
  return request({
    url: `/content/posts/${postId}/comments/tree_view`,
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
    url: `/content/posts/comments`,
    method: "post",
    data: params,
  });
}
