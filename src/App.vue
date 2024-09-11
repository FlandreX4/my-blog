<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Layout/Header/index.vue';
import Footer from '@/components/Layout/Footer/index.vue';
import { NMessageProvider } from 'naive-ui';
import { nextTick, onMounted, watch } from 'vue';
import { useSystemOptionsStore } from "@/stores/systemOptions";

const systemOptionsStore = useSystemOptionsStore();

onMounted(() => {
  import("@/utils/storesRequest");
  resetVhAndPx()
  // 监听resize事件 视图大小发生变化就重新计算1vh的值
  // window.addEventListener('resize', resetVhAndPx)
})

watch(() => systemOptionsStore.getSystemOptions.value, () => {
  let favIconUrl = systemOptionsStore.getSystemOptions.value?.blog_favicon;
  if (favIconUrl) {
    let favicon: any = document.querySelector('link[rel="icon"]');
    favicon.href = favIconUrl;
  }
})

const resetVhAndPx = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

</script>

<template>
  <n-message-provider>
    <Header />
    <RouterView />
    <Footer />
  </n-message-provider>
</template>

<style scoped></style>
