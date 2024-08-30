<template>
    <PageHeader>文章详细</PageHeader>
    <div class="article">
        <Card class="article-card">
            <v-md-preview ref="articleRef" :text="article?.originalContent"></v-md-preview>
            <div class="article-post">
                <!-- <hr class="post-line" /> -->
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
                        style="background-image: url('https://static.ttkwsd.top/article/2ce1129fceee7f14cb4cf554ed167534.jpg')">
                        <a href="">
                            <span class="post-nav-btn">上一篇</span>
                            <h3 class="post-nav-title">测试文章</h3>
                        </a>
                    </div>
                    <div class="post-nav-item">
                        <a href="">
                            <span class="post-nav-btn">下一篇</span>
                            <h3 class="post-nav-title">测试文章</h3>
                        </a>
                    </div>
                </div>
                <Comment :postId="article?.id" />

            </div>
        </Card>
        <div class="sidebar">
            <div class="sidebar-container">
                <Catalog v-if="articleLoaded" :domRef="articleRef" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Card from '@/components/Card.vue';
import PageHeader from '@/components/PageHeader.vue';
import { computed, onMounted, ref } from 'vue';
import { getArticleByName } from "@/api/article";
import Catalog from '@/components/Catalog/index.vue'
import { NIcon } from 'naive-ui';
import { Link, ShareSocial, PricetagsSharp } from '@vicons/ionicons5';
import Comment from '@/components/Comment/Comment.vue'
import { RouterLink } from 'vue-router';
import { parseColorString } from "@/utils/colorConversion";

const article = ref();
const articleRef = ref();
const articleLoaded = ref(false);

onMounted(async () => {

    getArticleByName("hello-halo").then(({ data }) => {
        console.log('res:', data)
        article.value = data.data;
        articleLoaded.value = true;
    })

});


const bgColor = (color: any, a: number = 0.1) => {
    return `rgba(${parseColorString(color).r},${parseColorString(color).g}, ${parseColorString(color).b}, ${a})`;
}

const getArticleLink = computed(() => decodeURIComponent(location.href));
const getArticlePath = computed(() => decodeURIComponent(location.pathname));

</script>

<style lang='less' scoped>
.article {
    display: flex;
    width: 60%;
    margin: 100px auto;
    position: relative;
    z-index: 1;
}

.article-card {
    width: calc(~"100% - 290px");
    padding: initial;
}

.sidebar {
    width: 290px;
}

.sidebar-container {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out 0s;
    position: sticky;
    top: 90px;
    margin-left: 13px;
    animation: slideUpIn 1s;
    background-color: white;
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
    background: #f7f7f7;
    color: #666;

    li {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 2;
    }

    strong {
        font-size: 14px;
        width: 80px;
    }

    i {
        font-size: 15px;
        margin-right: 5px;
    }
}

.tag-list {
    display: flex;
    margin-bottom: 30px;

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

        &:not(&:last-child) {
            margin-right: 10px;
        }

        i {
            margin-right: 3px;
            transform: scaleX(-1);
        }

        // &::before {
        //     content: "";
        //     position: absolute;
        //     bottom: 0;
        //     height: 100%;
        //     width: 0;
        //     right: 0;
        //     background: rgba(233, 84, 107, 0.1);
        //     border-radius: 4px;
        //     transition: all .2s ease-in-out 0s;
        // }

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

// .post-line {
//     background-color: rgba(96, 125, 139, .05);
//     size: 2px;
//     margin-bottom: 30px;
// }

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

    &>a {
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        color: #fff;
        position: relative;
        z-index: 1;


    }

    &:nth-child(2) {
        &>a {
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
    font-size: 22px;
}
</style>