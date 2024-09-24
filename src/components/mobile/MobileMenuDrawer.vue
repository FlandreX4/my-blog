<template>
    <div>
        <el-drawer class="menu-drawer" v-model="drawer" :width="240" :with-header="false">
            <div class="user-info">
                <div class="user-avatar">
                    <img :src="userStore.getUserInfo.value?.avatar" alt="">
                </div>
                <div class="user-name">
                    <span>{{ userStore.getUserInfo.value?.nickname }}</span>
                </div>
                <div class="user-social">
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

            <ul class="menu-list">
                <li>
                    <RouterLink to="/" @click="onJump">
                        <n-icon :component="Home" />
                        <span>首页</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/archives" @click="onJump">
                        <IconArticle />
                        <span>文章</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/journals" @click="onJump">
                        <IconBook />
                        <span>日志</span>
                    </RouterLink>
                </li>
                <!-- <li>
          <RouterLink to="/links">
            <IconLink />
            <span>友链</span>
          </RouterLink>
        </li> -->
                <li>
                    <RouterLink to="/about" @click="onJump">
                        <IconPaperPlane />
                        <span>关于</span>
                    </RouterLink>
                </li>
            </ul>
        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { NIcon } from 'naive-ui';
import { Home } from '@vicons/ionicons5';
import { useUserStore } from "@/stores/user";
import { useThemeSettingsStore } from "@/stores/themeSettings";
import IconBilibili from '../icons/IconBilibili.vue'
import IconGithub from '../icons/IconGithub.vue'
import IconYellowEmail from '../icons/IconYellowEmail.vue'
import IconQQ from '../icons/IconQQ.vue'


const drawer = defineModel();
const themeSettingsStore = useThemeSettingsStore();
const userStore = useUserStore();


onMounted(() => {

});

const onJump = () => {
    drawer.value = false;
}

</script>

<style lang='less' scoped>
:deep(.menu-drawer) {
    width: 240px !important;
    --el-drawer-bg-color: var(--theme-background);

}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .user-avatar {
        img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
        }
    }

    .user-name {
        margin: 35px 0 23px 0;

        &>span {
            color: var(--theme-color-2);
            font-size: 15px;
            font-weight: 900;
            font-family: 'Ubuntu', sans-serif;
            letter-spacing: 1.5px;
        }
    }

    .user-social {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;

        &>a:not(&>a:first-child) {
            margin-left: 20px;
        }

        svg {
            width: 15px;
            height: 15px;
        }
    }
}

.menu-list {
    color: var(--theme-color);
    i,
    svg {
        font-size: 15px;
        margin-right: 5px;
        width: 15px;
        height: 15px;
    }

    &>li>a {
        padding: 13px;
        display: flex;
        align-items: center;
        justify-content: center
    }

}
</style>