import type { ThemeConfig } from './types'
import { defineTheme } from 'valaxy'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'

export default defineTheme<ThemeConfig>((options) => {
  const { theme, config } = options
  return {
    themeConfig: {
      ...defaultThemeConfig,
      header: {
        title: theme.toUpperCase(),
      },
    },
    vite: {
      plugins: [
        themePlugin(config.themeConfig),
      ],
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig),
    },
  }
})
