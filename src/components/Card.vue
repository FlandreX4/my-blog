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
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    animation: slideUpIn 1s;
    background-color: #fff;
}
</style>