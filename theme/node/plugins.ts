import type { PluginOption } from 'vite'
import type { ThemeConfig } from '../types'
import { DEFAULT_PRIMARY, defaultThemeConfig } from './config'
import { generateNovaLinkCache } from './link-cache'

const HEX6_RE = /^#[0-9a-f]{6}$/i
const VIRTUAL_LINK_CACHE = '\0virtual:nova-link-cache'

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

  let root = ''

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
        optimizeDeps: {
          include: [
            'gsap',
            'gsap/ScrollTrigger',
            /** Mermaid → CJS package; needs interop for `import { sanitizeUrl }` in browser */
            '@braintree/sanitize-url',
          ],
          needsInterop: ['@braintree/sanitize-url'],
        },
        valaxy: {},
      }
    },
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === 'virtual:nova-link-cache')
        return VIRTUAL_LINK_CACHE
    },
    load(id) {
      if (id === VIRTUAL_LINK_CACHE) {
        const data = generateNovaLinkCache(root)
        return `export default ${JSON.stringify(data)}`
      }
    },
  }
}
