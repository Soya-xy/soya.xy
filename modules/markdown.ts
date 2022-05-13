import { defineNuxtModule } from '@nuxt/kit'
import Markdown from 'vite-plugin-md'
import LinkAttributes from 'markdown-it-link-attributes'
import anchor from 'markdown-it-anchor'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import Prism from 'markdown-it-prism'
import markdownItAttrs from 'markdown-it-attrs'

import { slugify } from '../scripts/slugify'

export default defineNuxtModule({
  async setup(_, nuxt) {
    nuxt.hook('vite:extendConfig', async (config) => {
      config.plugins.push(
        Markdown({
          wrapperComponent: 'post',
          wrapperClasses: 'container post-content',
          headEnabled: true,
          markdownItOptions: {
            quotes: '""\'\'',
          },
          markdownItSetup(md) {
            const defaultRender = md.renderer.rules.code_inline!

            md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
              const token = tokens[idx]
              token.attrSet('class', 'language-text')
              return defaultRender(tokens, idx, options, env, self)
            }

            md.use(Prism)
            md.use(markdownItAttrs)
            md.use(LinkAttributes, {
              matcher: (link: string) => /^https?:\/\//.test(link),
              attrs: {
                target: '_blank',
                rel: 'noopener',
              },
            })
            md.use(anchor, {
              slugify,
              permalink: anchor.permalink.linkInsideHeader({
                symbol: '<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
                class: 'anchor before',
                renderAttrs: () => ({ 'aria-hidden': 'true' }),
              }),
            })
            md.use(TOC, {
              includeLevel: [1, 2, 3],
              slugify,
            })
          },
        }),
      )
    })
  },
})
