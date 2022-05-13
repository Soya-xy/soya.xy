<script setup lang='ts'>
const { switchTheme } = useTheme()
const { config } = useConfig()
</script>

<template>
  <button v-if="config.enableThemeSwitch" class="theme-switcher" @click="switchTheme">
    <img src="/images/moon.png" alt="Theme">
  </button>
</template>
