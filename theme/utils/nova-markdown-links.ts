/**
 * Nova: same-origin markdown `<a>` handling (copied from Valaxy `onClickHref`, extended for SPA cross-route).
 * Keeps theme self-contained without patching valaxy core.
 */
import type { Router } from 'vue-router'
import { scrollTo } from 'valaxy'

const routersWithClickListener = new WeakSet<Router>()
const TRAILING_SLASH_RE = /\/$/
const PATH_EXT_RE = /\.\w+$/

function pathnameForRouter(router: Router, pathname: string): string {
  const base = router.options.history.base
  const basePrefix = base.replace(TRAILING_SLASH_RE, '') || ''
  if (!basePrefix)
    return pathname
  if (pathname === basePrefix || pathname.startsWith(`${basePrefix}/`))
    return pathname.slice(basePrefix.length) || '/'
  return pathname
}

/**
 * Register once per router: intercepts same-origin links in markdown so navigation uses Vue Router (no full reload).
 */
export function setupNovaMarkdownLinks(router: Router) {
  if (routersWithClickListener.has(router))
    return
  routersWithClickListener.add(router)

  window.addEventListener(
    'click',
    async (e) => {
      const link = (e.target as Element).closest('a')
      if (!link || link.hasAttribute('download'))
        return

      const { protocol, hostname, pathname, hash, target } = link
      const currentUrl = window.location
      const extMatch = pathname.match(PATH_EXT_RE)
      if (
        e.ctrlKey
        || e.shiftKey
        || e.altKey
        || e.metaKey
        || target === '_blank'
        || protocol !== currentUrl.protocol
        || hostname !== currentUrl.hostname
        || (extMatch && extMatch[0] !== '.html')
      ) {
        return
      }

      if (pathname === currentUrl.pathname) {
        if (hash && hash !== currentUrl.hash) {
          e.preventDefault()
          await router.push({ hash: decodeURIComponent(hash) })
          scrollTo(link, hash, {
            smooth: link.classList.contains('header-anchor'),
          })
        }
        return
      }

      const url = new URL(link.href)
      const pathForRouter = pathnameForRouter(router, url.pathname)
      const resolved = router.resolve({
        path: `${pathForRouter}${url.search || ''}`,
        hash: url.hash || undefined,
      })
      if (!resolved.matched.length)
        return

      e.preventDefault()
      await router.push(resolved)
    },
    { capture: true },
  )
}
