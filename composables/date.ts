import { useDateFormat, useNow } from '@vueuse/core'

export const formatDate = (time = useNow(), format = 'MM-DD') => {
  return useDateFormat(time, format).value
}

export const postDate = (time: Date | string = new Date(), showYear = true) => {
  return showYear ? `${new Date(time).toDateString().split(' ')[1]}  ${new Date(time).getDate()},  ${new Date(time).getFullYear()}` : `${new Date(time).toDateString().split(' ')[1]}  ${new Date(time).getDate()}`
}
