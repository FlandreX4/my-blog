<template>
    <PageHeader>{{ category }}</PageHeader>
    <PageLayout>
        <List :list="list" />
        <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
    </PageLayout>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import PageLayout from '@/components/Layout/PageLayout.vue';
import List from '@/components/List.vue';
import Pagination from '@/components/Pagination.vue';
import { getArticlesByCategory } from "@/api/categories";
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

const route = useRoute();
const category = ref();
const dataForm = ref({
    page: 0,
    pages: 0,
})
const list = ref();


watch(() => route.params.name, () => {
    init();
    category.value = route.params.name;
    getList();
})

onMounted(() => {
    category.value = route.params.name;
    getList();
});

const init = () => {
    category.value = undefined;
    list.value = [];
    dataForm.value = {
        page: 0,
        pages: 0,
    };
}

const getList = () => {
    getArticlesByCategory(dataForm.value, category.value).then(({ data }) => {
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