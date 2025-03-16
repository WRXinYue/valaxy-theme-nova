---
title: HomePage
title_zh-CN: 主页
categories:
  - frontmatter-config
end: true
---

主题提供了一个首页布局，也可以在[此站点首页](http://oceanus.wrxinyue.org/)看到。可以通过 frontmatter 指定 `layout: home` 在任何页面上使用它

```md
---
layout: home
---
```

## Hero 部分

通过 `themeConfig.hero` 进行配置，详情见 [主题配置-主页-hero](/reference/theme-config/home-page)

## FeaturedArticles 部分

精选文章部分用于展示网站的重要或热门内容。通过 `featuredArticles` 配置：

```md
---
featuredArticles:
  subtitle: 精选文章
  title: 探索我们的热门内容
  description: 这些精选文章展示了 Oceanus 主题的强大功能和灵活性，帮助您快速了解如何充分利用这个主题。

  articles:
    - title: 快速开始
      cover: /images/featured-1.jpg
      tags: ["指南", "入门"]
      excerpt: 了解如何快速设置和配置 Oceanus 主题，开始构建您的文档或博客网站。
    - title: 主题定制
      cover: /images/featured-2.jpg
      tags: ["定制", "样式"]
      excerpt: 探索 Oceanus 主题的定制选项，包括颜色、字体、布局等，打造独特的网站风格。
    - title: 高级功能
      cover: /images/featured-3.jpg
      tags: ["高级", "功能"]
      excerpt: 深入了解 Oceanus 主题的高级功能，如多语言支持、搜索优化、性能调优等。
---
```

类型定义：

```ts
export type FeaturedArticles = Partial<{
  title: string // 标题
  subtitle: string // 副标题
  description: string // 描述文本
  text: string // 额外文本（可选）

  articles: Partial<{
    title: string // 文章标题
    cover: string // 封面图片URL
    tags: string[] // 标签数组
    excerpt: string // 文章摘要
  }[]>
}>
```

## Features 部分

Features 部分用于展示主题或产品的主要特性和功能。通过 `features` 配置：

```md
---
features:
  subtitle: 特性
  title: 强大的功能
  text: Oceanus 主题提供了丰富的功能，满足各种文档和博客需求

  cards:
    - title: 简单
      details: 无需复杂配置，开箱即用，适合快速构建文档网站
      icon: i-carbon-cube
      num: "01"
    - title: 关联式导航
      details: 每个一级导航可绑定对应的二级导航，一级导航和二级导航支持绑定相应的侧边栏，形成清晰的导航结构
      icon: i-carbon-menu
      num: "02"
---
```

类型定义：

```ts
export type Features = Partial<{
  title: string // 标题
  subtitle: string // 副标题
  text: string // 描述文本

  cards: Partial<{
    num: string // 编号（如 "01"）
    title: string // 特性标题
    icon: string // 图标类名（使用 UnoCSS 图标，如 i-carbon-cube）
    details: string // 特性详细描述
  }[]>
}>
```

::: tip
图标使用 UnoCSS 的图标系统，可以使用 `i-carbon-*` 前缀的图标，例如 `i-carbon-cube`、`i-carbon-menu`、`i-carbon-document` 等。
:::

## Contribution 部分

Contribution 部分用于展示项目贡献者信息。通过 `contributors` 配置：

```md
---
contributors:
  subtitle: 贡献者
  title: 感谢所有贡献者
  text: 已获得 MIT 许可，并且将始终免费且开源。感谢 GitHub上的所有贡献者！
---
```

类型定义：

```ts
export type Contributors = Partial<{
  title: string // 标题
  subtitle: string // 副标题
  text: string // 描述文本
}>
```

::: tip
贡献者信息需要安装 `valaxy-addon-git-log` 插件才能正常显示。插件会自动从 Git 历史中获取贡献者信息。
:::

## GetStarted 部分

GetStarted 部分用于引导用户开始使用产品或主题。通过 `getStarted` 配置：

```md
---
getStarted:
  title: 开始使用 Oceanus 主题
  text: 准备好体验一个能够跟上您思维速度的开发环境，打造美观、高效的文档和博客网站。
  actions:
    - text: 开始使用
      link: /guide/getting-started/installation
    - text: 查看文档
      link: /reference/theme-config/home-page
  cards:
    - img: https://vite.dev/logo.svg
      alt: Vite Logo
      color: '#9499ff'
    - img: /favicon.svg
      alt: Vite Logo
      color: '#17ead9'
    - img: https://valaxy.site/valaxy-logo.png
      alt: Valaxy Logo
      color: '#9333EA'
---
```

类型定义：

```ts
export type GetStarted = Partial<{
  title: string // 标题
  text: string // 描述文本
  actions: { // 操作按钮
    theme?: 'brand' // 按钮主题
    text?: string // 按钮文本
    link?: string // 按钮链接
  }[]

  cards: { // 技术/工具卡片
    img: string // 图片URL
    alt: string // 图片替代文本
    color?: string // 卡片颜色（用于发光效果）
  }[]
}>
```

## 完整示例

以下是一个完整的首页配置示例：

```md
---
title: 主页
layout: home

features:
  subtitle: 特性
  title: 强大的功能
  text: Oceanus 主题提供了丰富的功能，满足各种文档和博客需求

  cards:
    - title: 简单
      details: 无需复杂配置，开箱即用，适合快速构建文档网站
      icon: i-carbon-cube
      num: "01"
    # 更多特性卡片...

featuredArticles:
  subtitle: 精选文章
  title: 探索我们的热门内容
  description: 这些精选文章展示了 Oceanus 主题的强大功能和灵活性。

  articles:
    - title: 快速开始
      cover: /images/featured-1.jpg
      tags: ["指南", "入门"]
      excerpt: 了解如何快速设置和配置 Oceanus 主题。
    # 更多文章...

contributors:
  subtitle: 贡献者
  title: 感谢所有贡献者
  text: 已获得 MIT 许可，并且将始终免费且开源。

getStarted:
  title: 开始使用 Oceanus 主题
  text: 准备好体验一个能够跟上您思维速度的开发环境。
  actions:
    - text: 开始使用
      link: /guide/getting-started/installation
    - text: 查看文档
      link: /reference/theme-config/home-page
  cards:
    - img: https://vite.dev/logo.svg
      alt: Vite Logo
      color: '#9499ff'
    # 更多技术卡片...
---
```
