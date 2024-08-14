<template>
    <div class="timeline">
        <div class=" timeline-item">
            <div class="timeline-icon">
                12月
            </div>
            <div>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
            </div>
        </div>

        <div class=" timeline-item">
            <div class="timeline-icon">
                3月
            </div>
            <div>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
            </div>
        </div>
        <div class=" timeline-item">
            <div class="timeline-icon">
                3月
            </div>
            <div>
                <a href="" class="timeline-item-container">
                    <span>03-06</span>
                    <span>[记录] 注册表修改jar文件打开方式</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';

onMounted(() => {

});

</script>

<style lang='less' scoped>
.timeline {
    position: relative;

    &::before {
        position: absolute;
        top: 0;
        left: 25px;
        height: 100%;
        border-left: 1px solid;
        border-color: inherit;
        content: "";
    }

    .timeline-item {
        padding: 2px 0 2px 50px;
        position: relative;
    }

    .timeline-icon {
        background-color: #b7c1c7;
        top: 22.5px;
        left: 24px;
        padding: 0 10px;
        border-radius: 28px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        line-height: 2;
        transform: translate(-50%, -50%) scale(.75);
        position: absolute;
        letter-spacing: 1px;
    }

    .timeline-item-container {
        display: block;
        position: relative;
        display: block;
        margin-left: 21px;
        padding: 8px 0;
        line-height: 24px;
        transition: color .15s;
        color: #52616a;
        transition: all 0.2s;

        &::before {
            position: absolute;
            top: 50%;
            left: -14px;
            content: "-";
            opacity: 0.63;
            transform: translateY(-50%);
        }

        &:hover {
            opacity: 0.7;
        }

        &>span {
            font-size: 16px;
        }

        &>span:nth-child(1) {
            padding-right: 7px;
            white-space: nowrap;
            letter-spacing: 1px;
            font-size: 12px;
            opacity: .63;
        }
    }
}
</style>