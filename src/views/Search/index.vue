<template>
    <PageHeader>{{ `关于 [${dataForm.keyword}] 的搜索结果` }}</PageHeader>
    <div class="search">
        <div class="search-input">
            <el-input v-model="searchVal" placeholder="Search" @keyup.enter="onSearch">
                <template #prefix>
                    <IconSearch @click="onSearch" />
                </template>
            </el-input>
        </div>
        <template v-if="list && list.length > 1">
            <List :list="list" />
            <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
        </template>
        <h1 class="empty" v-else>Sorry! Nothing Found...</h1>
    </div>
</template>

<script setup lang='ts'>
import PageHeader from '@/components/PageHeader.vue';
import List from '@/components/List.vue';
import Pagination from '@/components/Pagination.vue';
import { getArticlesByKeyword } from "@/api/article";
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const searchVal = ref();
const dataForm = ref({
    page: 0,
    pages: 0,
    keyword: "",
})
const list = ref();


watch(() => route.params.name, () => {
    init();
    let str: any = route.params.name;
    dataForm.value.keyword = str;
    getList();
})

onMounted(() => {
    let str: any = route.params.name;
    dataForm.value.keyword = str;
    getList();
});

const onSearch = () => {
    if (!searchVal.value)
        return;
    router.push(`/search/${searchVal.value}`);
    init();
    getList();
}

const init = () => {
    list.value = [];
    dataForm.value = {
        page: 0,
        pages: 0,
        keyword: searchVal.value,
    };
    searchVal.value = "";
}

const getList = () => {
    getArticlesByKeyword(dataForm.value).then(({ data }) => {
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
.search {
    width: 970px;
    margin: 100px auto;
}

.search-input {
    margin-bottom: 50px;

    :deep(.el-input) {
        font-size: 18px;

        svg {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }

        .el-input__wrapper {
            box-shadow: none;
            height: 60px;
            border: 1px solid #f3f4f6;
            border-radius: 30px;
            padding: 1px 20px;
        }
    }

}

.empty {
    color: #1f2937;
    font-weight: 800;
    font-size: 25px;
    margin: 50px 0;
}
</style>