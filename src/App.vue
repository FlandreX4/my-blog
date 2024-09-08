<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Layout/Header/index.vue';
import Footer from '@/components/Layout/Footer/index.vue';
import { NMessageProvider } from 'naive-ui';
import { onMounted } from 'vue';


onMounted(() => {
  import("@/utils/storesRequest");
  resetVhAndPx()
  // 监听resize事件 视图大小发生变化就重新计算1vh的值
  // window.addEventListener('resize', resetVhAndPx)
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
