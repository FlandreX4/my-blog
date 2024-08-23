<template>
    <div class="catalog-header">
        <n-icon :component="List" />
        目录
    </div>
    <div class="catalog-content">
        <div class="catalog-item" v-for="(anchor, index) of titleList" :key="anchor.title"
            :class="currentIndex === index ? 'active' : ''" :style="{ paddingLeft: `${5 + anchor.indent * 15}px` }"
            @click="handleAnchorClick(anchor, index)">
            <a> {{ anchor.title }} </a>
        </div>

        <div class="catalog-item" v-for="(anchor, index) of titleList" :key="anchor.title"
            :class="currentIndex === index ? 'active' : ''" :style="{ paddingLeft: `${5 + anchor.indent * 15}px` }"
            @click="handleAnchorClick(anchor, index)">
            <a> {{ anchor.title }} </a>
        </div>

        <div class="catalog-item" v-for="(anchor, index) of titleList" :key="anchor.title"
            :class="currentIndex === index ? 'active' : ''" :style="{ paddingLeft: `${5 + anchor.indent * 15}px` }"
            @click="handleAnchorClick(anchor, index)">
            <a> {{ anchor.title }} </a>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { List } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
// import { useScroll, watchThrottled, useRafFn } from '@vueuse/core';

const props = defineProps({
    domRef: {
        type: Object,
        default: null,
    }
});
const titleList = ref<any>([]);
const currentIndex = ref(0);

onMounted(() => {
    window.addEventListener("scroll", onScroll)
    nextTick(() => {
        getTitles();
    })
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
})

const getTitles = () => {
    const anchors = props.domRef.$el.querySelectorAll('h1,h2,h3')
    const titles = Array.from(anchors).filter((t: any) => !!t.innerText.trim())
    if (!titles.length)
        titleList.value = []
    const hTags = Array.from(new Set(titles.map((t: any) => t.tagName))).sort()
    titleList.value = titles.map((el: any, idx: number) => {
        return {
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
        }
    })
}

// 点击锚点目录
function handleAnchorClick(anchor: any, idx: number) {
    const heading = props.domRef.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`)
    // const heading = preview.querySelector(`#${anchor.title}`)
    if (heading) {
        console.log('offsetTop:', heading, heading.offsetTop, heading.offsetParent.offsetTop)
        window.scrollTo({
            top: heading.offsetTop + heading.offsetParent.offsetTop - 90,
            behavior: 'smooth',
        })
        setTimeout(() => currentIndex.value = idx, 600)
    }
}

// * 实现目录高亮当前位置的标题
// 思路: 循环的方式将标题距离顶部距离与滚动条当前位置对比, 来确定高亮的标题
// const { y } = useScroll(window)

let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(realFunc);
        ticking = true;
    }
}

function realFunc() {
    let y = window.scrollY;
    titleList.value.forEach((e: any, idx: number) => {
        const heading = props.domRef.$el.querySelector(`[data-v-md-line="${e.lineIndex}"]`)
        if (y >= heading.offsetTop + heading.offsetParent.offsetTop - 120) // 比 90 稍微多一点
            currentIndex.value = idx
    })
    ticking = false;
}

</script>

<style lang='less' scoped>
.catalog-header {
    display: flex;
    align-items: center;
    font-size: 16px;

    i {
        font-size: 18px;
        margin-right: 5px;
    }
}

.catalog-content {
    max-height: calc(100vh - 160px);
    overflow: auto;
    margin-right: -16px;
    padding-right: 16px;
    line-height: 2;
}

.catalog-item {
    margin: 5px 0;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 14px;
    padding: 2px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 3px;

    &:hover {
        color: #67709f;
    }
}

.active {
    background-color: #67709f;
    color: #fff;

    &:hover {
        background-color: #8391d4;
        color: #fff;
    }
}
</style>