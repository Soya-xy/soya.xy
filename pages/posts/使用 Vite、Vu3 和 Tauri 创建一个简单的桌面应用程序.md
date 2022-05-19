---
title: 使用 Vite、Vu3 和 Tauri 创建一个简单的桌面应用程序
thumbnail: /images/tauri.png
date: 2022-05-19 10:12:29
tags: ['rust', 'vite', 'vue', 'tauri']
---

Blogging always requires uploading images, but putting images in the source code will cause the package size to increase, so we need to put images on the CDN to reduce the package size.

It is a little tedious to put it into CDN. I have learned that [`Electron`](https://www.electronjs.org/) uses `Node` as the server side, so after seeing `TAURI`, I decided to learn `RUST`, the most difficult one at present.

This is the document

## Prerequisites

- Node.js > 14.0.0
- Yarn
- Install Tauri
  - [For Mac](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-macos)
  - [For Windows](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-windows)
  - [For Linux](https://tauri.studio/v1/guides/getting-started/prerequisites#setting-up-linux)

## Steps

You have two ways to create your first Tauri project.

1. Create the initialization project directly using Tauri

```bash
yarn create tauri-app
# OR
npx create tauri-app
```

Follow the prompts to select the project template you need to create, and I chose VUe3

Then you can start developing your project.

```bash
cd your-project-name
yarn tauri dev
```

you can also use `yarn tauri build` to build your project.

```bash
yarn tauri build
```

## Cross-Platform Builds

`Tauri` doesn't support [Cross-platform compilation](https://github.com/tauri-apps/tauri/issues/1114#issuecomment-777948205) So we can use github actions to build our project.

First, we need to create a `.github/workflows/build.yml` file.

```yaml
name: test-on-pr
on: [pull_request]

jobs:
  test-tauri:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2
      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 16
      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf
      - name: install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

you also look this project [tauri-action](https://github.com/tauri-apps/tauri-action), Here are the details.
