<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang='less' scoped>
.card {
    width: calc(100% - .625rem);
    margin: 24px auto;
    padding: 28px 36px;
    border-radius: 12px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    animation: slideUpIn 1s;
    background-color: #fff;
}

@keyframes slideUpIn {
    0% {
        opacity: 0;
        transform: translateY(40px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

@media (min-width: 1200px) {
    .card {
        width: 968px;
    }
}

@media (max-width: 767px) {
    .card {
        padding: 16px 14px;
    }
}
</style>