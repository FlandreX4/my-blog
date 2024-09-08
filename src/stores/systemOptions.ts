import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSystemOptionsStore = defineStore("systemOptions", () => {
  const systemOptions = ref();
  const getSystemOptions = computed(() => {
    return systemOptions;
  });

  function setSystemOptions(obj: any) {
    systemOptions.value = obj;
  }

  return { systemOptions, getSystemOptions, setSystemOptions };
});
