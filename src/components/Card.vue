<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang='less' scoped>
.card {
    margin: 0 auto;
    padding: 28px 36px;
    border-radius: 12px;
    box-shadow: 0 0 16px var(--theme-shadow-color);
    animation: slideUpIn 1s;
    background-color: var(--theme-background);
    overflow: hidden;
}
</style>