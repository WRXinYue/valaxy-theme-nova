import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'
import { DEFAULT_PRIMARY, defaultThemeConfig } from './config'

function resolvePrimary(themeConfig: ThemeConfig) {
  const fromConfig = themeConfig?.colors?.primary && String(themeConfig.colors.primary).trim()
  return fromConfig || defaultThemeConfig.colors?.primary || DEFAULT_PRIMARY
}

function isHex6(s: string) {
  return /^#[0-9a-fA-F]{6}$/.test(s)
}

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  const primary = resolvePrimary(themeConfig)
  const safe = isHex6(primary) ? primary : DEFAULT_PRIMARY

  return {
    name: 'valaxy-theme-oceanus',
    enforce: 'pre',
    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${safe} !default;\n`,
            },
          },
        },
        valaxy: {},
      }
    },
  }
}
