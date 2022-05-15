---
title: Vue Class的显示
date: 2020-11-19 11:37
tags: ['vue', 'css']
---

Vue Class 中 可以传入 字符串，对象，数组

在传入对象的时候 可以通过 对象的 key 值 `true/false` 来控制这个`class`是否显示

`:class="{'collapse': isCollapse}"`

```js
function isCollapse() {
  return true
}
```
