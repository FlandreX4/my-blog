<template>
    <div class="particles" :class="{ 'particles-scroll': showClass() }">
        <div class="particles-layer particles-layer-1"></div>
        <div class="particles-layer particles-layer-2"></div>
        <div class="particles-layer particles-layer-3"></div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { gsap } from "gsap";
import { useScroll } from '@vueuse/core';
import { getOffsetTop } from "@/utils/util";


let particlesDom: any;
const particlesOffsetTop = ref();
const { y } = useScroll(window);
let particlesList = [
    {
        el: ".particles-layer-1",
        opacity: 0.07,
        speed: 0.06 //1像素移动速度
    },
    {
        el: ".particles-layer-2",
        opacity: 0.07,
        speed: 0.04 //1像素移动速度
    },
    {
        el: ".particles-layer-3",
        opacity: 0.07,
        speed: 0.05 //1像素移动速度
    },
];

onMounted(() => {
    addEventListener("mousemove", particlesMousemove)
    particlesDom = document.querySelector(".particles");
    //获取遮罩层距离顶部的offsetTop
    particlesOffsetTop.value = getOffsetTop(particlesDom);
});
//脱离文档流挡防止内容高度变化造成页面回流(重排)导致的性能问题
const showClass = () => {
    return particlesOffsetTop.value && y.value >= particlesOffsetTop.value;
}

// //对比遮罩层是否大于内容层，防止遮罩层撑大内容层
// const isParticlesScroll = () => {
//     //body高度减去遮罩层距离顶部的offsetTop
//     let h = document.body.offsetHeight - particlesOffsetTop.value;
//     return particlesDom && h >= particlesDom.offsetHeight;
// }

function particlesMousemove(e: MouseEvent) {
    if (window.innerWidth <= 767) {
        return;
    }
    let t = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
        , n = {
            x: e.clientX || e.pageX,
            y: e.clientY || e.pageY
        }
        , r = {
            x: t.x - n.x, //内容区域中心 0
            y: t.y - n.y //内容区域中心 0
        };

    for (let i = 0; i < particlesList.length; i++) {
        let l = particlesList[i];
        gsap.to(l.el, {
            duration: 1,
            x: r.x * l.speed,
            y: r.y * l.speed
        });
    }
}


</script>

<style lang='less' scoped>
.particles {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: -2;
    pointer-events: none;
    background-color: var(--theme-background);
    transition: background-color 0.3s;
}

.particles-scroll {
    position: fixed;
}

.particles-layer {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    background-repeat: repeat;
    background-position: 50%;
    opacity: 0.04;
    display: block;
}

html[theme] .particles-layer {
    opacity: 0.07;
}

.particles-layer-1 {
    background-image: url("@/assets/img/dynamicBg/dbg1.svg");
}

.particles-layer-2 {
    background-image: url("@/assets/img/dynamicBg/dbg2.svg");
}

.particles-layer-3 {
    background-image: url("@/assets/img/dynamicBg/dbg3.svg");
}

@media (max-width: 767px) {
    .particles-layer {
        display: none;
    }
}
</style>