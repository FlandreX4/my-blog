<template>
    <div class="comment">
        <CommentForm />
        <div class="comment-header">
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
import { onMounted, provide, ref, watch } from 'vue';
import { getCommentList } from "@/api/comment";
import IconComment from '@/components/icons/IconComment.vue';
import CommentForm from '@/components/Comment/CommentForm.vue';
import CommentItem from './CommentItem.vue';
import CommentChildren from './CommentChildren.vue';
import { NPagination } from 'naive-ui';

const props = defineProps({
    postId: Number,
});


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
    postId.value = props.postId;
    getList();
})

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
    getCommentList(props.postId, pagination.value.page).then(({ data }) => {
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
@keyframes top20 {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

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

    svg {
        width: 20px;
        height: 20px;
        color: #32325d;
        margin-right: 10px;
    }
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