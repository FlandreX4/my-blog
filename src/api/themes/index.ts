import request from "@/utils/request";

/**
 * 获取当前激活主题设置 
 */
export function getThemeSettings() {
  return request({
    url: `/content/themes/activation/settings`,
    method: "get",
  });
}

