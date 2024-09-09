<template>
    <PageHeader>{{ tagName }}</PageHeader>
    <PageLayout>
        <List :list="list" />
        <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
    </PageLayout>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import List from '@/components/List.vue';
import PageLayout from '@/components/Layout/PageLayout.vue';
import Pagination from '@/components/Pagination.vue';
import { getArticlesByTagName } from "@/api/tags";
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { setHeadTitle } from "@/utils/util";

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
    setHeadTitle(`标签：${tagName.value}`);
    getList();
})

onMounted(() => {
    tagName.value = route.params.name;
    setHeadTitle(`标签：${tagName.value}`);
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

<style lang='less' scoped></style>