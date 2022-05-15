# [xiaoyio.com](https://xiaoyio.com)

Nuxt3 Blog based on [Vitesse-Nuxt3](https://github.com/antfu/vitesse-nuxt3) template, using [Taniarascia](https://www.taniarascia.com/)`s Blog style theme

## TODO
- [ ] Add Menu
- [ ] Add ToolTip
- [ ] Add go back to the top


## Feature
- [Nuxt 3](https://v3.nuxtjs.org) - SSR, ESR, File-based routing, components auto importing, modules, etc.
- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.
- [Vite-plugin-md](https://github.com/antfu/vite-plugin-md) - Markdown for Vite
- [Fuse.js](https://fusejs.io/) - Fuse.js is a powerful, lightweight fuzzy-search library, with zero dependencies.
- [Vueuse](https://vueuse.org/) - Collection of essential Vue Composition Utilities

# Try it

## Usage
You can do this by creating an '.md 'file in the' page/posts' directory called the article title, and then writing the article content to the file to display it on the page.

Write headers at the top of the file to define the article parameters, following the 'YAML' format as follows:
```md
---
title: Articles `s Title
date: Articles `s Date
duration: How long did it take to write this article
author: Your/Other name
thumbnail: Articles `s Thumbnail and Logo
highlighted: Whether it is specially displayed on the home page
tags: string[]  Articles `s tag / keywords / categories
---
```

## Config

In the 'composables/config.ts' file you can configure some default parameters, such as:
```ts
interface Item {
  label: string
  icon: string
  url: string
}

interface WebConfig {
  siteUrl: string
  siteLogo: string

  // SEO These parameters will be generated in the of each page
  // Specific please see: components/Seo.vue
  github: string
  description: string
  image: string
  article: string
  summary: string
  schemaOrgJSONLD: SchemaObject

  // Article
  author: string // The author of the article
  title: string // This is the default title if the article does not declare a title

  // headerMenu
  menu: Item
  // rightMenu eg: Github, Twitter, Facebook...
  socialMenu: Item[]
  // Whether to enable theme color switch
  enableThemeSwitch: true
  // Number of latest articles on home page
  latestNum: 10
  // Number of highlight articles on article page
  highlightNum: 10
}
```
