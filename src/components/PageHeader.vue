<template>
    <div class="page-header" :class="{ 'full-screen': isFullScreen }">
        <div class="page-header-bg" :style="getBgUrl" />
        <div class="page-header-main">
            <div class="page-header-main-title md:text-4xl lg:text-4xl xl:text-5xl"
                :style="`transform: translate3d(0, ${offsetY}px, 0)`">
                <slot>Flandre's Blog</slot>
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
import { useScroll } from '@vueuse/core'

const props = defineProps({
    isFullScreen: Boolean, //是否高度铺满
    bgUrl: String //背景图片链接
})

const emit = defineEmits(["pageDown"]);

const { y } = useScroll(window);
let pageHeaderDom: any = undefined;

onMounted(() => {
    pageHeaderDom = document.querySelector(".page-header");
});

const getBgUrl = computed(() => props.bgUrl ? `background-image: url(${props.bgUrl})` : "");
// const getBgUrl = computed(() => props.bgUrl ? props.bgUrl : new URL("@/assets/img/bg.webp", import.meta.url).href);

const offsetY = computed(() => {
    return y.value < pageHeaderDom?.offsetHeight ? y.value : pageHeaderDom?.offsetHeight;
})

const pageDownClick = () => {
    // emit("pageDown", true);
}

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
    background-color: #111827;
    
    // animation: fade-down .3s;
    
    // background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    // animation: gradientBG 15s ease infinite;
    // background-size: 400% 400%;

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
        bottom: 60px;
        left: 50%;
        transform: translate(-50%, 0);
        cursor: pointer;
        user-select: none;
        z-index: 1;
        display: none;
    }
}

.full-screen {
    height: 100vh;

    .page-down {
        display: initial;
    }
}

.page-header-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("@/assets/img/bg.webp");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
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
    // position: fixed;
    position: relative;
    // position: sticky;
    // top: 50%;
    z-index: -1;
    animation: fade-down .3s;
}
</style>