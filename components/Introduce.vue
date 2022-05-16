<script setup lang='ts'>
import { Message } from '@arco-design/web-vue'
import type GitHub from '~/assets/type/github'
import { menuList } from '~/data/guides'
import type { Item } from '~/assets/type/menu'
const { config } = useConfig()
const { data } = await useFetch<GitHub>('https://api.github.com/users/Soya-xy')

function clip(source: string) {
  const { copy } = useClipboard({ source })
  copy()
  Message.success('复制成功！')
}
const edges = menuList[0].list.filter((item, index) => index <= config.value.latestNum)

const highlighted = $ref<Item[]>([])
menuList[0].list.forEach((item) => {
  if (item.highlight && highlighted.length <= config.value.highlightNum)
    highlighted.push(item)
})
</script>

<template>
  <article class="hero">
    <header>
      <div class="container">
        <div class="flex-content">
          <div>
            <h1>Hey, I'm Soya.</h1>
            <p class="subtitle small">
              I'm a Front End Developer in China. I love building open-source
              <NuxtLink to="/projects">
                Projects
              </NuxtLink> and
              <NuxtLink to="/blog">
                Writing
              </NuxtLink> about what I learn. This
              website is my digital garden—a compendium of the things I've
              learned and created over the years.
            </p>
          </div>
          <img :src="config.siteLogo" alt="Web Logo" class="main-image">
        </div>
        <p class="hero-buttons">
          <NuxtLink to="/about" class="hero-button">
            <img src="/images/nav-floppy.png" alt="Me">
            More about me
          </NuxtLink>
          <a v-if="data" :href="config.github" target="_blank" class="hero-button" rel="noreferrer">
            <img src="/images/nav-github.png" alt="GitHub">
            <span class="bright">
              {{ Number(data.followers).toLocaleString() }}
            </span>
            followers on GitHub
          </a>
        </p>
      </div>
    </header>

    <div class="container">
      <h2 class="main-header">
        <span>Latest Articles</span>
        <NuxtLink to="/articles">
          View All
        </NuxtLink>
      </h2>
      <Posts v-for="item, index in edges" :key="index" :node="item" :is-new="index === 0" />
      <h2 class="main-header">
        <span>Highlights</span>
        <NuxtLink to="/articles">
          View All
        </NuxtLink>
      </h2>
      <Posts v-for="item, index in highlighted" :key="index" :node="item" year-only show-thumbnail />
      <h2 class="main-header">
        Contact
      </h2>
      <div>
        <p>
          <b>Wechat:</b> <span class="tag" @click="clip('SoyaXy')">SoyaXy</span>
        </p>
        <p>
          <b>Email:</b> <span class="tag" @click="clip('soyayiyi@gmail.com')">soyayiyi@gmail.com</span>
        </p>
      </div>
    </div>
  </article>
</template>
