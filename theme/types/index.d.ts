import type { DefaultTheme } from 'valaxy'
import type { GitLogOptions } from 'valaxy-addon-git-log'

export namespace StarterTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
}

export interface ThemeConfig extends DefaultTheme.Config {
  colors?: Partial<{
    primary: string
  }>

  logo: Logo
  nav: NavItem[]
  navTitle: string | boolean
  /** Reserve space under fixed nav (`nav-placeholder`). Default `true`. Set `false` to disable. */
  navPlaceholder?: boolean
  navTools: NavTools

  hero: Partial<{
    title: string
    motto: string
    img: string | {
      light: string
      dark: string
    }
    prismBackground?: boolean
  }>

  sidebar: SidebarMulti

  footer: Partial<Footer>

  gitLog: GitLogOptions | boolean
}

export type NavTools = ('toggleLocale' | 'toggleTheme' | 'search' | { icon: string, link?: string })[][]

export type Logo = string | boolean | {
  light: string
  dark: string
}

export interface BaseNavItem {
  text: string
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
