<template>
    <div class="page-header" :class="{ 'full-screen': isFullScreen }">
        <div class="page-header-main">
            <div class="page-header-main-title md:text-4xl lg:text-4xl xl:text-5xl">
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
import { onMounted } from 'vue';
import WaveEffect from './WaveEffect.vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    isFullScreen: Boolean,
})

const emit = defineEmits(["pageDown"]);

onMounted(() => {
    GsapTimeline();
});

const pageDownClick = () => {
    // emit("pageDown", true);
}

const GsapTimeline = () => {
    let t1 = gsap.timeline({
        scrollTrigger: {
            // trigger: ".home",
            // pin: true, // 在执行时固定触发器元素
            start: "top",
            end: '+=70%',
            scrub: 0.5, //将动画的进度直接链接到滚动条上
            //   end: "+=700", // 在滚动 700 px后结束
        },
    });

    t1.to(
        ".page-header-main-title",
        {
            translateY: props.isFullScreen ? "45vh" : "35vh",
        }
    );
}

</script>

<style lang='less' scoped>
.page-header {
    width: 100%;
    height: 70vh;
    background: url("@/assets/img/bg.webp") no-repeat;
    background-size: cover;
    position: relative;
    background-attachment: fixed;

    // z-index: -1;
    &::before {
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
}
</style>