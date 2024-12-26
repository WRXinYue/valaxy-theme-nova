import type { ThemeConfig } from '../types'

export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  ui: {},

  footer: {
    since: 2024,
    powered: true,
  },

  header: {
    nav: [],
  },

  hero: {},

  sidebar: [],
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(_themeConfig: ThemeConfig) {
  const safelist: string[] = []

  return safelist
}
