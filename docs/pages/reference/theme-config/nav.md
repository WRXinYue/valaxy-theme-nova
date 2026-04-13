---
title:
  en: Nav
  zh-CN: 导航栏
end: true
---

默认情况下，nav 显示 `siteConfig.title` 作为站点的标题。如果想更改导航栏上显示的内容，可以在 themeConfig.navTitle 选项中定义自定义文本。

## navPlaceholder

- 类型：`boolean`
- 默认：`true`

在固定顶栏（`position: fixed`）时，主题会在导航下方插入一块占位（`.nav-placeholder`），高度为 `--nova-nav-height`，避免正文被导航遮挡。

若关闭占位，可将 `themeConfig.navPlaceholder` 设为 `false`。此时需自行处理主内容区与顶栏的间距（例如页面根节点加 `padding-top`）。

```ts
// valaxy.config.ts
export default defineConfig({
  themeConfig: {
    navPlaceholder: false,
  },
})
```
