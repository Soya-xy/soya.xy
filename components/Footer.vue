<script setup lang='ts'>
const links = [
  { url: 'https://iobiji.com/', label: 'iobiji' },
]
const madeWithLinks = [
  { url: 'https://v3.nuxtjs.org/', label: 'Next3', icon: 'https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/nuxt.png' },
  { url: 'https://vitejs.dev/', label: 'Vite', icon: 'https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/vite.png' },
  { url: 'https://github.com/Soya-xy', label: 'Github', icon: 'https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/nav-github.png' },
]
</script>

<template>
  <div>
    <footer class="footer">
      <section>
        <nav>
          <span class="desktop-only">Made by Soya</span>
          <a class="desktop-only !text-#eee" href="https://www.taniarascia.com/" target="_blank">Theme By Tania
            Rascia</a>
        </nav>
        <nav>
          <span class="desktop-only">Links:</span>
          <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </a>
        </nav>
        <nav>
          <a
            v-for="link in madeWithLinks " :key="link.url" :href="link.url" :title="link.label" target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ link.label }}</span>
            <img :src="link.icon" :alt="link.label">
          </a>
        </nav>
        <nav>
          <a href="https://beian.miit.gov.cn/" title="粤ICP备18033133号-3" target="_blank" rel="noopener noreferrer">
            <span>粤ICP备18033133号</span>
          </a>
        </nav>
      </section>
    </footer>
  </div>
</template>
