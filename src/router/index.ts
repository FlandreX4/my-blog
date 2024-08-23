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
      path: "/archive",
      name: "articleArchive",
      component: () => import("@/views/ArticleArchive/index.vue"),
    },
    {
      path: "/article/:articlename",
      name: "article",
      component: () => import("@/views/Article/index.vue"),
    },
  ],
});

export default router;
