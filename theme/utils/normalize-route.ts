const INDEX_HTML_RE = /\/index\.html?$/i
const MD_OR_HTML_EXT_RE = /\.(md|html)$/i
const TRAILING_SLASHES_RE = /\/+$/

/** Match router paths with usePageList (no trailing slash except `/`). Safe for client + Node. */
export function normalizeRoute(path: string): string {
  let p = path.split('#')[0].split('?')[0] || ''
  if (!p.startsWith('/'))
    p = `/${p}`
  p = p.replace(INDEX_HTML_RE, '')
  p = p.replace(MD_OR_HTML_EXT_RE, '')
  p = p.replace(TRAILING_SLASHES_RE, '') || '/'
  return p
}
