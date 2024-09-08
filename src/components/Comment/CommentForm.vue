<template>

    <div class="comment-form">
        <div class="comment-form-header">
            <IconCommentPoint />
            <span>发表评论</span>
        </div>
        <div class="comment-user">
            <div class="comment-user-avatar">
                <img :src="`${avatarUrl}${avatarId}?s=256&d=${systemOptionsStore.getSystemOptions.value?.comment_gravatar_default}`"
                    alt="">
            </div>
            <div class="comment-user-info">
                <div>
                    <span v-show="avatarId">你好，{{ dataForm.author }}</span>
                    <span v-show="!avatarId">···</span>
                </div>
                <div class="comment-user-switch" v-show="avatarId">
                    <span @click="onUserSwitch">[ 切换评论身份 ]</span>
                </div>
            </div>
        </div>
        <n-collapse-transition :show="isSwitch" appear>
            <div class="w-full flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 input-container">
                <div class="form-input sm:w-full md:w-1/3">
                    <n-input placeholder="昵称 *" v-model:value="dataForm.author" size="large" @blur="onInputBlur">
                        <template #prefix>
                            <IconUser />
                        </template>
                    </n-input>
                </div>
                <div class="form-input sm:w-full md:w-1/3">
                    <n-input placeholder="邮箱 *" v-model:value="dataForm.email" size="large" @blur="onInputBlur">
                        <template #prefix>
                            <IconEmail />
                        </template>
                    </n-input>
                </div>
                <div class="form-input sm:w-full md:w-1/3">
                    <n-input placeholder="网址" v-model:value="dataForm.authorUrl" size="large">
                        <template #prefix>
                            <IconLink />
                        </template>
                    </n-input>
                </div>
            </div>
        </n-collapse-transition>
        <div class="form-textarea">
            <n-input type="textarea" :placeholder="content" v-model:value="dataForm.content" />
        </div>
        <div class="form-action">
            <div class="action-emoji">
                <n-popover trigger="click" class="emoji-popover" style="padding: 0">
                    <template #trigger>
                        <IconEmojiSmile />
                    </template>
                    <EmojiPicker :native="true" @select="onSelectEmoji" hide-group-names
                        :theme="getTheme() ? 'dark' : 'light'" />
                </n-popover>
            </div>
            <!-- <div class="action-btn" @click="onSubmit">
                发送评论
            </div> -->
            <n-button type="tertiary" class="action-btn" @click="onSubmit" :loading="isLoading">发送评论</n-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import IconUser from '@/components/icons/IconUser.vue';
import IconEmail from '@/components/icons/IconEmail.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconCommentPoint from '@/components/icons/IconCommentPoint.vue';
import IconEmojiSmile from '@/components/icons/IconEmojiSmile.vue';
import { NButton, NCollapseTransition, NInput, NPopover, useMessage } from 'naive-ui';
import { useSystemOptionsStore } from "@/stores/systemOptions";
import { computed, inject, onMounted, ref } from 'vue';
import { Md5 } from "ts-md5";
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const props = defineProps({
    parentComment: {
        type: Object,
        default: undefined
    },
});

const commentApis: any = inject("commentApis");
const postId: any = inject("postId");

const message = useMessage();
const systemOptionsStore = useSystemOptionsStore();
const avatarUrl = computed(() => systemOptionsStore.getSystemOptions.value?.gravatar_source);
const avatarId = ref("");
const isSwitch = ref(true);
const isLoading = ref(false);
const dataForm = ref({
    author: "",
    authorUrl: "",
    content: "",
    email: "",
    allowNotification: true,
    parentId: 0,
    postId: 0,
});

const getTheme = () => document.documentElement.getAttribute("theme");

onMounted(() => {
    dataForm.value.author = localStorage.getItem("comment-author") || "";
    dataForm.value.authorUrl = localStorage.getItem("comment-authorUrl") || "";
    dataForm.value.email = localStorage.getItem("comment-email") || "";
    if (dataForm.value.author && dataForm.value.email) {
        isSwitch.value = false;
        md5Email();
    }
});

