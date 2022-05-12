<script setup lang='ts'>
const { switchTheme } = useTheme()
const { config } = useConfig()
</script>

<template>
  <header class="navigation">
    <div class="navigation-inner">
      <nav class="brand-section">
        <button class="desktop-only collapse-button">
          <i icon-btn i-material-symbols:menu-rounded />
        </button>
        <NuxtLink to="/" class="brand">
          <span>Soya</span>
        </NuxtLink>
      </nav>
      <div>
        <nav>
          <NuxtLink v-for="item in config.menu" :key="item.label" :to="item.url" active-class-name="active">
            <img :src="item.icon" :alt="item.label">
            <div class="tooltip">
              {{ item.label }}
            </div>
          </NuxtLink>
        </nav>
      </div>
      <div class="toolbar-section">
        <nav class="social-nav">
          <a v-for="item in config.socialMenu" :key="item.label" :href="item.url" target="_blank" rel="noreferrer">
            <img :src="item.icon" :alt="item.label">
          </a>
        </nav>
        <button v-if="config.enableThemeSwitch" class="theme-switcher" @click="switchTheme">
          <img src="/moon.png" alt="Theme">
        </button>
      </div>
    </div>
  </header>
</template>
