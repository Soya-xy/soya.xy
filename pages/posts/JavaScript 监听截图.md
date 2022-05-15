---
title: JavaScript 监听截图
date: 2021-08-05 23:39
tags: ['javascript']
---
## 介绍一下[Document.visibilityState][1]

当项目遇到一个,扫码登录,并禁止截图,截图后二维码更新,等等类似情况
此时可以使用到`Document.visibilityState` 监听`document visibilityState `
```js
document.addEventListener('visibilitychange', () => {
  console.log(document.visibilityState)
})
```
*   `visible` : 此时页面内容至少是部分可见. 即此页面在前景标签页中，并且窗口没有最小化.
*   `hidden` : 此时页面对用户不可见. 即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态' .
*   `prerender` : 页面此时正在渲染中, 因此是不可见的 (considered hidden for purposes of document.hidden). 文档只能从此状态开始，永远不能从其他值变为此状态.注意: 浏览器支持是可选的.

### 根据状态来触发对应流程


[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState
