<template>
    <div>
        <RouterLink class="list-item" :to="`/archives/${item.slug}`" v-for="(item, index) in list" :key="item.id"
            :style="`animation-delay: ${index * 0.2}s;`">
            <div class="list-item-img">
                <img v-if="item.thumbnail" :src="getThumbnail(item.thumbnail)" alt="" />
            </div>
            <div class="list-info">
                <div class="list-meta">
                    <span>
                        <n-icon :component="CalendarOutline" />
                        {{ item.createTime && dayjs(item.createTime).format("YYYY-MM-DD") }}
                    </span>
                    <span v-for="tagItem in item.tags" :key="tagItem.id">
                        <RouterLink :to="`/tags/${tagItem.slug}`">
                            <n-icon :component="Pricetags" />
                            {{ tagItem.name }}
                        </RouterLink>
                    </span>
                </div>
                <div class="list-title">
                    {{ item.title }}
                </div>
                <div class="list-content">
                    {{ item.summary }}
                </div>
                <div class="list-category">
                    <span v-for="categoryItem in item.categories" :key="categoryItem.id">
                        <RouterLink :to="`/categories/${categoryItem.slug}`">
                            <n-icon :component="Flag" />
                            {{ categoryItem.name }}
                        </RouterLink>
                    </span>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang='ts'>
import { CalendarOutline, Pricetags, Flag } from '@vicons/ionicons5';
import { onMounted } from 'vue';
import { getThumbnail } from "@/utils/util";
import { NIcon } from 'naive-ui';
import dayjs from "dayjs";

const props = defineProps({
    list: Array<any>,
})

onMounted(() => {

});

</script>

<style lang='less' scoped>
.list-item {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px -15px var(--theme-shadow-color);
    transition: all .2s;
    background-color: var(--theme-background);
    height: 230px;
    animation: top20 1s;
    animation-fill-mode: both;
    opacity: 0;
    color: var(--theme-text-color);

    &:hover {
        box-shadow: 0 0 24px var(--theme-shadow-color);

        .list-item-img img {
            transform: scale(1.05) rotate(1deg);
        }
    }

    &:not(&:last-child) {
        margin-bottom: 20px;
    }
}

.list-item:nth-child(2n) {
    flex-direction: row-reverse;

    .list-item-img {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
        margin-right: initial;
        margin-left: 25px;
    }

    .list-info {
        padding: 16px 0 48px 25px;
    }

    .list-meta {
        justify-content: flex-start;
    }

    .list-category {
        justify-content: flex-end;
    }
}

.list-item-img {
    width: 50%;
    margin-right: 25px;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
    position: relative;

    &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        animation: gradientBG 15s ease infinite;
        background-size: 400% 400%;
        opacity: 0.3;
        z-index: -1;
    }

    img {
        width: 100%;
        height: 100%;
        transition: all 0.2s;
        object-fit: cover;
    }
}

.list-info {
    padding: 16px 25px 48px 0;
    width: 50%;
    position: relative;
}

.list-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    color: #999;

    &>span {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        i {
            margin-right: 2px;
        }
    }

    &>span:not(& > span:first-child) {
        margin-left: 15px;
    }
}

.list-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: .625rem 0;
    color: #e9546b;
    overflow: hidden;
    font-weight: 700;
    font-size: 18px;
}

.list-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    max-height: 80px;
    font-size: 14px;
    overflow: hidden;
}

.list-category {
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 8px;
    font-size: 13px;
    color: #999;

    &>span:not(&>span:last-child) {
        margin-right: 10px;
    }
}
</style>