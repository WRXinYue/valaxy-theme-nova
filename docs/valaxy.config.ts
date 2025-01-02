import type { ThemeConfig } from 'valaxy-theme-oceanus'
import { defineConfig } from 'valaxy'
import { addonGitLog } from 'valaxy-addon-git-log'
import pkg from 'valaxy-theme-oceanus/package.json'

export default defineConfig<ThemeConfig>({
  theme: 'oceanus',

  devtools: true,

  themeConfig: {
    header: {
      favicon: false,

      title: pkg.name,

      nav: [
        {
          text: '主页',
          link: '/',
        },
        {
          text: '指南',
          link: '/guide',
          sidebar: ['getting-started', 'writing'],
          subNav: [
            {
              text: '安装',
              link: '/guide/getting-started/installation',
            },
            {
              text: '更新',
              link: '/guide/getting-started/update',
            },
            {
              text: '资源处理',
              link: '/guide/writing/asset-handling',
            },
            {
              text: 'Frontmatter',
              link: '/guide/writing/frontmatter',
            },
            {
              text: '国际化',
              link: '/guide/writing/i18n',
            },
            {
              text: 'Markdown',
              link: '/guide/writing/markdown',
            },
          ],
        },
        {
          text: '参考',
          link: '/reference',
          sidebar: ['reference', 'themeConfig'],
          subNav: [
            {
              text: '站点配置',
              link: '/reference/site-config',
            },
            {
              text: 'frontmatter 配置',
              link: '/reference/frontmatter-config',
            },
            {
              text: '主题配置',
              link: '/reference/theme-config',
              sidebar: ['themeConfig'],
            },
          ],
        },
        {
          text: pkg.version,
          link: 'https://github.com/WRXinYue/valaxy-theme-oceanus/releases',
        },
        {
          text: '关于',
          link: '/about',
        },
      ],
    },

    hero: {
      title: 'VALAXY THEME OCEANUS',
      // motto: '简约、高雅的 Valaxy 文档主题',
      motto: 'Sliding content with sticky tab nav',
      img: {
        light: 'https://common.s3.bitiful.net/oceanus/wallhaven-2y7yz6.jpg',
        dark: 'https://common.s3.bitiful.net/oceanus/wallhaven-2evj3y.jpg',
      },
    },

    // sidebar: [
    //   'getting-started',
    //   'guide',
    //   'config',
    //   'theme',
    //   'styles',
    //   'layouts',
    //   'examples',
    //   'releases',
    //   'dev',
    // ],

    footer: {
      since: 2024,
      powered: true,
      icp: '<a class="oceanus-text" href="https://icp.gov.moe/?keyword=20240132" target="_blank">萌ICP备20240132号</a>',
    },
  },

  addons: [
    addonGitLog({
      contributor: {
        mode: 'git',
      },
      repositoryUrl: 'https://github.com/WRXinYue/valaxy-theme-oceanus.git',
    }),
  ],
})
