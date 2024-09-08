<template>
    <div class="page-layout">
        <DynamicBackground />
        <div class="page-layout-container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import DynamicBackground from "@/components/Layout/DynamicBackground.vue";

</script>

<style lang='less' scoped>
.page-layout {
    position: relative;
    overflow: hidden;
    z-index: 1;

    .page-layout-container {
        max-width: 970px;
        width: calc(100% - 20px);
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 30px;
    }
}
</style>