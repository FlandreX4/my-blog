<template>
    <div>
        <div class="comment-main">
            <div class="comment-main-left">
                <img :src="comment?.avatar" alt="">
            </div>
            <div class="comment-main-right">
                <div>
                    <div class="comment-main-header">
                        <a :href="comment?.authorUrl" target="_blank" class="header-author">{{ comment?.author }}</a>
                        <div class="header-admin" v-if="comment?.isAdmin">博主</div>
                        <div class="target-author" v-show="comment?.parentItem">
                            <IconForward />
                            <a class="target-author" :href="comment?.parentItem?.authorUrl" target="_blank">{{
                                comment?.parentItem?.author }}</a>
                        </div>
                        <span class="header-time">{{ timeAgo(comment?.createTime)
                            }}</span>
                        <!-- <span class="header-point">#{{ comment?.id }}</span> -->
                    </div>
                    <div class="comment-content markdown-body" v-dompurify-html="renderedContent"></div>
                    <div class="comment-reply">
                        <span @click="onReplyClick(comment)">回复</span>
                    </div>
                    <n-collapse-transition :show="replyShow" appear>
                        <CommentForm :parentComment="comment" />
                    </n-collapse-transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import CommentForm from './CommentForm.vue';
import IconForward from '@/components/icons/IconForward.vue';
import { computed } from 'vue';
import { NCollapseTransition } from 'naive-ui';
import { timeAgo, unescapeHtml } from "@/utils/util";
import { marked } from 'marked';
import 'github-markdown-css/github-markdown.css'

const props = defineProps({
    comment: Object,
    commentReply: Object, //评论显示对象
});

const emit = defineEmits(["replyShowChange"]);

//根据当前评论id显示回复
const replyShow = computed(() => {
    return props.commentReply?.id == props.comment?.id && props.commentReply?.show;
})

const renderedContent = computed(() => {
    return props.comment?.content ? marked.parse(unescapeHtml(props.comment?.content)) : "";
})

const onReplyClick = (obj: any) => {
    let replyObj = {
        id: obj.id,
        show: replyShow.value ? false : true,
    }
    emit("replyShowChange", replyObj);
}

</script>

<style lang='less' scoped>
@media (max-width: 767px) {
    // .markdown-body {
    //     // padding: 15px;
    // }
}

.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 100%;
    background-color: var(--theme-background);
    color: var(--theme-color);

    :deep(pre) {
        background-color: var(--theme-pre-background-color);
        color: var(--theme-pre-color);
    }
}

.comment-main {
    display: flex;
    padding: 15px 0;
}

.comment-main-left {
    margin-right: 15px;
    width: 40px;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.comment-main-right {
    width: calc(100% - 60px);
    flex: 1;

    .comment-main-header {
        display: flex;
        // color: #667c99;
        color: var(--theme-blue-1);
        font-size: 12px;
        line-height: 18px;
        align-items: center;
    }

    .target-author {
        display: flex;
        align-items: center;
        margin-right: 5px;

        svg {
            margin-right: 8px;
        }
    }

    .header-author {
        padding-right: 8px;
        color: var(--theme-color);
        font-size: 14px;
        font-weight: 600;
    }

    .header-admin {
        padding: 2px 5px;
        margin-right: 8px;
        color: #2643e9;
        background-color: var(--theme-background-2-a5);
        font-size: 12px;
        font-weight: 600;
        border-radius: 4px;
    }

    .header-time {
        padding-right: 8px;
    }

    .comment-content {
        margin: 10px 0;
        font-size: 14px;
    }

    .comment-reply {
        color: rgba(51, 51, 51, 0.9);

        font-size: 12px;

        &>span {
            cursor: pointer;
            user-select: none;
            transition: all 0.2s;

            &:hover {
                color: #98a8fc;
            }
        }
    }
}
</style>