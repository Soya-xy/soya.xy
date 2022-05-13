<script setup lang='ts'>
import { formatDate } from '~/composables/date'
const { prefix = true, yearOnly = false, node = {}, isNew = 0, query = '' } = defineProps<{
  prefix?: boolean
  yearOnly?: boolean
  isNew?: number
  query?: string
  node?: Record<string, any>
}>()

const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
const highlightStart = node.title.search(re)
let highlightEnd = 0
if (highlightStart !== -1)
  highlightEnd = highlightStart + query.length
</script>

<template>
  <div>
    <section>
      <div class="posts">
        <NuxtLink :key="node.id" :to="`/post/${node.slug}`" :class="isNew ? 'post new' : 'post'">
          <span class="flex" :style="{ alignItems: 'center' }">
            <img v-if="node.thumbnail" :src="node.thumbnail" :style="{ marginRight: '1rem', minWidth: '25px' }">
            <h3 v-if="highlightStart">
              {{ node.title.slice(0, highlightStart) }}
              <strong class="highlighted">
                {{ node.title.slice(highlightStart, highlightEnd) }}
              </strong>
              {{ node.title.slice(0, highlightStart) }}
            </h3>
            <h3 v-else>{{ node.title }}</h3>
            <span v-if="isNew" class="new-badge"> New!</span>
          </span>
          <div>
            <time>{{ formatDate(node.date, yearOnly ? 'YYYY' : undefined) }}</time>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
