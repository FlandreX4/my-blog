<template>
    <div class="comment">
        <CommentForm />
        <div class="comment-header" :class="{ 'mini-header': miniTitle }">
            <IconComment />
            共有{{ pagination.commentCount }}条评论
        </div>
        <ul class="comment-list" v-if="commentList?.length > 0">
            <li v-for="item in commentList" :key="item.id">
                <CommentItem :comment="item" :commentReply="commentReply" @replyShowChange="replyShowChange" />
                <CommentChildren v-if="item.children" :commentList="item.children" :parentComment="item"
                    :commentReply="commentReply" @replyShowChange="replyShowChange" />
            </li>
        </ul>
        <div class="pagination" v-if="pagination.pages > 1">
            <n-pagination :page="pagination.page + 1" :item-count="pagination.total" :on-update:page="onPageChange" />
        </div>
        <hr class="horizontal" />
    </div>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue'
import { nextTick, onMounted, provide, ref, watch } from 'vue';
import IconComment from '@/components/icons/IconComment.vue';
import CommentForm from '@/components/Comment/CommentForm.vue';
import CommentItem from './CommentItem.vue';
import CommentChildren from './CommentChildren.vue';
import { NPagination } from 'naive-ui';

const props = defineProps({
    postId: Number,
    miniTitle: Boolean,
    commentApis: {
        type: Object as PropType<{
            getCommentList: Function,
            addComment: Function
        }>,
        default: {
            getCommentList: undefined,
            addComment: undefined
        }
    }
});

provide("commentApis", props.commentApis);

const postId = ref();
const commentList = ref();
const commentReply = ref(); //评论表单显示对象
const pagination = ref({
    total: 0,
    page: 0,
    pages: 1,
    pageSize: 10,
    commentCount: 0
});

provide("postId", postId);

watch(() => props.postId, () => {
    console.log('postId:', props.postId);
    postId.value = props.postId;
    nextTick(() => {
        getList();
    })
}, { immediate: true })

onMounted(() => {

});

const onPageChange = (page: any) => {
    console.log("page:", page);
    pagination.value.page = page - 1;
    commentList.value = [];
    getList();
}

const replyShowChange = (replyObj: Object) => {
    commentReply.value = replyObj;
}

const getList = () => {
    props.commentApis.getCommentList(props.postId, pagination.value.page).then(({ data }: any) => {
        commentList.value = data.data.content;
        pagination.value = {
            total: data.data.total,
            page: data.data.page,
            pages: data.data.pages,
            pageSize: data.data.rpp,
            commentCount: data.data.commentCount
        }
        commentReply.value = undefined;
    })
}


</script>

<style lang='less' scoped>
.comment {
    width: 100%;
}

.comment-header {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    font-weight: 600;
    color: var(--theme-color);

    svg {
        width: 20px;
        height: 20px;
        color: var(--theme-blue-1);
        margin-right: 10px;
    }
}

.mini-header {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.horizontal {
    border: none;
    background-color: transparent;
    background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, .4), transparent);
    height: 1px;
    opacity: 0.25;
    margin-top: 30px;
    margin-bottom: 30px;
}

.comment-list {
    margin-bottom: 20px;
    animation: top20 1s;
}

.pagination {
    display: flex;
    justify-content: center
}
</style>