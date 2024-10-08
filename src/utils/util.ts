import dayjs from "dayjs";
import { useRoute } from "vue-router";

/**
 * time ago
 * @param {*} time
 */
export function timeAgo(time: number) {
  const currentTime = new Date().getTime();
  const between = currentTime - time;
  const days = Math.floor(between / (24 * 3600 * 1000));
  if (days === 0) {
    const leave1 = between % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    if (hours === 0) {
      const leave2 = leave1 % (3600 * 1000);
      const minutes = Math.floor(leave2 / (60 * 1000));
      if (minutes === 0) {
        const leave3 = leave2 % (60 * 1000);
        const seconds = Math.round(leave3 / 1000);
        return seconds + " 秒前";
      }
      return minutes + " 分钟前";
    }
    return hours + " 小时前";
  }
  if (days < 0) return "刚刚";
  if (days < 7) {
    return days + " 天前";
  } else {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
  }
}

/**
 * html转义处理还原
 * @param {*} html
 */
export function unescapeHtml(html: any) {
  return html
    .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * 判断远程链接
 * @param str
 * @returns { Boolean }
 */
export function isUrl(str: string) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(str);
}

/**
 * 拼接图片链接
 * @param str
 * @returns { Boolean }
 */
export function getThumbnail(thumbnail: string) {
  const serveBaseUrl = import.meta.env.VITE_SERVICE_BASE_URL;
  if (!thumbnail) return;
  return isUrl(thumbnail) ? thumbnail : serveBaseUrl + thumbnail;
}

/**
 * 获取元素距离顶部的offstTop
 * @param dom //元素
 * @param count //初始值
 * @param rootTagName //根节点名
 * @returns { number }
 */
export function getOffsetTop(dom: any, count: any = 0, rootTagName: any = "BODY"): number {
  if (dom && dom?.tagName != rootTagName) {
    return getOffsetTop(dom.offsetParent, dom.offsetTop + count);
  } else {
    return count;
  }
}

/**
 * 设置浏览器头部标题
 * @param title //标题
 */
export function setHeadTitle(title: any = undefined) {
  const route = useRoute();
  document.title = title ? title : route.name;
}

/**
 * 判断移动端
 */
export function isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return flag;
 }
