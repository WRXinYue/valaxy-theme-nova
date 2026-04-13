import type { DefaultTheme } from 'valaxy'
import type { GitLogOptions } from 'valaxy-addon-git-log'

export namespace StarterTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
}

/** Plain string, per-locale map, or `$locale:` keys — resolved by `useFmLocaleString` / `fmT` */
export type FmLocaleString = string | Record<string, string>

export type Logo = string | boolean | {
  light: string
  dark: string
}

export interface ThemeConfig extends DefaultTheme.Config {
  colors?: Partial<{
    primary: string
  }>

  logo: Logo
  nav: NavItem[]
  /** Plain / `$locale:` / per-locale map; `false` hides the title */
  navTitle: FmLocaleString | boolean
  /** Reserve space under fixed nav (`nav-placeholder`). Default `true`. Set `false` to disable. */
  navPlaceholder?: boolean
  navTools: NavTools

  hero: Partial<{
    title: FmLocaleString
    motto: FmLocaleString
    img: string | {
      light: string
      dark: string
    }
    prismBackground?: boolean
  }>

  sidebar: SidebarMulti

  /**
   * Relationship graph (D3) above the article TOC. `false` or `{ enabled: false }` disables it.
   * Default: shown when there is at least one page in the graph.
   */
  networkGraph?: boolean | {
    enabled?: boolean
    width?: number
    height?: number
    /** Include edges from Markdown internal links (build-time cache). Default `true`. */
    includeMarkdownLinks?: boolean
  }

  footer: Partial<Footer>

  gitLog: GitLogOptions | boolean
}

export type NavTools = ('toggleLocale' | 'toggleTheme' | 'search' | { icon: string, link?: string })[][]

export interface BaseNavItem {
  /** Label when `locale` is not set; omit when using `locale` only */
  text?: FmLocaleString
  /** vue-i18n message key; when set, resolved via `fmT` as `$locale:…` (number kept for `t()` plural edge cases) */
  locale?: string | number
  link: string
  icon?: string
  sidebar?: string[]
}

export interface NavItem extends BaseNavItem {
  subNav?: SubNavItem[]
}

export interface SubNavItem extends BaseNavItem {
  title?: string
}

export type SidebarMulti = SidebarItem[] | string[]

export interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
  base?: string
  docFooterText?: string
  rel?: string
  target?: string
}

export interface Footer {
  since: number
  powered: boolean
  icp?: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
