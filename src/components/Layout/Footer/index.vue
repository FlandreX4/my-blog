<template>
    <div class="footer">
        <div class="footer-bg">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="footer-box">
            <div>
                <span>This blog has running : 1567 d 9 h 46 m 29 s </span>
                <span class="my-face">ღゝ◡╹)ノ♡</span>
            </div>
            <div>
                <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">湘ICP备2021006182号-1 </a>
            </div>
            <div>Copyright © 2024 Flandre Nya~ Powered by Vue</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';

onMounted(() => {

});

</script>

<style lang='less' scoped>
@import "@/assets/css/myface.css";

.footer {
    min-height: 100px;
    margin: 20vh 0 0 0;
    left: 0;
    right: 0;
    padding: 15px 0;
    color: #888;
    line-height: 1.5;
    position: absolute;
    font-size: 12px;
}

.footer-bg {
    bottom: 72.5px;
    left: 0;
    height: 180px;
    position: absolute;
    width: 100%;
    z-index: -1;
    transform: translate3d(0, 0, 0);

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

.footer-box {
    width: 70%;
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