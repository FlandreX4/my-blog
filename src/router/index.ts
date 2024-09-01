import { createRouter, createWebHistory } from "vue-router";
// import { usePageRouterStore } from "@/stores/pageRouter";

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
  ],
});


////页面切换动画？
// router.beforeEach((to) => {
//   const store = usePageRouterStore();
//   store.pageLoad();
//   // console.log("进入:", to, store.showPage, store);

//   return true;
// });

// router.afterEach((to) => {
//   const store = usePageRouterStore();
//   store.pageLoaded();
//   // console.log("成功:", to, store.showPage, store);
// });

export default router;
