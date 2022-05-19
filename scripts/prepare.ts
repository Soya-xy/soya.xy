import { basename, parse } from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { genArrayFromRaw } from 'knitwork'
import { objectMap } from '@antfu/utils'
import { find, pathEq } from 'ramda'
import type { Item } from '~/assets/type/menu'
const { writeFileSync } = fs

await fs.ensureDir('pages/posts/')

const menu: { year: string | number; list: Item[] | string }[] = []

const fileInfo = (file: string) => fs.readFileSync(file, 'utf8').toString()

fg.sync('pages/posts/**/*.{md,vue}')
  .sort((a, b) => {
    const at = new Date(fs.statSync(a).ctime).getTime()
    const bt = new Date(fs.statSync(b).ctime).getTime()
    const atime = new Date(fileInfo(a).match(/date:(.*)/)?.[1] || '').getTime() || undefined
    const btime = new Date(fileInfo(b).match(/date:(.*)/)?.[1] || '').getTime() || undefined
    return (atime || at) > (btime || bt) ? -1 : 1
  }).forEach((file) => {
    const item = fs.statSync(file)
    const fileItem = fileInfo(file)
    const highlight = fileItem.search('highlighted: true')
    const thumbnail = fileItem.match(/thumbnail:(.*)/)?.[1]
    const date = fileItem.match(/date:(.*)/)?.[1]
    const ext = parse(file).ext
    const year = item.ctime.getFullYear().toString()
    const v = {
      type: 'post',
      thumbnail,
      highlight: highlight > -1,
      name: basename(file, ext),
      title: basename(file, ext),
      date: date || item.ctime,
      birthtime: item.birthtime,
    }
    const index = find(pathEq(['year'], year))(menu)
    if (!index) {
      menu.push({
        year,
        list: [v],
      })
    }
    else {
      index.list.push(v)
    }
  })

const code = genArrayFromRaw((menu.map((v) => {
  v.list = genArrayFromRaw((v.list as Item[]).map(r => objectMap(r, (k, v) => [k, JSON.stringify(v)])))
  return v
})))

writeFileSync('data/guides.ts',
  `import type { MenuList } from '~/assets/type/menu'
export const menuList: MenuList[] = ${code}
`, 'utf-8')

console.log('write Over!')

