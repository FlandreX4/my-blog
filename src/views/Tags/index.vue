<template>
    <PageHeader>{{ tagName }}</PageHeader>
    <div class="tags">
        <!-- <DynamicBackground /> -->
        <div class="tags-container">
            <List :list="list" />
            <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import List from '@/components/List.vue';
import Pagination from '@/components/Pagination.vue';
import { getArticlesByTagName } from "@/api/tags";
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

const route = useRoute();
const tagName = ref();
const dataForm = ref({
    page: 0,
    pages: 0,
})
const list = ref();


watch(() => route.params.name, () => {
    init();
    tagName.value = route.params.name;
    getList();
})

onMounted(() => {
    tagName.value = route.params.name;
    getList();
});

const init = () => {
    tagName.value = undefined;
    list.value = [];
    dataForm.value = {
        page: 0,
        pages: 0,
    };
}

const getList = () => {
    getArticlesByTagName(dataForm.value, tagName.value).then(({ data }) => {
        dataForm.value.page = data.data.page;
        dataForm.value.pages = data.data.pages;
        list.value = data.data.content;
    })
}

const pageChange = (val: any) => {
    dataForm.value.page = val - 1;
    list.value = [];
    getList();
}

</script>

<style lang='less' scoped>
.tags {
    position: relative;

    .tags-container {
        max-width: 970px;
        width: calc(100% - 20px);
        margin: 0 auto;
        padding: 100px 0;
    }
}
</style>