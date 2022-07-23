export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
})
oip0
