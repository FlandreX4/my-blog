<template>
  <div class="header" :class="{ 'header-bg-change': isHeaderBgChange }">
    <div class="header-left">
      <div class="header-logo">Flandre</div>
      <ul class="header-menu">
        <li>
          <RouterLink to="/">
            <n-icon :component="Home" />
            <span>首页</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/archives">
            <IconArticle />
            <span>文章</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/">
            <IconBook />
            <span>日志页面</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/">
            <IconLink />
            <span>友链</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/">
            <IconPaperPlane />
            <span>关于页面</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <div class="day-switch" :class="{ 'switch-on': isDaySwitch }" @click="daySwitchClick">
        <IconSun class="switch-sun" />
        <IconMoon class="switch-moon" />
      </div>
      <div class="search">
        <IconSearch />
      </div>
    </div>

  </div>
  <n-back-top :show="showBackTop" :right="40" />
</template>

<script setup lang='ts'>
import { Home } from '@vicons/ionicons5';
import { NIcon, NBackTop } from 'naive-ui';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconSearch from '@/components/icons/IconSearch.vue'
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import IconArticle from '@/components/icons/IconArticle.vue';
import IconBook from '@/components/icons/IconBook.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconPaperPlane from '@/components/icons/IconPaperPlane.vue';
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  GsapTimeline();
});

const isHeaderBgChange = ref(false);
const showBackTop = ref(false);
const isDaySwitch = ref(false);

const daySwitchClick = () => {
  isDaySwitch.value = !isDaySwitch.value;
}

const onScrollTriggerUpdate = (self: any) => {
  // console.log("progress", self.progress)
  if (self.progress > 0.4) {
    isHeaderBgChange.value = true;
  } else {
    isHeaderBgChange.value = false;
  }

  if (self.progress >= 1) {
    showBackTop.value = true;
  } else {
    showBackTop.value = false;
  }
}

const GsapTimeline = () => {
  let t1 = gsap.timeline({
    scrollTrigger: {
      // trigger: ".home",
      // pin: true, // 在执行时固定触发器元素
      start: "top top-=80px", // 当触发器的顶部碰到视口的顶部时
      end: '+=50%',
      scrub: 0.5, //将动画的进度直接链接到滚动条进度上
      //   end: "+=700", // 在滚动 700 px后结束
      onUpdate: onScrollTriggerUpdate,
    },
  });

  t1.to(
    ".header",
    {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      boxShadow: "inset 0 0 2px #c5c5c5d1",
    }
  );
  t1.to(
    ".header",
    {
      color: "#333",
    },
    "-=50%"
  );
  t1.fromTo(
    ".header",
    {
      backdropFilter: "saturate(100%) blur(0px)",
    },
    {
      backdropFilter: "saturate(200%) blur(30px)",
    }
  );
}

</script>

<style lang='less' scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 75px;
  padding: 8px 20%;
  z-index: 10;
  color: white;

  // box-shadow: inset 0 0 2px #c5c5c5d1;
  // -webkit-backdrop-filter: saturate(200%) blur(30px);
  // backdrop-filter: saturate(200%) blur(30px);
  // background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-bg-change {
  .header-menu {
    &>li:hover {
      background-color: rgba(141, 134, 134, 0.1);
    }
  }
}

.header-left {
  display: flex;
  align-items: center;
}

.header-logo {
  margin-right: 30px;
  font-size: 20px;
}

.header-menu {
  display: flex;
  align-items: center;

  &>li {
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.15s;

    i,
    svg {
      font-size: 13px;
      margin-right: 5px;
      width: 13px;
      height: 13px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &>a {
      padding: 10px;
      display: inline-block;
      display: flex;
      align-items: center;
    }
  }

  &>li:not(& > li:last-child) {
    margin-right: 15px;
  }
}

.header-right {
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
}

.day-switch {
  position: relative;
  width: 22px;
  height: 22px;

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-property: transform, opacity;
  }

  .switch-moon {
    opacity: 1;
    transform: rotate(0deg);
  }

  .switch-sun {
    transform: rotate(45deg);
  }
}

.switch-on {
  .switch-moon {
    opacity: 0;
    transform: rotate(-45deg);
  }

  .switch-sun {
    opacity: 1;
    transform: rotate(0deg);
  }
}

.search {
  margin-left: 13px;

  svg {
    width: 28px;
    height: 28px;
  }
}
</style>