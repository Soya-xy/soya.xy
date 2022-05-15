import path from 'path'
import { defineNuxtConfig } from 'nuxt'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '~/modules/markdown',
  ],
  target: 'static',
  experimental: {
    reactivityTransform: true,
    viteNode: true,
  },
  // 暂时解决markdown 使用组件的能力  nuxt issue 4834 同时失去arco 暂时找不到解决方案
  components: {
    // 解决vite-plugin-md wrapperComponent 获取 nuxt 组件未注册
    global: true,
    dirs: ['~/components'],
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
  extensions: [
    '.vue',
    '.md',
  ],
  vite: {
    // @ts-expect-error any
    vue: {
      include: [/\.vue$/, /\.md$/],
    },
    plugins: [
      createStyleImportPlugin({
        libs: [
          {
            libraryName: '@arco-design/web-vue',
            esModule: true,
            resolveStyle: (name) => {
              // css
              return `@arco-design/web-vue/es/${name}/style/css.js`
            },
          },
        ],
      }),
      Components({
        resolvers: [
          ArcoResolver(),
        ],
      }),
    ],
  },
})
