<script setup lang='ts'>
import { postDate } from '~/composables/date'
interface Post {
  title: string
  content: string
  thumbnail?: string
  description?: string
  tags?: string[]
  date?: Date
  noHeader?: boolean
  html?: string
  author?: string
  duration?: string
}

const {
  frontmatter: post = {
    title: '',
    content: '',
    noHeader: true,
  },
} = useAttrs() as { frontmatter: Post }

const { config } = useConfig()
</script>

<template>
  <div>
    <article>
      <header>
        <div class="container">
          <div v-if="!post.noHeader" class="post-details">
            <div v-if="post.thumbnail">
              <div class="post-image">
                <img :src="post.thumbnail">
              </div>
            </div>
            <template v-if="post.author">
              Written by
              <NuxtLink to="/me">
                {{ post.author || config.author }}
              </NuxtLink>
            </template>
            <template v-if="post.date">
              on <time>{{ postDate(post.date) }}</time>
            </template>
            <template v-if="post.duration">
              Duration: <time>{{ post.duration }}</time>
            </template>
          </div>
          <h1>{{ post.title }}</h1>
          <p v-if="post.description" class="description">
            {{ post.description }}
          </p>
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
