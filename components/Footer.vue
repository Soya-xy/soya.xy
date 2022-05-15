<script setup lang='ts'>
const links = [
  { url: 'https://taniarascia.substack.com/subscribe', label: 'Newsletter' },
]
const madeWithLinks = [
  { url: 'https://v3.nuxtjs.org/', label: 'Next3', icon: '/images/nuxt.png' },
  { url: 'https://vitejs.dev/', label: 'Vite', icon: '/images/vite.png' },
  { url: 'https://github.com/Soya-xy', label: 'Github', icon: '/images/nav-github.png' },
]
</script>

<template>
  <div>
    <footer class="footer">
      <section>
        <nav>
          <span class="desktop-only">Made by Soya</span>
          <a class="desktop-only !text-#eee" href="https://www.taniarascia.com/" target="_blank">Theme By Tania Rascia</a>
        </nav>
        <nav>
          <span class="desktop-only">Links:</span>
          <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </a>
        </nav>
        <nav>
          <a
            v-for="link in madeWithLinks " :key="link.url" :href="link.url" :title="link.label"
            target="_blank" rel="noopener noreferrer"
          >
            <span>{{ link.label }}</span>
            <img :src="link.icon" :alt="link.label">
          </a>
        </nav>
      </section>
    </footer>
  </div>
</template>
