import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'
import { DEFAULT_PRIMARY, defaultThemeConfig } from './config'

const HEX6_RE = /^#[0-9a-f]{6}$/i

function resolvePrimary(themeConfig: ThemeConfig) {
  const fromConfig = themeConfig?.colors?.primary && String(themeConfig.colors.primary).trim()
  return fromConfig || defaultThemeConfig.colors?.primary || DEFAULT_PRIMARY
}

function isHex6(s: string) {
  return HEX6_RE.test(s)
}

export function themePlugin(themeConfig: ThemeConfig): PluginOption {
  const primary = resolvePrimary(themeConfig)
  const safe = isHex6(primary) ? primary : DEFAULT_PRIMARY

  return {
    name: 'valaxy-theme-nova',
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
