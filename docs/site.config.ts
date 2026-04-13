import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  /** Used by Valaxy markdown `::: en` / `::: zh-CN` containers + css-i18n */
  languages: ['zh-CN', 'en'],
  lang: 'zh-CN',
  title: 'valaxy-theme-nova',
  url: 'https://starter.valaxy.site/',
  mode: 'light',
  author: {
    avatar: '/avatar.jpg',
    name: 'WRXinYue',
  },

  comment: {
    enable: false,
  },

  mediumZoom: {
    enable: true,
  },
})
