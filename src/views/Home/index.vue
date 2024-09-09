<template>
    <PageHeader isFullScreen @pageDown="onPageDown">{{ store.getUserInfo.value?.username }}'s Blog</PageHeader>
    <PageLayout class="home">
        <div class="main-container-left">
            <List :list="articleList" />
            <Pagination :page="dataForm.page + 1" :pages="dataForm.pages" @pageChange="pageChange" />
        </div>
        <div class="main-container-right">
            <div class="side-container">
                <SideCard />
                <div class="notice">
                    <div class="notice-title">
                        <svg t="1723198647704" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="15134">
                            <path
                                d="M512 892.586667v24.746666a21.333333 21.333333 0 0 1-21.333333 21.333334H408.32a42.666667 42.666667 0 0 1-36.693333-20.906667l-97.28-162.133333a116.053333 116.053333 0 0 1-15.36-42.666667h104.106666a176.64 176.64 0 0 1 66.986667 12.8l17.92 117.333333a42.666667 42.666667 0 0 0 32 24.32l14.08 2.56a21.333333 21.333333 0 0 1 17.92 22.613334zM938.666667 469.333333a170.666667 170.666667 0 0 1-34.133334 102.4 21.76 21.76 0 0 1-32 0l-30.72-30.72a21.333333 21.333333 0 0 1-2.56-26.88 85.333333 85.333333 0 0 0 0-93.866666 21.333333 21.333333 0 0 1 2.56-26.88l30.72-30.72a21.76 21.76 0 0 1 16.64-6.4 23.04 23.04 0 0 1 15.36 8.533333A170.666667 170.666667 0 0 1 938.666667 469.333333z m-170.666667-341.333333v682.666667a42.666667 42.666667 0 0 1-42.666667 42.666666h-25.173333a42.666667 42.666667 0 0 1-29.866667-12.373333l-128-125.866667A256 256 0 0 0 363.093333 640H213.333333a128 128 0 0 1-128-128v-85.333333a128 128 0 0 1 128-128h149.76a256 256 0 0 0 181.333334-75.093334l128-125.866666a42.666667 42.666667 0 0 1 29.866666-12.373334H725.333333a42.666667 42.666667 0 0 1 42.666667 42.666667z"
                                p-id="15135" fill="#e9546b"></path>
                        </svg>
                        <span>公告</span>
                    </div>
                    <div class="notice-content">{{ `欢迎来到${store.getUserInfo.value?.nickname}的博客~` }}</div>
                </div>
            </div>

        </div>
    </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PageHeader from '@/components/PageHeader.vue'
import PageLayout from '@/components/Layout/PageLayout.vue';
import { getArticleList } from "@/api/article";
import Pagination from '@/components/Pagination.vue';
import { useUserStore } from "@/stores/user";
import List from '@/components/List.vue';
import SideCard from '@/components/SideCard.vue';
import { setHeadTitle } from "@/utils/util";

const dataForm = ref({
    page: 0,
    pages: 0,
    keyword: "",
    categoryId: undefined,
})
const articleList = ref();
const store = useUserStore();

onMounted(() => {
    setHeadTitle();
    getList();
});

const onPageDown = () => {
    let ele = document.querySelector(".page-header");
    document.documentElement.scrollTo({ top: ele?.scrollHeight, behavior: "smooth" });
}

const getList = () => {
    getArticleList(dataForm.value).then(({ data }) => {
        dataForm.value.page = data.data.page;
        dataForm.value.pages = data.data.pages;
        articleList.value = data.data.content;

    })
}

const pageChange = (val: any) => {
    dataForm.value.page = val - 1;
    articleList.value = [];
    getList();
}


</script>

<style lang="less" scoped>
.home {
    overflow: initial;
}

.home :deep(.page-layout-container) {
    max-width: 1160px;
    display: flex;
}

.main-container-left {
    width: calc(100% - 310px);
    margin-right: 20px;
    transition: all 0.3s;
}

.main-container-right {
    width: 290px;
}

.side-container {
    position: sticky;
    top: 90px;
    min-height: 300px;
    z-index: 1;
}

.notice {
    width: 100%;
    // min-height: 320px;
    padding: 30px 16px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    background-color: var(--theme-background);
    color: var(--theme-text-color);
    margin-top: 20px;
    align-items: initial;
}

.notice-title {
    display: flex;
    align-items: center;
    font-size: 19px;
    margin-bottom: 10px;

    svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
}

.notice-content {
    font-size: 15px;
    line-height: 28px;
}

@media (max-width: 991px) {
    .main-container-left {
        width: 100%;
        margin-right: 0;
    }

    .main-container-right {
        display: none;
    }
}
</style>
