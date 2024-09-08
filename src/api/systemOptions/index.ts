import request from "@/utils/request";

/**
 * 获取系统设置
 */
export function getSystemOptions() {
  return request({
    url: `/content/options/map_view`,
    method: "get",
  });
}
