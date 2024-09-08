<template>
  <PageHeader>关于页面</PageHeader>
  <div class="about">
    <DynamicBackground />
    <div class="about-container">
      <Card class="about-card">
        <v-md-preview ref="previewRef" :text="about?.originalContent"></v-md-preview>
        <div class="about-post">
          <Comment :postId="about?.id" :commentApis="{ addComment, getCommentList }" />
        </div>
      </Card>
      <div class="sidebar" v-if="isLoaded && isShowCatalog">
        <Card class="sidebar-container">
          <Catalog :domRef="previewRef" @callback="(list: any) => isShowCatalog = list.length > 0" />
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import Card from '@/components/Card.vue';
import Comment from '@/components/Comment/Comment.vue';
import Catalog from '@/components/Catalog/index.vue';
import { getAbout, addComment, getCommentList } from "@/api/about";


onMounted(() => {
  getList();
});

const about = ref();
const previewRef = ref();
const isShowCatalog = ref(true);
const isLoaded = ref(false);

const getList = () => {
  getAbout("about").then(({ data }) => {
    about.value = data.data;
    isLoaded.value = true;
  })
}

</script>

<style lang='less' scoped>
.about {
  position: relative;
}

.about-container {
  display: flex;
  width: calc(100% - 20px);
  max-width: 1160px;
  margin: 0 auto;
  padding: 100px 0;
}

.about-card {
  width: calc(~"100% - 290px");
  padding: initial;
  transition: all 0.3s;
}

.about-post {
  margin: 0 32px;
  padding: 16px 0;
}

.sidebar {
  width: 290px;
}

.sidebar-container {
  padding: 16px;
  border-radius: 8px;
  transition: all .2s ease-in-out 0s;
  position: sticky;
  top: 90px;
  margin-left: 13px;
}

@media (max-width: 990px) {
  .about-card {
    width: 100%;
  }

  .sidebar {
    display: none;
  }
}
</style>