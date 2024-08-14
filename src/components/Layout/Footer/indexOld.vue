<template>
  <div class="footer">
    <div class="footer-container">
      <div>1231231</div>
      <div class="badges">
        <a href="javascript:void(0)" class="badg-item">
          <span>Powered </span>
          <span>Halo</span>
        </a>
        <a href="javascript:void(0)" class="badg-item">
          <span>Theme</span>
          <span>Vue</span>
        </a>
        <a href="javascript:void(0)" class="badg-item">
          <span>运行</span>
          <span>1397天3小时38分7秒</span>
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
.footer {
  padding-bottom: 30px;
  padding-top: 30px;
  text-align: center;
  border-top: 1px solid rgba(30, 35, 42, .06);
  box-shadow: 0 4px 10px 10px #0000000d;
  transition: background .6s ease-in-out, padding .6s ease-in-out;
  margin-top: 30px;
}

.footer-container {
  width: 1150px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badgs {
  display: flex;
}

.badg-item {
  display: inline-block;
  border-radius: 4px;
  background-color: #4d4d4d;
  color: white;
  font-size: 12px;

  &:not(&:last-child) {
    margin-right: 5px;
  }

  &>span {
    padding: 6px 4px 4px 6px;
    display: inline-block;
  }

  &>span:nth-child(2) {
    background-color: #007ec6;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.badg-item:nth-child(2) {
  &>span:nth-child(2) {
    background-color: #e05d44;
  }
}

.badg-item:nth-child(3) {
  &>span:nth-child(2) {
    background-color: #ffa500;
  }
}
</style>