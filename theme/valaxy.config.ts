import type { ThemeConfig } from './types'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
// @ts-expect-error missing types
import LinkAttributes from 'markdown-it-link-attributes'
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
    markdown: {
      config: (md) => {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(MarkdownItGitHubAlerts)
      },
    },
  }
})
