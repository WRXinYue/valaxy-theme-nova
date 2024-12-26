import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  return {
    name: 'valaxy-theme-oceanus',

    config() {
      const primaryColor = themeConfig.ui?.primary || '#52a8ff'

      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${primaryColor} !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}
