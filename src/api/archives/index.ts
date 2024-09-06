import request from "@/utils/request";

/**
 * 获取档案列表
 */
export function getArchives() {
  return request({
    url: `/content/archives/months`,
    method: "get",
  });
}

