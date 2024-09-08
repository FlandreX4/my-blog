<template>
    <div class="page-header" :class="{ 'full-screen': isFullScreen }">
        <img class="page-header-bg" :src="getBgUrl" />
        <div class="page-header-main">
            <div class="page-header-main-title text-4xl md:text-4xl lg:text-4xl xl:text-5xl">
                <slot>{{ store.getUserInfo.value?.username }}'s Blog</slot>
            </div>
            <div class="page-down" @click="$emit('pageDown', true)">
                <n-icon class="animate-bounce" size="40" :component="ChevronDownOutline" />
            </div>
            <WaveEffect />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ChevronDownOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { computed, onMounted } from 'vue';
import WaveEffect from './WaveEffect.vue';
import { useUserStore } from "@/stores/user";

const props = defineProps({
    isFullScreen: Boolean, //是否高度铺满
    bgUrl: String //背景图片链接
})

const emit = defineEmits(["pageDown"]);
const store = useUserStore();

onMounted(() => {

});

// const getBgUrl = computed(() => props.bgUrl ? `background-image: url(${props.bgUrl})` : "");
const getBgUrl = computed(() => props.bgUrl ? props.bgUrl : new URL("@/assets/img/bg.webp", import.meta.url).href);


</script>

<style lang='less' scoped>
@keyframes fade-down {
    0% {
        transform: translateY(-20px); //会影响background-attachment的fixed定位 nnd
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadein {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.page-header {
    width: 100%;
    height: 70vh;
    position: relative;
    z-index: -2;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKUlEQVQImU3IMREAIAgAwJfNkQCEsH8cijjpMf6vnXlQaIiJFx+omEBfmqIEZLe2jzcAAAAASUVORK5CYII=");
    }

    .page-down {
        position: absolute;
        bottom: 70px;
        left: 50%;
        transform: translate(-50%, 0);
        cursor: pointer;
        user-select: none;
        z-index: 1;
        display: none;
        color: var(--theme-svg-color-0);
    }
}

.full-screen {
    height: calc(var(--vh, 1vh) * 100);
    transition: all 0.3s;

    .page-down {
        display: initial;
    }

    .page-header-bg {
        height: 100vh;
    }
}

.page-header-bg {
    width: 100%;
    height: 70vh;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -9;
    // background: url("@/assets/img/bg.webp");
    // background-repeat: no-repeat;
    // background-size: 100% 800px;
    // background-position: center;
    // background-attachment: fixed;
    animation: fadein 1s ease-in-out;

}

.page-header-main {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
}

.page-header-main-title {
    position: fixed;
    z-index: -1;
    animation: fade-down .3s;
}
</style>