<template>
    <div class="side-card">
        <div class="author-avatar">
            <img :src="store.getUserInfo.value?.avatar" alt="">
        </div>
        <div class="author-name">{{ store.getUserInfo.value?.nickname }}</div>
        <div class="site-desc">{{ store.getUserInfo.value?.description }}</div>
        <div class="blog-container">
            <span>
                <RouterLink to="/archives">文章</RouterLink>
            </span>
            <span>
                <RouterLink to="/journals">日志</RouterLink>
            </span>
            <span>
                <RouterLink to="/about">关于页面</RouterLink>
            </span>
        </div>
        <div class="social-container">
            <a :href="themeSettingsStore.getThemeSettings.value?.github" target="_blank">
                <IconGithub />
            </a>
            <a :href="`mailto:${themeSettingsStore.getThemeSettings.value?.mail}`" target="_blank">
                <IconYellowEmail />
            </a>
            <a :href="themeSettingsStore.getThemeSettings.value?.zhihu" target="_blank">
                <IconQQ />
            </a>
            <a :href="themeSettingsStore.getThemeSettings.value?.weibo" target="_blank">
                <IconBilibili />
            </a>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import { useThemeSettingsStore } from "@/stores/themeSettings";
import IconBilibili from '@/components/icons/IconBilibili.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconYellowEmail from '@/components/icons/IconYellowEmail.vue'
import IconQQ from '@/components/icons/IconQQ.vue'

const store = useUserStore();
const themeSettingsStore = useThemeSettingsStore();

onMounted(() => {

});

</script>

<style lang='less' scoped>
.side-card {
    width: 100%;
    // min-height: 320px;
    padding: 30px 16px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--theme-background);
    color: var(--theme-text-color);

    .author-avatar {
        width: 100px;
        height: 100px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            // padding: 2px;
            border-radius: 50%;
            // box-shadow: 0 0 16px 10px #f7f7f7;
            // border: 1px solid #f7f7f7;
            box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        }
    }

    .author-name {
        font-size: 15px;
        margin-top: 15px;
        font-weight: 900;
        font-family: 'Ubuntu', sans-serif;
        letter-spacing: 1.5px;
        text-align: center;
        color: var(--theme-grey-7);
    }

    .site-desc {
        margin-top: 10px;
        text-align: center;
        color: #999;
    }

    .blog-container {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        line-height: 1.5;
        text-align: center;

        &>span {
            color: var(--theme-grey-7);
            padding: 0 11px;

            a {
                cursor: pointer;
            }
        }

        &>span:not(& > span:first-child) {
            border-left: 1px solid #ccc;
        }
    }

    .social-container {
        margin-top: 15px;
        display: flex;

        svg {
            width: 20px;
            height: 20px;
        }

        &>a:not(& > a:last-child) {
            margin-right: 15px;
        }
    }
}
</style>