import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref();

  const getUserInfo = computed(() => {
    return userInfo;
  });

  function setUserInfo(obj: any) {
    userInfo.value = obj;
  }

  return { userInfo, setUserInfo, getUserInfo };
});
