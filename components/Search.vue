<script setup lang='ts'>
import { isSearching, query, searchResult, searcher } from '~/composables/search'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  query.value = String(route.query.search || '')
})

watch(
  () => query.value,
  excuteSearch,
)
async function excuteSearch() {
  isSearching.value = true
  try {
    searchResult.value = await searcher.search(query.value)
    nextTick(() => isSearching.value = false)
  }
  catch (e) {
    console.error(e)
  }
  await router.replace({
    query: query.value
      ? {
          search: query.value,
        }
      : undefined,
  })
}
</script>

<template>
  <div>
    <div class="search-bar">
      <input
        id="search" ref="{searchRef}" v-model="query" type="search" class="search-input"
        placeholder="Begin typing to search..."
      >
      <img class="search-icon" src="https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/nav-search.png" alt="Search">
    </div>
  </div>
</template>
