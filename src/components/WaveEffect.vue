<template>
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
            </path>
        </defs>
        <g class="parallax">
            <!-- <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use> -->
            <use xlink:href="#gentle-wave" x="48" y="0" fill="currentColor"></use>
            <use xlink:href="#gentle-wave" x="48" y="3" fill="currentColor"></use>
            <use xlink:href="#gentle-wave" x="48" y="5" fill="currentColor"></use>
            <use xlink:href="#gentle-wave" x="48" y="7" fill="currentColor"></use>
        </g>
    </svg>
</template>

<script setup lang='ts'>

</script>

<style lang='less' scoped>
@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

.waves {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 12vh;
    min-height: 100px;
    max-height: 150px;
}

.parallax>use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    transition: color 0.3s;
}

.parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
    color: var(--theme-background-a7);
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
    color: var(--theme-background-a5);
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
    color: var(--theme-background-a3);
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 16s;
    color: var(--theme-background);
}

@media (max-width: 767px) {
    .waves {
        height: 10vh;
        min-height: 10vh;
    }
}
</style>