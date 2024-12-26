import type { MaybeRefOrGetter } from 'vue'
import { sortByDate, usePageList } from 'valaxy'
import { computed, toValue } from 'vue'

export function usePostList(params: { path?: MaybeRefOrGetter<string>, type?: string } = { path: '/posts' }) {
  const pageList = usePageList()

  return computed(() => {
    const path = toValue(params.path)
    const routes = pageList.value
      .filter(i =>
        path && i.path?.startsWith(path)
        && !i.path?.endsWith('.html')
        && i.date
        && (!params.type || i.type === params.type)
        && (!i.hide || i.hide === 'index'), // hide `hide: all` posts
      )

    /**
     * 置顶
     */
    const topPosts = sortByDate(routes.filter(i => i.top)).sort((a, b) => b.top! - a.top!)
    const otherPosts = sortByDate(routes.filter(i => !i.top))

    return topPosts.concat(otherPosts)
  })
}
