export interface Item {
  type: string
  name: string
  title: string
  highlight: boolean
  thumbnail: string | undefined
  date: Date | string
  birthtime: Date | string
}

export interface MenuList {
  year: string | number
  list: Item[]
}

export interface SearchResult {
  item: MenuList
  matches: any
}

export type Menu = MenuList | SearchResult | Item
