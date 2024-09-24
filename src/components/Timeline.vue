<template>
    <div class="timeline">
        <div class=" timeline-item" v-for="item in list" :key="item.month">
            <div class="timeline-icon">
                {{ item.month }}月
            </div>
            <div class="timeline-item-container" v-for="childItem in item.posts">
                <RouterLink :to="`/archives/${childItem.slug}`">
                    <span>{{ dayjs(childItem.createTime).format("MM-DD") }}</span>
                    <span class="timeline-item-title">{{ childItem.title }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import dayjs from "dayjs";

const props = defineProps({
    list: Array<any>,
});

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
        // background-color: #b7c1c7;
        background-color: #d4d4d4;
        top: 24px;
        left: 24px;
        padding: 0 10px;
        border-radius: 4px;
        color: var(--theme-grey-2);
        text-transform: uppercase;
        font-weight: 600;
        line-height: 2;
        transform: translate(-50%, -50%) scale(.75);
        position: absolute;
        letter-spacing: 1px;
    }

    .timeline-item-container {
        transition: color .15s;
        // color: #52616a;
        color: var(--theme-blue-2);
        transition: all 0.2s;

        &>a {
            display: flex;
            margin-left: 21px;
            position: relative;
            line-height: 28px;
            padding: 8px 0;

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

            &::before {
                position: absolute;
                top: 22px;
                left: -14px;
                content: "-";
                opacity: 0.63;
                transform: translateY(-50%);
            }
        }

        .timeline-item-title {
            transition: box-shadow .5s cubic-bezier(.71, 0, 0, .99);
            display: table-cell;

            &:hover {
                box-shadow: inset 0 -.8em var(--theme-shadow-color-3);
            }
        }
    }
}
</style>