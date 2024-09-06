<template>
    <!-- <slot /> -->
    <div class="pagination" v-if="props.pages > 1">
        <nav v-show="props.page > 1" class="pagination-btn" @click="pageChange(props.page - 1)">
            <span>
                <IconRight3 />
                上一页
            </span>
        </nav>
        <nav v-show="props.page < props.pages" class="pagination-btn" @click="pageChange(props.page + 1)">
            <span>
                下一页
                <IconRight3 />
            </span>
        </nav>
    </div>
</template>

<script setup lang='ts'>
import IconRight3 from '@/components/icons/IconRight3.vue'

const props = defineProps({
    page: {
        type: Number,
        default: 0
    },
    pages: {
        type: Number,
        default: 0
    },
});
const emit = defineEmits(['pageChange']);

const pageChange = (val: any) => {
    emit('pageChange', val);
}

</script>

<style lang='less' scoped>
.pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .pagination-btn {
        &>span {
            padding: 10px 15px;
            display: flex;
            align-items: center;
            background-size: 250%;
            transition: all .4s;
            background-image: linear-gradient(130deg, transparent 50%, #777aaf 50%);
            color: var(--theme-color-2);
            border-radius: 4px;
            cursor: pointer;
        }

        svg {
            width: 16px;
            height: 16px;
            margin-left: 2px;
            color: #fff;
            opacity: 0;
            transition: all 0.2s;
        }

        &:hover {
            &>span {
                background-position: 100%;
                color: #fff;
                transform: translate(16px);
            }

            svg {
                opacity: 1;
            }
        }
    }

    .pagination-btn:nth-child(1) {
        &>span {
            // background-image: linear-gradient(220deg, transparent 50%, #f1404b 50%);
            background-image: linear-gradient(220deg, transparent 50%, #777aaf 50%);
            background-position: 100%;
        }

        svg {
            transform: rotateY(180deg);
            margin-left: 0;
            margin-right: 2px;
        }

        &:hover {
            &>span {
                background-position: 0;
                transform: translate(-16px);
            }
        }
    }

    .pagination-btn:not(.pagination-btn:last-child) {
        margin-right: 10px;
    }
}
</style>