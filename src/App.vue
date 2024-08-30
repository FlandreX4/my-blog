<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Layout/Header/index.vue';
import Footer from '@/components/Layout/Footer/index.vue';
import DynamicBackground from './components/Layout/DynamicBackground.vue';
import { NMessageProvider } from 'naive-ui';
</script>

<template>
  <n-message-provider>
    <Header />
    <RouterView />
    <DynamicBackground />
    <Footer />
  </n-message-provider>
</template>

<style scoped></style>
