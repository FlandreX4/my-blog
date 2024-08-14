<template>
    <div class="archive">
        <PageHeader>文章归档</PageHeader>

        <Card>
            <div class="archive-container">
                <div class="article-timeline">
                    <h1 class="archive-year">
                        2024
                    </h1>
                    <Timeline />
                </div>

                <div class="article-timeline">
                    <h1 class="archive-year">
                        2023
                    </h1>
                    <Timeline />
                </div>
            </div>

        </Card>
    </div>
</template>

<script setup lang='ts'>
import Card from '@/components/Card.vue';
import PageHeader from '@/components/PageHeader.vue'
import Timeline from '@/components/Timeline.vue';
import { onMounted } from 'vue';

onMounted(() => {

});

</script>

<style lang='less' scoped>
.archive {
    // min-height: 1500px;
}

.archive-container {
    margin-left: 50px;
}

.archive-year {
    font-size: 27px;
    font-weight: 800;
    color: #363636;
    line-height: 60px;
}
</style>