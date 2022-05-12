<script setup lang='ts'>
const { showYears = false } = defineProps<{ showYears?: boolean }>()
const yearOnly = $ref('')
</script>

<template>
  <div>
    <section v-if="showYears" key="{year}">
      <h2>{{ yearOnly }}</h2>
      <div class="posts">
        <!-- <Post key="{node.id}" node="{node}" query="{query}" prefix="{prefix}" /> -->
      </div>
    </section>
    <div v-else class="posts">
      <!-- <Post key={node.id} node={node} query={query} prefix={prefix} hideDate={hideDate} yearOnly={yearOnly} /> -->
    </div>
  </div>
</template>
