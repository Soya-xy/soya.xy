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

fg.sync('pages/posts/**/*.{md,vue}')
  .sort((a, b) => {
    const at = fs.statSync(a)
    const bt = fs.statSync(b)
    return at.birthtime > bt.birthtime ? -1 : 1
  }).forEach((file) => {
    const item = fs.statSync(file)
    const ext = parse(file).ext
    const year = item.birthtime.getFullYear().toString()
    const v = {
      type: 'post',
      name: basename(file, ext),
      title: basename(file, ext),
      date: item.ctime,
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
`import type { Menu } from '~/assets/type/menu'
export const menuList: Menu[] = ${code}
`, 'utf-8')
