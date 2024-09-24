import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import Prism from "prismjs";

import hljs from "highlight.js";

VMdPreview.xss.extend({
  // 扩展白名单
  whiteList: {
    style: [],
    script: ["src", "type"],
    document: [],
    alert: []
  },
});

VMdPreview.use(vuepressTheme, {
  Prism,
  Hljs: hljs,
});
VMdPreview.use(createCopyCodePlugin());

export { VMdPreview };
