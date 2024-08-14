<template>
    <div class="particles">
        <div class="particles-layer particles-layer-1"></div>
        <div class="particles-layer particles-layer-2"></div>
        <div class="particles-layer particles-layer-3"></div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { gsap } from "gsap";

onMounted(() => {
    addEventListener("mousemove", particlesMousemove)
});

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

function particlesMousemove(e: MouseEvent) {
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
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    opacity: 0.6;
    z-index: -2;
    pointer-events: none;
}

.particles-layer {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    background-repeat: repeat;
    background-position: 50%;
    opacity: 0.07;
    display: block;
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
</style>