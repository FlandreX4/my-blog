import request from "@/utils/request";

/**
 * 获取博主信息
 */
export function getUserInfo() {
  return request({
    url: `/content/users/profile`,
    method: "get",
  });
}

