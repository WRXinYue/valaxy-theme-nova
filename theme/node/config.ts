import type { ThemeConfig } from '../types'
import pkg from '../package.json'

export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  ui: {},

  footer: {
    since: 2024,
    powered: true,
  },

  logo: '',

  nav: [],
  navTitle: pkg.name,
  navTools: [
    ['togglTheme', 'toggleLocale'],
    ['search'],
  ],

  hero: {},

  sidebar: [],
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const { navTools } = themeConfig

  const safelist: string[] = []

  navTools?.flat().forEach((tool) => {
    if (typeof tool === 'object' && tool?.icon)
      safelist.push(tool.icon)
  })

  return safelist
}
