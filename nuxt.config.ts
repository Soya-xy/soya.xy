import path from 'path'
import { defineNuxtConfig } from 'nuxt'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    viteNode: true,
  },
  alias: {
    // 解决 esm 的问题
    'compute-scroll-into-view': path.join(__dirname, './node_modules/compute-scroll-into-view/dist/index.js'),
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          ArcoResolver(),
        ],
      }),
    ],
  },
})
