import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "首页",
      component: () => import("@/views/Home/index.vue"),
    },
    {
      path: "/archives",
      name: "文章归档",
      component: () => import("@/views/Archives/index.vue"),
    },
    {
      path: "/archives/:name",
      name: "文章",
      component: () => import("@/views/Article/index.vue"),
    },
    {
      path: "/categories/:name",
      name: "分类",
      component: () => import("@/views/Categories/index.vue"),
    },
    {
      path: "/tags/:name",
      name: "标签",
      component: () => import("@/views/Tags/index.vue"),
    },
    {
      path: "/search/:name",
      name: "搜索",
      component: () => import("@/views/Search/index.vue"),
    },
    {
      path: "/about",
      name: "关于",
      component: () => import("@/views/About/index.vue"),
    },
    {
      path: "/journals",
      name: "日志",
      component: () => import("@/views/Journals/index.vue"),
    },
    // {
    //   path: "/links",
    //   name: "links",
    //   component: () => import("@/views/Links/index.vue"),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

////页面切换动画？
// router.beforeEach((to) => {
// //  const store = usePageRouterStore();
//   store.pageLoad();
//   // console.log("进入:", to, store.showPage, store);

//   return true;
// });

// router.afterEach((to) => {
// //  const store = usePageRouterStore();
//   store.pageLoaded();
//   // console.log("成功:", to, store.showPage, store);
// });

export default router;
