/** Match router paths with usePageList (no trailing slash except `/`). Safe for client bundles. */
export function normalizeRoute(path: string): string {
  let p = path.split('#')[0].split('?')[0] || ''
  if (!p.startsWith('/'))
    p = `/${p}`
  p = p.replace(/\/index\.html?$/i, '')
  p = p.replace(/\.(md|html)$/i, '')
  p = p.replace(/\/+$/, '') || '/'
  return p
}
