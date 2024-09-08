import { getUserInfo } from "@/api/user";
import { getThemeSettings } from "@/api/themes";
import { getSystemOptions } from "@/api/systemOptions";
import { useUserStore } from "@/stores/user";
import { useThemeSettingsStore } from "@/stores/themeSettings";
import { useSystemOptionsStore } from "@/stores/systemOptions";

const userStore = useUserStore();
const themeSttingsStore = useThemeSettingsStore();
const systemOptionsStore = useSystemOptionsStore();

getUserInfo().then(({ data }) => {
  userStore.setUserInfo(data.data);
});

getThemeSettings().then(({ data }) => {
  themeSttingsStore.setThemeSettings(data.data);
});

getSystemOptions().then(({ data }) => {
  systemOptionsStore.setSystemOptions(data.data);
});
