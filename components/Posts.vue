<script setup lang='ts'>
import { formatDate, postDate } from '~/composables/date'

const { yearOnly = false, node = {}, isNew = false, showThumbnail = false, matches = [], timeType = '' } = defineProps<{
  yearOnly?: boolean
  isNew?: boolean
  showThumbnail?: boolean
  matches?: number[][]
  node?: Record<string, any>
  timeType?: string
}>()

let title = $ref('')
if (matches.length > 0) {
  if (matches.length === 1) {
    matches.forEach((v) => {
      const s = node.title.slice(0, v[0])
      const m = node.title.slice(v[0], v[1] + 1)
      const e = node.title.slice(v[1] + 1)
      title += `${s}<strong class="highlighted">${m}</strong>${e}`
    })
  }
  else {
    let index = 0
    matches.forEach((v, k) => {
      const s = node.title.slice(index, v[0])
      const m = node.title.slice(v[0], v[1] + 1)
      index = v[0] + 1
      if (k === matches.length) {
        const e = node.title.slice(v[1] + 1)
        title += `${s}<strong class="highlighted">${m}</strong>${e}`
      }
      title += `${s}<strong class="highlighted">${m}</strong>`
    })
  }
}
</script>

<template>
  <div>
    <section>
      <div class="posts">
        <NuxtLink :key="node.title" :to="`/posts/${encodeURIComponent(node.title)}`" :class="isNew ? 'post new' : 'post'">
          <span class="flex" :style="{ alignItems: 'center' }">
            <img v-if="node.thumbnail && showThumbnail" :src="node.thumbnail" w6 mr4 loading="lazy">
            <template v-if="title">
              <h3 v-html="title" />
            </template>
            <h3 v-else>{{ node.title }}</h3>
            <span v-if="isNew" class="new-badge"> New!</span>
          </span>
          <div>
            <time>{{
              timeType === 'post' ? postDate(node.date, false) : formatDate(node.date, yearOnly ? 'YYYY' : undefined)
            }}</time>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
