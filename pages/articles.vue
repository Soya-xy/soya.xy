<script setup lang='ts'>
import { isSearching, query, searchResult } from '~/composables/search'
</script>

<template>
  <div>
    <article class="blog-page">
      <header>
        <div class="container">
          <h1>Articles</h1>
          <p class="description">
            Tutorials, technical articles, snippets, reference materials, and
            all development-related resources I've written. See
            <NuxtLink to="/notes">
              Notes
            </NuxtLink> for everything else.
          </p>
        </div>
      </header>

      <section>
        <div class="container">
          <Search />
          <div v-if="isSearching" i-carbon-circle-dash w-7 h-7 animate-spin mt5 mxa />
          <section>
            <template v-if="query">
              <template v-if="!isSearching && searchResult.length > 0">
                <template v-for="v in searchResult" :key="v.title">
                  <h2 class="main-header">
                    <span>{{ v.item.year }}</span>
                  </h2>
                  <Posts
                    v-for="item in v.matches" :key="item.value"
                    :node="{ title: item.value, date: v.item.list[item.refIndex].birthtime }" :matches="item.indices"
                    time-type="post"
                  />
                </template>
              </template>
              <p v-else-if="!isSearching" mt8>
                Sorry, nothing matched that search.
              </p>
            </template>
          </section>
        </div>
      </section>
    </article>
  </div>
</template>
