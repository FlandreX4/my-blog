import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/index.vue"),
    },
    {
      path: "/archives",
      name: "archives",
      component: () => import("@/views/Archives/index.vue"),
    },
    {
      path: "/archives/:name",
      name: "archivesArticle",
      component: () => import("@/views/Article/index.vue"),
    },
    {
      path: "/categories/:name",
      name: "categories",
      component: () => import("@/views/Categories/index.vue"),
    },
    {
      path: "/tags/:name",
      name: "tags",
      component: () => import("@/views/Tags/index.vue"),
    },
    {
      path: "/search/:name",
      name: "search",
      component: () => import("@/views/Search/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About/index.vue"),
    },
    {
      path: "/journals",
      name: "journals",
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
