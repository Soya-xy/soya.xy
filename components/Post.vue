<script setup lang='ts'>
import { postDate } from '~/composables/date'

const post: any = {
  id: 1,
  title: 'Hello World',
  thumbnail: '/images/graphql.png',
  content: 'This is the post content',
  tags: ['vue', 'typescript'],
  date: new Date(),
  html: '',
}

const { config } = useConfig()
</script>

<template>
  <div>
    <Seo />
    <article>
      <header>
        <div class="container">
          <div class="post-details">
            <div v-if="post.thumbnail">
              <div class="post-image">
                <img :src="post.thumbnail">
              </div>
            </div>
            Written by
            <NuxtLink to="/me">
              {{ config.author }}
            </NuxtLink> on
            <time>{{ postDate(post.date) }}</time>
          </div>
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <div v-if="post.tags" class="tags">
              <NuxtLink v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" class="{`tag-${tag}`}">
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>
      <slot />
    </article>

    <section id="comments" class="comments container">
      <h3>Comments</h3>
      <!-- <Comments comment-box="{commentBox}" /> -->
    </section>
  </div>
</template>
