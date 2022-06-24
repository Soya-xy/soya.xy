<script setup>
import '~/assets/style'
useHead({
  title: 'Soya',
  link: [
    {
      rel: 'icon', type: 'image/png', href: 'https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/logo.jpeg',
    },
  ],
})

const { theme } = useTheme()
</script>

<template>
  <Seo />
  <div :class="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
