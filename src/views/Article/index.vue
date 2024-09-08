<template>
    <DetailPageHeader :article="{ ...article }" />
    <div class="article">
        <DynamicBackground />
        <div class="article-container">
            <Card class="article-card">
                <v-md-preview ref="articleRef" :text="article?.originalContent"></v-md-preview>
                <div class="article-post">
                    <div class="tag-list">
                        <RouterLink :to="item.fullPath" v-for="item in article?.tags" :key="item.id"
                            :style="{ color: item.color, backgroundColor: bgColor(item.color) }">
                            <span class="tag-hover" :style="{ backgroundColor: bgColor(item.color) }"></span>
                            <NIcon :component="PricetagsSharp" />
                            {{ item.name }}
                        </RouterLink>
                    </div>
                    <div class="copyright">
                        <ul>
                            <li>
                                <NIcon :component="ShareSocial" />
                                <strong>版权声明：</strong>
                                采用
                                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">知识共享署名4.0</a>
                                国际许可协议进行许可
                            </li>
                            <li>
                                <NIcon :component="Link" />
                                <strong>本文链接：</strong>
                                <RouterLink :to="getArticlePath">
                                    {{ getArticleLink }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <div class="post-nav">
                        <div class="post-nav-item"
                            :style="{ 'background-image': `url(${getThumbnail(prevArticle?.thumbnail)})` }">
                            <RouterLink :to="prevArticle?.fullPath" v-if="prevArticle">
                                <span class="post-nav-btn">上一篇</span>
                                <h3 class="post-nav-title">{{ prevArticle?.title }}</h3>
                            </RouterLink>
                            <div v-else>
                                <span class="post-nav-btn">上一篇</span>
                                <h3 class="post-nav-title">{{ prevArticle?.title }}</h3>
                            </div>
                        </div>
                        <div class="post-nav-item"
                            :style="{ 'background-image': `url(${getThumbnail(nextArticle?.thumbnail)})` }">
                            <RouterLink :to="nextArticle?.fullPath" v-if="nextArticle">
                                <span class="post-nav-btn">下一篇</span>
                                <h3 class="post-nav-title">{{ nextArticle?.title || '无' }}</h3>
                            </RouterLink>
                            <div v-else>
                                <span class="post-nav-btn">下一篇</span>
                                <h3 class="post-nav-title">{{ nextArticle?.title || '无' }}</h3>
                            </div>
                        </div>
                    </div>
                    <Comment :postId="article?.id" :commentApis="{ addComment, getCommentList }" />
                </div>
            </Card>
            <div class="sidebar" v-if="articleLoaded && isShowCatalog">
                <Card class="sidebar-container">
                    <Catalog :domRef="articleRef" @callback="(list) => isShowCatalog = list.length > 0" />
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Card from '@/components/Card.vue';
import DetailPageHeader from '@/components/DetailPageHeader.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { getArticleByName, getPrevArticle, getNextArticle } from "@/api/article";
import Catalog from '@/components/Catalog/index.vue'
import { NIcon } from 'naive-ui';
import { Link, ShareSocial, PricetagsSharp } from '@vicons/ionicons5';
import Comment from '@/components/Comment/Comment.vue';
import { addComment, getCommentList } from "@/api/comment";
import { RouterLink, useRoute } from 'vue-router';
import { parseColorString } from "@/utils/colorConversion";
import { getThumbnail } from "@/utils/util";

const route = useRoute();
const article = ref();
const articleRef = ref();
const articleLoaded = ref(false);
const isShowCatalog = ref(true);
const prevArticle = ref();
const nextArticle = ref();

onMounted(async () => {
    getList();
});

watch(() => route.params.name, () => {
    init();
    getList();
})

const bgColor = (color: any, a: number = 0.1) => {
    return `rgba(${parseColorString(color).r},${parseColorString(color).g}, ${parseColorString(color).b}, ${a})`;
}

const getArticleLink = computed(() => decodeURIComponent(location.href));
const getArticlePath = computed(() => decodeURIComponent(location.pathname));

const init = () => {
    articleLoaded.value = false;
    isShowCatalog.value = true;
    article.value = undefined;
    prevArticle.value = undefined;
    nextArticle.value = undefined;
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}

const getList = () => {
    getArticleByName(route.params.name).then(({ data }) => {
        article.value = data.data;
        articleLoaded.value = true;
        getPageArticle();
    })
}

const getPageArticle = () => {
    getPrevArticle(article.value.id).then(({ data }) => {
        prevArticle.value = data.data;
    })
    getNextArticle(article.value.id).then(({ data }) => {
        nextArticle.value = data.data;
    })
}

</script>

<style lang='less' scoped>
.article {
    position: relative;
}

.article-container {
    width: calc(100% - 20px);
    max-width: 1160px;
    padding: 100px 0;
    margin: 0 auto;
    display: flex;
}

.article-card {
    width: calc(~"100% - 290px");
    padding: initial;
    transition: all 0.3s;
}

.sidebar {
    width: 290px;
}

.sidebar-container {
    padding: 16px;
    border-radius: 8px;
    position: sticky;
    top: 90px;
    margin-left: 13px;
}

.article-post {
    margin: 0 32px;
    padding: 16px 0;
}

.copyright {
    // font-size: 9px;
    padding: 16px 32px;
    margin-bottom: 30px;
    border-radius: 10px;
    background: var(--theme-grey-2);
    color: var(--theme-grey-6);

    li {
        font-size: 12px;
        line-height: 2;
    }

    strong {
        font-size: 12px;
    }

    i {
        font-size: 12px;
        margin-right: 5px;
        padding-top: 2px;
    }

    a {
        color: #9caab4;
        word-wrap: break-word;
        width: auto;
        height: auto;
    }
}

.tag-list {
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;

    a {
        padding: 5px 10px;
        background-color: rgba(131, 145, 212, 0.2);
        color: rgb(103, 112, 159);
        font-size: 12px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        position: relative;
        transition: background-color 0.5s;
        transition-delay: 0.2s;
        margin-bottom: 10px;

        &:not(&:last-child) {
            margin-right: 10px;
        }

        i {
            margin-right: 3px;
            transform: scaleX(-1);
        }

        .tag-hover {
            position: absolute;
            bottom: 0;
            height: 100%;
            width: 0;
            right: 0;
            background: rgba(233, 84, 107, 0.1);
            border-radius: 4px;
            transition: all .2s ease-in-out 0s;
        }

        &:hover {
            color: #e9546b;
            background-color: rgba(131, 145, 212, 0.07);

            .tag-hover {
                width: 100%;
                left: -2%;
            }
        }
    }
}

.post-nav {
    display: flex;
    margin-bottom: 50px;
    margin-top: 40px;
    border-radius: 10px;
    overflow: hidden;
}

.post-nav-item {
    width: 50%;
    background-size: cover;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        transition: all .2s ease-in-out 0s;
        top: 0;
        left: 0;
    }

    &>a,
    &>div {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        color: #fff;
        position: relative;
        z-index: 1;
        cursor: pointer;
    }

    &:nth-child(2) {

        &>a,
        &>div {
            text-align: right;
        }
    }

    &:hover {
        &::before {
            opacity: 0.5;
        }
    }
}

.post-nav-btn {
    font-size: 13px;
}

.post-nav-title {
    font-weight: 700;
    margin: 20px 0 15px 0;
    line-height: 1.5;
    font-size: 18px;
}

@media (max-width: 990px) {
    .article-card {
        width: 100%;
    }

    .sidebar {
        display: none;
    }
}

@media (max-width: 767px) {
    .post-nav {
        flex-direction: column;
    }

    .post-nav-item {
        width: 100%;
    }
}
</style>