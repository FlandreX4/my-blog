<template>
  <div>
    <el-dialog class="search" v-model="searchVisible" width="40%" :show-close="false" :lock-scroll="false">
      <el-input v-model="input" placeholder="Search" @keyup.enter="onSearch">
        <template #prefix>
          <IconSearch />
        </template>
        <template #suffix>
          <IconExit @click="onSearch" />
        </template>
      </el-input>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import IconExit from './icons/IconExit.vue'
import IconSearch from './icons/IconSearch.vue'
import { useRouter } from 'vue-router';


const searchVisible = defineModel();
const router = useRouter();
const input = ref('');

onMounted(() => {

});

const onSearch = () => {
  if (input.value)
    router.push(`/search/${input.value}`);
}

</script>

<style lang='less' scoped>
:deep(.search) {
  .el-dialog__header {
    padding-bottom: 0;
  }

  .el-input__wrapper {
    box-shadow: none;
    font-size: 17px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .el-input__prefix-inner>:last-child {
    margin-right: 15px;
  }

  .el-input__suffix {
    cursor: pointer;
  }
}
</style>