<script setup lang='ts'>
const { switchTheme } = useTheme()
const { config } = useConfig()
</script>

<template>
  <button v-if="config.enableThemeSwitch" class="theme-switcher" @click="switchTheme">
    <img src="https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/moon.png" alt="Theme">
  </button>
</template>
