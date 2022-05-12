<script setup lang='ts'>
const { postSEO = false, postPath = '' } = defineProps<{ postSEO?: boolean; postPath?: string }>()
const { config } = $(useConfig())
const postURL = `${config.siteUrl}${postPath}`
config.schemaOrgJSONLD && useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify(config.schemaOrgJSONLD),
  }],
})
</script>

<template>
  <Html lang="zh">
    <Head>
      <Title>{{ config.title }}</Title>
      <Meta name="description" :content="config.description" />
      <Meta name="image" :content="config.image" />
      <Meta property="og:url" :content="postSEO ? postURL : config.siteUrl" />
      <Meta v-if="postSEO" property="og:type" :content="config.article" />
      <Meta property="og:title" :content="config.title" />
      <Meta property="og:description" :content="config.description" />
      <Meta property="og:image" :content="config.image" />
      <Meta name="twitter:card" :content="config.summary" />
      <Meta name="twitter:title" :content="config.title" />
      <Meta name="twitter:description" :content="config.description" />
      <Meta name="twitter:image" :content="config.image" />
    </Head>
  </Html>
</template>
