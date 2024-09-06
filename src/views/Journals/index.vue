<template>
  <PageHeader>日志</PageHeader>
  <div class="journals">
    <div class="journals-card" v-for="(item, index) in journalList" :key="item.id">
      <div class="card-header">
        <div class="card-header-img">
          <img :src="store.getUserInfo.value?.avatar" alt="">
        </div>
        <div>
          <div class="card-header-name">
            <span>{{ store.getUserInfo.value?.nickname }}</span>
            <IconAccount />
          </div>
          <div class="card-header-time">{{ timeAgo(item.createTime) }}</div>
        </div>
      </div>
      <v-md-preview class="preview" ref="articleRef" :text="item?.sourceContent"></v-md-preview>
      <hr class="post-line" />
      <div class="journals-action">
        <span>
          <IconMessage @click="commentClick(index)" />
          <span>{{ item.commentCount }}</span>
        </span>
      </div>
      <div class="journals-comment">
        <n-collapse-transition :show="commentShowIndex == index" appear>
          <Comment :postId="item.id" miniTitle :commentApis="{ addComment, getCommentList }" />
        </n-collapse-transition>
      </div>
    </div>
    <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
  </div>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import IconAccount from '@/components/icons/IconAccount.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import Pagination from '@/components/Pagination.vue';
import Comment from '@/components/Comment/Comment.vue';
import { onMounted, ref } from 'vue';
import { NCollapseTransition } from 'naive-ui';
import { getJournals, getCommentList, addComment } from "@/api/journals";
import { usePageRouterStore } from "@/stores/user";
import { timeAgo } from "@/utils/util";

const dataForm = ref({
  page: 0,
  pages: 0,
  size: 5
})
const journalList = ref();
const store = usePageRouterStore();
const commentShowIndex = ref();

onMounted(() => {
  getList();
});

const getList = () => {
  getJournals(dataForm.value).then(({ data }) => {
    dataForm.value.page = data.data.page;
    dataForm.value.pages = data.data.pages;
    journalList.value = data.data.content;
  })
}

const pageChange = (val: any) => {
  dataForm.value.page = val - 1;
  journalList.value = [];
  getList();
}

const commentClick = (index: any) => {
  if (commentShowIndex.value != index) {
    commentShowIndex.value = index;
  } else {
    commentShowIndex.value = undefined;
  }
}

</script>

<style lang='less' scoped>
.journals {
  width: 900px;
  margin: 55px auto 0 auto;
  padding: 0 35px;
}

.journals-card {
  margin: 20px 0;
  width: 100%;
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px solid var(--theme-border-color);
  background-color: var(--theme-background);
  transition: all 0.3s;
}

.card-header {
  display: flex;
}

.card-header-img {
  width: 35px;
  height: 35px;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.card-header-name {
  font-size: 13px;
  display: flex;
  color: var(--theme-color);
  transition: all 0.3s;

  &>span {
    font-weight: bold;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #3b82f6;
    margin-left: 5px;
  }
}

.card-header-time {
  font-size: 12px;
  color: #6b7280;
}

.preview {
  padding: 15px 0;

  :deep(.vuepress-markdown-body:not(.custom)) {
    padding: 0;
  }
}

.post-line {
  margin-bottom: 10px;
  border-color: var(--theme-border-color-2);
  transition: all 0.3s;
}

.journals-action {
  &>span {
    display: flex;
    align-items: center;
    color: #6b7280;
  }

  svg {
    width: 21px;
    height: 21px;
    margin-right: 10px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: #a7b5fd;
    }
  }
}

// .journals-comment {}</style>