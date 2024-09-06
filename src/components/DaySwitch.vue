<template>
    <div class="day-switch" :class="{ 'switch-on': isDaySwitch }" @click="daySwitchClick">
        <IconSun class="switch-sun" />
        <IconMoon class="switch-moon" />
    </div>
</template>

<script setup lang='ts'>
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'
import { onMounted, ref } from 'vue';

const emit = defineEmits(["change"]);
const isDaySwitch = ref();

onMounted(() => {
    let theme = localStorage.getItem("theme");
    if (theme == "dark") {
        isDaySwitch.value = true;
        switchTheme();
    } else {
        isDaySwitch.value = false;
    }
});

const daySwitchClick = () => {
    isDaySwitch.value = !isDaySwitch.value;
    switchTheme();
    emit("change", isDaySwitch.value);
}

const switchTheme = () => {
    if (isDaySwitch.value) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("theme", "dark");
    } else {
        localStorage.setItem("theme", "");
        document.documentElement.classList.remove("dark");
        document.documentElement.removeAttribute("theme");
    }
}

</script>

<style lang='less' scoped>
.day-switch {
    position: relative;
    width: 22px;
    height: 22px;
    cursor: pointer;

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
</style>