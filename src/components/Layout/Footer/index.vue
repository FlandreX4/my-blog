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
            <div>湘ICP备2021006182号-1</div>
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

@keyframes my-face {

    2%,
    24%,
    80% {
        -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
        -moz-transform: translate(0, 1.5px) rotate(1.5deg);
        -ms-transform: translate(0, 1.5px) rotate(1.5deg);
        -o-transform: translate(0, 1.5px) rotate(1.5deg);
        transform: translate(0, 1.5px) rotate(1.5deg);
    }

    4%,
    68%,
    98% {
        -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
        -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
        -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
        -o-transform: translate(0, -1.5px) rotate(-0.5deg);
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }

    38%,
    6% {
        -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
        -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
        -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
        -o-transform: translate(0, 1.5px) rotate(-1.5deg);
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }

    8%,
    86% {
        -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
        -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
        -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
        -o-transform: translate(0, -1.5px) rotate(-1.5deg);
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }

    10%,
    72% {
        -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
        -moz-transform: translate(0, 2.5px) rotate(1.5deg);
        -ms-transform: translate(0, 2.5px) rotate(1.5deg);
        -o-transform: translate(0, 2.5px) rotate(1.5deg);
        transform: translate(0, 2.5px) rotate(1.5deg);
    }

    12%,
    64%,
    78%,
    96% {
        -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
        -moz-transform: translate(0, -0.5px) rotate(1.5deg);
        -ms-transform: translate(0, -0.5px) rotate(1.5deg);
        -o-transform: translate(0, -0.5px) rotate(1.5deg);
        transform: translate(0, -0.5px) rotate(1.5deg);
    }

    14%,
    54% {
        -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
        -moz-transform: translate(0, -1.5px) rotate(1.5deg);
        -ms-transform: translate(0, -1.5px) rotate(1.5deg);
        -o-transform: translate(0, -1.5px) rotate(1.5deg);
        transform: translate(0, -1.5px) rotate(1.5deg);
    }

    16% {
        -webkit-transform: translate(0, -0.5px) rotate(-1.5deg);
        -moz-transform: translate(0, -0.5px) rotate(-1.5deg);
        -ms-transform: translate(0, -0.5px) rotate(-1.5deg);
        -o-transform: translate(0, -0.5px) rotate(-1.5deg);
        transform: translate(0, -0.5px) rotate(-1.5deg);
    }

    18%,
    22% {
        -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);
        -moz-transform: translate(0, 0.5px) rotate(-1.5deg);
        -ms-transform: translate(0, 0.5px) rotate(-1.5deg);
        -o-transform: translate(0, 0.5px) rotate(-1.5deg);
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }

    20%,
    36%,
    46% {
        -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
        -moz-transform: translate(0, -1.5px) rotate(2.5deg);
        -ms-transform: translate(0, -1.5px) rotate(2.5deg);
        -o-transform: translate(0, -1.5px) rotate(2.5deg);
        transform: translate(0, -1.5px) rotate(2.5deg);
    }

    26%,
    50% {
        -webkit-transform: translate(0, 0.5px) rotate(0.5deg);
        -moz-transform: translate(0, 0.5px) rotate(0.5deg);
        -ms-transform: translate(0, 0.5px) rotate(0.5deg);
        -o-transform: translate(0, 0.5px) rotate(0.5deg);
        transform: translate(0, 0.5px) rotate(0.5deg);
    }

    28% {
        -webkit-transform: translate(0, 0.5px) rotate(1.5deg);
        -moz-transform: translate(0, 0.5px) rotate(1.5deg);
        -ms-transform: translate(0, 0.5px) rotate(1.5deg);
        -o-transform: translate(0, 0.5px) rotate(1.5deg);
        transform: translate(0, 0.5px) rotate(1.5deg);
    }

    30%,
    40%,
    62%,
    76%,
    88% {
        -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
        -moz-transform: translate(0, -0.5px) rotate(2.5deg);
        -ms-transform: translate(0, -0.5px) rotate(2.5deg);
        -o-transform: translate(0, -0.5px) rotate(2.5deg);
        transform: translate(0, -0.5px) rotate(2.5deg);
    }

    32%,
    34%,
    66% {
        -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
        -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
        -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
        -o-transform: translate(0, 1.5px) rotate(-0.5deg);
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }

    42% {
        -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
        -moz-transform: translate(0, 2.5px) rotate(-1.5deg);
        -ms-transform: translate(0, 2.5px) rotate(-1.5deg);
        -o-transform: translate(0, 2.5px) rotate(-1.5deg);
        transform: translate(0, 2.5px) rotate(-1.5deg);
    }

    44%,
    70% {
        -webkit-transform: translate(0, 1.5px) rotate(0.5deg);
        -moz-transform: translate(0, 1.5px) rotate(0.5deg);
        -ms-transform: translate(0, 1.5px) rotate(0.5deg);
        -o-transform: translate(0, 1.5px) rotate(0.5deg);
        transform: translate(0, 1.5px) rotate(0.5deg);
    }

    48%,
    74%,
    82% {
        -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
        -moz-transform: translate(0, -0.5px) rotate(0.5deg);
        -ms-transform: translate(0, -0.5px) rotate(0.5deg);
        -o-transform: translate(0, -0.5px) rotate(0.5deg);
        transform: translate(0, -0.5px) rotate(0.5deg);
    }

    52%,
    56%,
    60% {
        -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
        -moz-transform: translate(0, 2.5px) rotate(2.5deg);
        -ms-transform: translate(0, 2.5px) rotate(2.5deg);
        -o-transform: translate(0, 2.5px) rotate(2.5deg);
        transform: translate(0, 2.5px) rotate(2.5deg);
    }

    58% {
        -webkit-transform: translate(0, 0.5px) rotate(2.5deg);
        -moz-transform: translate(0, 0.5px) rotate(2.5deg);
        -ms-transform: translate(0, 0.5px) rotate(2.5deg);
        -o-transform: translate(0, 0.5px) rotate(2.5deg);
        transform: translate(0, 0.5px) rotate(2.5deg);
    }

    84% {
        -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
        -moz-transform: translate(0, 1.5px) rotate(2.5deg);
        -ms-transform: translate(0, 1.5px) rotate(2.5deg);
        -o-transform: translate(0, 1.5px) rotate(2.5deg);
        transform: translate(0, 1.5px) rotate(2.5deg);
    }

    90% {
        -webkit-transform: translate(0, 2.5px) rotate(-0.5deg);
        -moz-transform: translate(0, 2.5px) rotate(-0.5deg);
        -ms-transform: translate(0, 2.5px) rotate(-0.5deg);
        -o-transform: translate(0, 2.5px) rotate(-0.5deg);
        transform: translate(0, 2.5px) rotate(-0.5deg);
    }

    92% {
        -webkit-transform: translate(0, 0.5px) rotate(-0.5deg);
        -moz-transform: translate(0, 0.5px) rotate(-0.5deg);
        -ms-transform: translate(0, 0.5px) rotate(-0.5deg);
        -o-transform: translate(0, 0.5px) rotate(-0.5deg);
        transform: translate(0, 0.5px) rotate(-0.5deg);
    }

    94% {
        -webkit-transform: translate(0, 2.5px) rotate(0.5deg);
        -moz-transform: translate(0, 2.5px) rotate(0.5deg);
        -ms-transform: translate(0, 2.5px) rotate(0.5deg);
        -o-transform: translate(0, 2.5px) rotate(0.5deg);
        transform: translate(0, 2.5px) rotate(0.5deg);
    }

    0%,
    100% {
        -webkit-transform: translate(0, 0) rotate(0);
        -moz-transform: translate(0, 0) rotate(0);
        -ms-transform: translate(0, 0) rotate(0);
        -o-transform: translate(0, 0) rotate(0);
        transform: translate(0, 0) rotate(0);
    }
}
</style>