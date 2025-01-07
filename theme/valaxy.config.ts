import type { ThemeConfig } from './types'
import virtual from '@rollup/plugin-virtual'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
// @ts-expect-error missing types
import LinkAttributes from 'markdown-it-link-attributes'
import { defineTheme } from 'valaxy'
import { addonGitLog } from 'valaxy-addon-git-log'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'

export default defineTheme<ThemeConfig>((options) => {
  const { theme, config } = options
  const { themeConfig, siteConfig } = config

  if (!themeConfig?.navTitle && siteConfig?.title)
    defaultThemeConfig.navTitle = siteConfig.title

  if (themeConfig?.navTools)
    defaultThemeConfig.navTools = []

  return {
    themeConfig: {
      ...defaultThemeConfig,
      header: {
        title: theme.toUpperCase(),
      },
    },
    addons: [
      ...(themeConfig.gitLog
        ? [addonGitLog(themeConfig.gitLog === true ? {} : themeConfig.gitLog)]
        : []),
    ],
    vite: {
      plugins: [
        themePlugin(config.themeConfig),
        ...(!themeConfig.gitLog
          ? [virtual({ 'virtual:git-log/contributors': 'export default [];' })]
          : []),
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
