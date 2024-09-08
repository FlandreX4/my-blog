<template>
  <div class="header" :class="{ 'header-bg-change': isHeaderBgChange }">
    <div class="header-container">
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
      <div class="mobile-header-left">
        <div class="menu-outlined" :class="{ 'menu-outlined_active': isMenuOutlined }"
          @click="() => isMenuOutlined = !isMenuOutlined">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="header-right">
        <DaySwitch @change="switchChange" />
        <div class="search">
          <IconSearch @click="() => searchVisible = !searchVisible" />
        </div>
      </div>
    </div>

  </div>
  <Search v-model="searchVisible" @searchDone="searchDone" />
  <MobileMenuDrawer v-model="isMenuOutlined" />
  <n-back-top :show="showBackTop" :right="20" />
</template>

<script setup lang='ts'>
import { Home } from '@vicons/ionicons5';
import { NIcon, NBackTop } from 'naive-ui';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconSearch from '@/components/icons/IconSearch.vue'
import { nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from "@/stores/user";
import IconArticle from '@/components/icons/IconArticle.vue';
import IconBook from '@/components/icons/IconBook.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconPaperPlane from '@/components/icons/IconPaperPlane.vue';

import Search from '@/components/Search.vue'
import DaySwitch from '../../DaySwitch.vue'
import MobileMenuDrawer from '@/components/mobile/MobileMenuDrawer.vue'

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  GsapTimeline();
});

let t1: any = undefined;
const isHeaderBgChange = ref(false);
const showBackTop = ref(false);
const searchVisible = ref(false);
const isMenuOutlined = ref(false);
const store = useUserStore();

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

const getTheme = () => document.documentElement.getAttribute("theme");

const getEleAttribute = (cssName: string) => getComputedStyle(document.documentElement).getPropertyValue(cssName);

const searchDone = (val: any) => {
  searchVisible.value = val;
}

const switchChange = () => {
  gsapInit();
}

const gsapInit = () => {
  t1.kill();
  let dom: any = document.querySelector(".header");
  let dom2: any = document.querySelector(".menu-outlined");
  dom.style.cssText = "";
  dom2.style.cssText = "";
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
  t1.to(
    ".menu-outlined",
    {
      '--bgColor': getTheme() ? getEleAttribute("--theme-grey-0") : "#333",
    },
    "<"
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
  z-index: 10;
  width: 100%;
  color: var(--theme-grey-0);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1160px;
  height: 75px;
  padding: 8px 0;
  margin: 0 auto;
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

.mobile-header-left {
  display: none;

  .menu-outlined {
    width: 22px;
    --bgColor: var(--theme-grey-0);

    &>span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--bgColor);
      transition: all 0.4s;
      position: relative;
      border-radius: 2px;

      &:not(&:first-child) {
        margin-top: 3px;
      }
    }
  }

  .menu-outlined_active {
    &>span:nth-child(1) {
      transform: translateY(5px) rotate(-45deg);
    }

    &>span:nth-child(2) {
      opacity: 0;
    }

    &>span:nth-child(3) {
      transform: translateY(-5px) rotate(45deg);
    }
  }
}


@media (max-width: 1250px) {
  .header-container {
    width: 100%;
    padding: 8px 25px;
  }
}

@media (max-width: 767px) {
  .header-left {
    display: none;
  }

  .mobile-header-left {
    display: initial;
  }
}
</style>