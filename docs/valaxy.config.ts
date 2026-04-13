import type { ThemeConfig } from 'valaxy-theme-nova'
import { defineConfig } from 'valaxy'
import pkg from 'valaxy-theme-nova/package.json'

export default defineConfig<ThemeConfig>({
  theme: 'nova',

  devtools: true,

  themeConfig: {

    logo: false,
    navTitle: '$locale:nova.nav.brand',

    nav: [
      {
        locale: 'nova.nav.home',
        link: '/',
      },
      {
        locale: 'nova.nav.guide',
        link: '/guide',
        sidebar: ['getting-started', 'writing'],
        subNav: [
          {
            locale: 'nova.navSub.installation',
            link: '/guide/getting-started/installation',
          },
          {
            locale: 'nova.navSub.update',
            link: '/guide/getting-started/update',
          },
          {
            locale: 'nova.navSub.assetHandling',
            link: '/guide/writing/asset-handling',
          },
          {
            locale: 'nova.navSub.frontmatter',
            link: '/guide/writing/frontmatter',
          },
          {
            locale: 'nova.navSub.i18n',
            link: '/guide/writing/i18n',
          },
          {
            locale: 'nova.navSub.markdown',
            link: '/guide/writing/markdown',
          },
        ],
      },
      {
        locale: 'nova.nav.reference',
        link: '/reference',
        sidebar: ['reference', 'themeConfig'],
        subNav: [
          {
            locale: 'nova.navSub.siteConfig',
            link: '/reference/site-config',
            sidebar: ['siteConfig'],
          },
          {
            locale: 'nova.navSub.frontmatterConfig',
            link: '/reference/frontmatter-config',
            sidebar: ['frontmatter-config'],
          },
          {
            locale: 'nova.navSub.themeConfig',
            link: '/reference/theme-config',
            sidebar: ['themeConfig'],
          },
        ],
      },
      {
        text: pkg.version,
        link: 'https://github.com/WRXinYue/valaxy-theme-nova/releases',
      },
      {
        locale: 'nova.nav.about',
        link: '/about',
      },
    ],

    navTools: [
      ['toggleTheme', 'toggleLocale'],
      [{
        icon: 'i-ri-github-fill',
        link: pkg.repository.url,
      }],
      ['search'],
    ],

    hero: {
      title: '$locale:nova.hero.title',
      motto: '$locale:nova.hero.motto',
    },

    footer: {
      since: 2024,
      powered: true,
      icp: '<a class="nova-text" href="https://icp.gov.moe/?keyword=20240132" target="_blank">萌ICP备20240132号</a>',
    },

    gitLog: {
      contributor: {
        strategy: 'prebuilt',
      },
      repositoryUrl: 'https://github.com/WRXinYue/valaxy-theme-nova.git',
    },
  },
})
