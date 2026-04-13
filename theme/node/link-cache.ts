import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { cwd } from 'node:process'
import { normalizeRoute } from '../utils/normalize-route'

const WIN_SLASH_RE = /\\/g
const MD_EXT_RE = /\.md$/

export interface NovaLinkCache {
  links: Array<{ from: string, to: string }>
}

function mdFileToRoute(pagesRoot: string, filePath: string): string {
  const rel = relative(pagesRoot, filePath).replace(WIN_SLASH_RE, '/')
  const withoutExt = rel.replace(MD_EXT_RE, '')
  if (withoutExt === 'index' || withoutExt === '')
    return '/'
  if (withoutExt.endsWith('/index'))
    return normalizeRoute(`/${withoutExt.slice(0, -'/index'.length)}`)
  return normalizeRoute(`/${withoutExt}`)
}

function walkMd(dir: string): string[] {
  if (!existsSync(dir))
    return []
  const out: string[] = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory())
      out.push(...walkMd(p))
    else if (e.isFile() && e.name.endsWith('.md'))
      out.push(p)
  }
  return out
}

const MD_LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g
const MD_A_HREF_RE = /<a[^>]+href=["']([^"']+)["']/gi

function extractMarkdownLinks(content: string): string[] {
  const out: string[] = []
  for (const m of content.matchAll(MD_LINK_RE)) {
    const idx = m.index ?? 0
    if (idx > 0 && content[idx - 1] === '!')
      continue
    out.push(m[2].trim())
  }
  for (const m of content.matchAll(MD_A_HREF_RE))
    out.push(m[1].trim())
  return out
}

function resolveInternalTarget(fromRoute: string, href: string): string | null {
  const clean = href.trim().split('#')[0].split('?')[0] || ''
  if (!clean)
    return null
  if (clean.startsWith('mailto:') || clean.startsWith('tel:'))
    return null
  if (clean.startsWith('http://') || clean.startsWith('https://'))
    return null
  if (clean.startsWith('//'))
    return null
  if (clean.startsWith('/'))
    return normalizeRoute(clean)
  try {
    const base = `https://dummy.local${fromRoute.endsWith('/') ? fromRoute : `${fromRoute}/`}`
    const u = new URL(clean, base)
    return normalizeRoute(u.pathname)
  }
  catch {
    return null
  }
}

function resolvePagesRoot(projectRoot: string): string | null {
  const fromConfig = join(projectRoot, 'pages')
  if (existsSync(fromConfig))
    return fromConfig
  /** Valaxy dev: vite `config.root` may differ from cwd; fallback matches `pages/` next to valaxy.config */
  const fromCwd = join(cwd(), 'pages')
  if (existsSync(fromCwd))
    return fromCwd
  return null
}

export function generateNovaLinkCache(root: string): NovaLinkCache {
  const pagesRoot = resolvePagesRoot(root)
  if (!pagesRoot)
    return { links: [] }

  const seen = new Set<string>()
  const links: Array<{ from: string, to: string }> = []

  for (const file of walkMd(pagesRoot)) {
    const from = mdFileToRoute(pagesRoot, file)
    let content: string
    try {
      content = readFileSync(file, 'utf-8')
    }
    catch {
      continue
    }
    for (const href of extractMarkdownLinks(content)) {
      const to = resolveInternalTarget(from, href)
      if (!to || from === to)
        continue
      const key = `${from}→${to}`
      if (seen.has(key))
        continue
      seen.add(key)
      links.push({ from, to })
    }
  }

  return { links }
}
