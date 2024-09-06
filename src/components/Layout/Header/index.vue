<template>
  <div class="header" :class="{ 'header-bg-change': isHeaderBgChange }">
    <div class="header-left">
      <div class="header-logo">{{ store.getUserInfo.value?.username }}</div>
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
          <RouterLink to="/journals">
            <IconBook />
            <span>日志页面</span>
          </RouterLink>
        </li>
        <!-- <li>
          <RouterLink to="/links">
            <IconLink />
            <span>友链</span>
          </RouterLink>
        </li> -->
        <li>
          <RouterLink to="/about">
            <IconPaperPlane />
            <span>关于页面</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <DaySwitch @change="switchChange" />
      <div class="search">
        <IconSearch @click="() => searchVisible = !searchVisible" />
      </div>
    </div>

  </div>
  <Search v-model="searchVisible" />
  <n-back-top :show="showBackTop" :right="40" />
</template>

<script setup lang='ts'>
import { Home } from '@vicons/ionicons5';
import { NIcon, NBackTop } from 'naive-ui';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconSearch from '@/components/icons/IconSearch.vue'
import { nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { usePageRouterStore } from "@/stores/user";
import IconArticle from '@/components/icons/IconArticle.vue';
import IconBook from '@/components/icons/IconBook.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconPaperPlane from '@/components/icons/IconPaperPlane.vue';

import { getUserInfo } from "@/api/user";
import Search from '@/components/Search.vue'
import DaySwitch from '../../DaySwitch.vue'

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  getUser();
  GsapTimeline();
});

let t1: any = undefined;
const isHeaderBgChange = ref(false);
const showBackTop = ref(false);
const searchVisible = ref(false);
const store = usePageRouterStore();

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

const getUser = () => {
  getUserInfo().then(({ data }) => {
    store.setUserInfo(data.data);
  })
}

const getTheme = () => document.documentElement.getAttribute("theme");

const getEleAttribute = (cssName: string) => getComputedStyle(document.documentElement).getPropertyValue(cssName);

const switchChange = () => {
  gsapInit();
}

const gsapInit = () => {
  t1.kill();
  let dom: any = document.querySelector(".header");
  dom.style.cssText = "";
  nextTick(() => {
    GsapTimeline();
  })
}

const GsapTimeline = () => {
  t1 = gsap.timeline({
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
  console.log('进入:', t1, getEleAttribute("--theme-background-a7"));


  t1.to(
    ".header",
    {
      // backgroundColor: "rgba(255, 255, 255, 0.8)",
      backgroundColor: getEleAttribute("--theme-background-a7"),
      boxShadow: getTheme() ? "inset 0 0 2px rgba(197, 197, 197, 0.18)" : "inset 0 0 2px rgba(197, 197, 197, 0.82)",
    }
  );
  t1.to(
    ".header",
    {
      color: getTheme() ? getEleAttribute("--theme-grey-0") : "#333",
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
  color: var(--theme-grey-0);
  // transition: all 0.3s;

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

.search {
  margin-left: 13px;

  svg {
    width: 23px;
    height: 23px;
  }
}
</style>