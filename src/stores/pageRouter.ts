import { ref } from "vue";
import { defineStore } from "pinia";

export const usePageRouterStore = defineStore("pageRouter", () => {
  const showPage = ref(false);
  function pageLoad() {
    showPage.value = false;
  }
  function pageLoaded() {
    showPage.value = true;
  }

  return { showPage, pageLoad, pageLoaded };
});
