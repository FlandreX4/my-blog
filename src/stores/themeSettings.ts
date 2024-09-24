import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useThemeSettingsStore = defineStore("themeSettings", () => {
  const themeSettings = ref();
  const getThemeSettings = computed(() => {
    return themeSettings;
  });

  function setThemeSettings(obj: any) {
    themeSettings.value = obj;
  }

  return { themeSettings, getThemeSettings, setThemeSettings };
});
