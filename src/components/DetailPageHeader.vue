<template>
  <PageHeader :bg-url="bgUrl">
    <div class="detail-header">
      <div>{{ article?.title }}</div>
      <div class="detail-container" v-if="article && Object.keys(article).length > 0">
        <span>
          <span class="icon">
            <IconTime />
            <!-- <IconTIme />发布 -->
          </span>
          {{ dayjs(article?.createTime).format("YYYY-MM-DD") }}
        </span>
        <span>
          <span class="icon">
            <IconEye />
            <!-- <IconEye />阅读量 -->
          </span>
          {{ article?.visits }}
        </span>
        <span>
          <span class="icon">
            <IconUpdateTIme />
            <!-- <IconUpdateTIme />最后更新 -->
          </span>
          {{ dayjs(article?.updateTime).format("YYYY-MM-DD") }}
        </span>

      </div>
    </div>
  </PageHeader>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import { computed } from 'vue';
import IconTime from '@/components/icons/IconTime.vue';
import IconUpdateTIme from '@/components/icons/IconUpdateTIme.vue'
import IconEye from '@/components/icons/IconEye.vue'
import { isUrl } from "@/utils/util";
import dayjs from "dayjs";

const props = defineProps({
  article: Object,
})

const serveBaseUrl = import.meta.env.VITE_SERVICE_BASE_URL;

const bgUrl = computed(() => {
  if (!props.article?.thumbnail) {
    return;
  }
  return isUrl(props.article?.thumbnail) ? props.article?.thumbnail : serveBaseUrl + props.article?.thumbnail;
});

</script>

<style lang='less' scoped>
.detail-header {
  padding: 0 20px;
  text-align: center
}

.detail-container {
  display: flex;
  font-size: 15px;
  margin-top: 30px;



  .icon {
    margin-right: 5px;
    display: flex;
    align-items: center;

    svg {
      width: 17px;
      height: 17px;
      margin-right: 2px;
    }
  }

  &>span {
    display: flex;
    align-items: center;
  }

  &>span:not(&>span:last-child) {
    margin-right: 15px;
  }
}
</style>