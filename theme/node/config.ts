import type { ThemeConfig } from '../types'
import pkg from '../package.json'

export const DEFAULT_PRIMARY = '#4f3bd4'

export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  colors: {
    primary: DEFAULT_PRIMARY,
  },

  footer: {
    since: 2024,
    powered: true,
  },

  logo: '',

  nav: [],
  navTitle: pkg.name,
  navTools: [
    ['toggleTheme', 'toggleLocale'],
    ['search'],
  ],

  hero: {},

  sidebar: [],

  gitLog: false,
}

export function generateSafelist(themeConfig: ThemeConfig) {
  const { navTools } = themeConfig

  const safelist: string[] = []

  navTools?.flat().forEach((tool) => {
    if (typeof tool === 'object' && tool?.icon)
      safelist.push(tool.icon)
  })

  return safelist
}
