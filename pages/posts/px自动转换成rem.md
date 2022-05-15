---
title: px自动转换成rem
date: 2020-04-25 18:17
tags: ['vue','css']
---

```javascript
const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 75
          })
        ]
      }
    }
  }
};
```
**本项目会自动把px自动转换成rem，不需要考虑移动端单位兼容性问题，单位直接用px即可，浏览器上会自动变成是rem;若不想把px转换成rem，那么直接在对应的css属性后面增加一个/*no*/**

**写在 vue.config.js 中即可**
