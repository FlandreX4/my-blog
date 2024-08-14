<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Layout/Header/index.vue';
import Footer from '@/components/Layout/Footer/index.vue';
import DynamicBackground from './components/Layout/DynamicBackground.vue';
</script>

<template>
  <Header />
  <RouterView />
  <DynamicBackground />
  <Footer />
</template>

<style scoped>
</style>
