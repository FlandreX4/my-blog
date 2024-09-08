<template>
    <PageHeader>{{ category }}</PageHeader>
    <div class="categories">
        <DynamicBackground />
        <div class="categories-container">
            <List :list="list" />
            <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
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

<style lang='less' scoped>
.categories {
    position: relative;

    .categories-container {
        max-width: 970px;
        width: calc(100% - 20px);
        margin: 0 auto;
        padding: 100px 0;
    }
}
</style>