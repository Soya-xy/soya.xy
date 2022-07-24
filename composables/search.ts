import Fuse from 'fuse.js'
import { menuList } from '~/data/guides'
import type { Menu, SearchResult } from '~/assets/type/menu'

let initParams: URLSearchParams | null = null
if ((process as any).client)
  initParams = new URLSearchParams(location.search)

export const query = ref((initParams && initParams!.get('search')?.toString()) || '')
export const isSearching = ref(false)
export const searchResult = shallowRef<SearchResult[]>([])

export const searcher = createSearch(menuList)

function createSearch(data: Menu[]) {
  const options = {
    includeScore: false,
    includeMatches: true,
    threshold: 0.3,
    keys: ['list.name'],
  }
  const fuse = new Fuse<Menu>(data, options)

  async function search(query: string): Promise<any[]> {
    return await Array.from(new Set([...fuse.search(query)]))
      .map(i => ({ item: i.item, matches: i.matches }))
  }
  return {
    search,
  }
}
