<template>
    <PageHeader>文章归档</PageHeader>
    <PageLayout>
        <Card class="custom-card">
            <div class="archive-container">
                <div class="article-timeline" v-for="item in archiveList" :key="item.year">
                    <h1 class="archive-year">
                        {{ item.year }}
                    </h1>
                    <Timeline :list="item.monthList" />
                </div>
            </div>

        </Card>
    </PageLayout>
</template>

<script setup lang='ts'>
import Card from '@/components/Card.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageLayout from '@/components/Layout/PageLayout.vue';
import Timeline from '@/components/Timeline.vue';
import { getArchives } from "@/api/archives";
import { onMounted, ref } from 'vue';

onMounted(() => {
    getArchives().then(({ data }) => {
        let arr: any = [];
        let list = data.data;
        list.map((item: any) => {
            let i = arr.findIndex((val: any) => val.year == item.year);
            if (i != -1) {
                arr[i]["monthList"].push(item);
            } else {
                item["monthList"] = [{ ...item }];
                arr.push(item);
            }
        })
        console.log('arr:', arr);

        archiveList.value = arr;
    })
});

const archiveList = ref();

</script>

<style lang='less' scoped>
.archive-container {
    margin-left: 50px;
}

.archive-year {
    font-size: 27px;
    font-weight: 800;
    color: var(--theme-color);
    line-height: 60px;
}

@media (max-width: 767px) {
    .archive-container {
        margin-left: 0;
    }

    .custom-card {
        padding: 16px 14px;
    }
}
</style>