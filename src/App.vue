<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Layout/Header/index.vue';
import Footer from '@/components/Layout/Footer/index.vue';
import DynamicBackground from './components/Layout/DynamicBackground.vue';
import { NMessageProvider } from 'naive-ui';
// import { usePageRouterStore } from "@/stores/pageRouter";

// const store = usePageRouterStore();
</script>

<template>
  <n-message-provider>
    <Header />
    <!-- 页面切换动画？ -->
    <!-- <RouterView v-slot="{ Component }">
      <div v-if="!store.showPage">123111{{ console.log('test1') }}</div>
      <component v-if="store.showPage" :is="Component" />
    </RouterView> -->
    <RouterView />
    <DynamicBackground />
    <Footer />
  </n-message-provider>
</template>

<style scoped></style>