const content = computed(() => {
    return props.parentComment ? `回复 @${props.parentComment.author} #${props.parentComment.id}：` : "你可以在这里输入评论内容...";
})

const onSelectEmoji = (emoji: any) => {
    console.log("emoji:", emoji);
    dataForm.value.content += emoji.i;
}

const md5Email = () => {
    if (dataForm.value.author.trim() && dataForm.value.email.trim()) {
        avatarId.value = Md5.hashStr(dataForm.value.email.trim());
    } else {
        avatarId.value = "";
        isSwitch.value = true;
    }
};

const onUserSwitch = () => {
    isSwitch.value = !isSwitch.value;
}

const onInputBlur = () => {
    md5Email();
}

const validate = () => {
    if (!dataForm.value.author.trim()) {
        message.error("昵称不能为空", {
            closable: true,
            duration: 5000
        });
        return false;
    }
    if (!dataForm.value.email.trim()) {
        message.error("邮箱不能为空", {
            closable: true,
            duration: 5000
        });
        return false;
    }
    if (!dataForm.value.content.trim()) {
        message.error("评论内容不能为空", {
            closable: true,
            duration: 5000
        });
        return false;
    }
    return true;
}

const onSubmit = () => {
    let flag = validate();
    if (flag) {
        dataForm.value.postId = postId;
        dataForm.value.parentId = props.parentComment ? props.parentComment.id : 0;
        isLoading.value = true;
        commentApis.addComment(dataForm.value).then(({ data }: any) => {
            isLoading.value = false;
            if (data.status == 200) {
                message.success("您的评论已经投递至博主，等待博主审核！", {
                    closable: true,
                    duration: 0
                });
                localStorage.setItem("comment-author", dataForm.value.author);
                localStorage.setItem("comment-authorUrl", dataForm.value.authorUrl);
                localStorage.setItem("comment-email", dataForm.value.email);
                reset();
            }
        }).catch(({ response }: any) => {
            isLoading.value = false;
            let msg = response.data.data == Object ? response.data.data.authorUrl : response.data.message;
            message.error(msg, {
                closable: true,
                duration: 5000
            });
        })
    }
}

const reset = () => {
    dataForm.value.content = "";
}

</script>

<style lang='less' scoped>
.comment-form {
    padding-top: 10px;

    .comment-form-header {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--theme-blue-1);
        font-size: 17px;
        margin-bottom: 10px;

        svg {
            width: 17px;
            height: 17px;
            margin-right: 5px;
        }
    }

    .comment-user {
        display: flex;
        margin-bottom: 10px;

    }

    .comment-user-avatar {
        img {
            width: 50px;
            height: 50px;
            border-radius: 10px;
        }
    }

    .comment-user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15px;
        line-height: 1.571;
        font-weight: 600;
        font-size: .875rem;
        color: var(--theme-blue-1);
    }

    .comment-user-switch {
        color: #ff5c72;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s;

        &:hover {
            color: var(--theme-blue-1);
        }
    }

    .input-container {
        padding-bottom: 20px;
    }

    .form-input {
        :deep(.n-input) {

            border-radius: 7px;
            font-size: 14px;

            .n-input__prefix {
                margin-right: 10px;
                color: var(--theme-text-color-2);

                svg {
                    width: 15px;
                    height: 15px;
                }
            }
        }

    }

    .form-textarea {
        .n-input {
            border-radius: 7px;

        }
    }

    .form-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .action-emoji {
        width: 25px;
        height: 25px;
        color: var(--theme-text-color);
        margin-right: 10px;
        cursor: pointer;
    }

    .action-btn {
        font-size: 12px;
        border-radius: 7px;
        padding: 7px 20px;
        cursor: pointer;
        user-select: none;
    }
}

.emoji-popover {
    padding: 0 !important;
}
</style>