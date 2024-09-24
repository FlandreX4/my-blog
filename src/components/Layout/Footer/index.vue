<template>
    <div class="footer">
        <div class="footer-bg">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="footer-box">
            <div>
                <span>This blog has running : {{ getRunningTime }}0</span>
                <span class="my-face">ღゝ◡╹)ノ♡</span>
            </div>
            <div>
                <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{{
                    store.getThemeSettings.value?.Icp }}</a>
            </div>
            <div>Copyright © 2024 Flandre Nya~ Powered by Vue</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { computed, onMounted, ref, watch } from 'vue';
import { useThemeSettingsStore } from "@/stores/themeSettings";
dayjs.extend(duration);

const time = ref();
const store = useThemeSettingsStore();

watch(() => store.getThemeSettings.value, () => {
    if (store.getThemeSettings.value?.TimeStatistics) {
        time.value = dayjs().diff(store.getThemeSettings.value?.TimeStatistics, "second");//获取秒
        setInterval(() => {
            time.value += 1;
        }, 1000);
    }

})

onMounted(() => {
});

const getRunningTime = computed(() => {
    return time.value && dateFormet(time.value);
})

const dateFormet = (second: number) => {
    let d = Math.floor(second / 60 / 60 / 24);
    let h = Math.floor(second / 60 / 60 % 24);
    let m = Math.floor(second / 60 % 60);
    let s = Math.floor(second % 60);
    // return `${d}天${h}小时${m}分${s}秒`;
    return `${d} d ${h} h ${m} m ${s} s `;
}


</script>

<style lang='less' scoped>
@import "@/assets/css/myface.css";

.footer {
    min-height: 100px;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    padding: 150px 0 15px 0;
    color: #888;
    line-height: 1.5;
    font-size: 12px;
    background-color: var(--theme-background);
    transition: all 0.3s;
    overflow: hidden;
}

.footer-bg {
    bottom: 72.5px;
    left: 0;
    height: 180px;
    position: absolute;
    width: 100%;
    // z-index: -1;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s;
    overflow: hidden;

    &>div {
        height: 150px;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        background-repeat: repeat-x;
    }

    &>div:nth-child(1) {
        background: url("@/assets/img/footer/fbg1.webp");
        background-size: 2700px 180px;
        top: -24px;
    }

    &>div:nth-child(2) {
        background: url("@/assets/img/footer/fbg2.webp");
        background-size: 2700px 255.756px;
        top: -12px;
    }

    &>div:nth-child(3) {
        background: url("@/assets/img/footer/fbg3.webp");
        background-size: 2700px 180px;
        top: 12px;
    }
}

html[theme] .footer-bg {
    filter: invert(0.8);
}

.footer-box {
    width: 95%;
    max-width: 900px;
    text-align: center;
    margin: 0 auto;
}

.my-face {
    animation: my-face 5s infinite ease-in-out;
    display: inline-block;
    margin: 0 5px;
}
</style>