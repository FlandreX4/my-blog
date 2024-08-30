<template>
    <ul class="comment-children">
        <li v-for="item in comments" :key="item.id">
            <CommentItem :comment="item" :commentReply="commentReply" @replyShowChange="replyShowChange" />
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';
import CommentItem from './CommentItem.vue';

const props = defineProps({
    commentList: Array,
    commentReply: Object, //评论显示对象
    parentComment: {
        type: Object,
        default: undefined
    },
});

const emit = defineEmits(["replyShowChange"]);

const comments = ref();

watchEffect(() => {
    let arr = props.commentList || [];
    comments.value = flatten(arr.reverse(), props.parentComment);
})

function replyShowChange(replyObj: Object) {
    emit("replyShowChange", replyObj);
}

function flatten(arr: any, parentObj: any) {

    return arr.reduce((pre: any, cur: any) => {
        cur.parentItem = parentObj;
        if (cur.children) {
            pre.push(cur);
            return pre.concat(flatten(cur.children.reverse(), cur));
        } else {
            return pre.concat(cur);
        }

    }, [])
}


</script>

<style lang='less' scoped>
.comment-children {
    padding-left: 40px;
}
</style>