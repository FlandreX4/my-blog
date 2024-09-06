import request from "@/utils/request";

/**
 * 查看列表
 * @param params 查询条件
 * @returns 列表
 */
export function getJournals(params: any) {
  return request({
    url: "/content/journals",
    method: "get",
    params,
  });
}

/**
 * 获取评论列表
 * @param journalId id
 * @param currentPage 当前页
 * @returns 评论列表
 */
export function getCommentList(journalId: any, currentPage: Number) {
  return request({
    url: `/content/journals/${journalId}/comments/tree_view`,
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
    url: `/content/journals/comments`,
    method: "post",
    data: params,
  });
}
