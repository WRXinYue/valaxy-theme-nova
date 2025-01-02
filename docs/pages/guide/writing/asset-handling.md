---
title: Asset Handling
title_zh-CN: 资源处理
categories:
  - writing
end: true
---

# {{ $frontmatter.title }}

## 引用静态资源

所有的 Markdown 文件都会被编译成 Vue 组件，并由 Vite 处理。可以并且应该使用相对路径来引用资源：

```md
![An image](./image.png)
```

可以在 Markdown 文件、主题中的 `*.vue` 组件、样式和普通的 `.css` 文件中引用静态资源，可以使用绝对路径（基于项目根目录）或者相对路径（基于文件系统）。后者类似于 Vite、Vue CLI 或者 webpack 的 file-loader 的行为。

常见的图像、媒体和字体文件会被自动检测并视作资源。

::: warning

通过链接引用的文件不会视作资源。在 Markdown 内，通过链接引用的 PDF 或者其他文档不会被自动视作资源。要使这些文件可用，你必须手动将其放在项目的 `public` 目录内。

:::

所有引用的资源，包括那些使用绝对路径的，都会在生产构建过程中被复制到输出目录，并使用哈希文件名。从未使用过的资源将不会被复制。小于 4KB 的图像资源将会采用 base64 内联——这可以通过 Vite 配置选项进行配置。

所有静态路径引用，包括绝对路径，都应基于你的工作目录的结构。

### public 目录

有时可能需要一些静态资源，但这些资源没有直接被 Markdown 或主题组件直接引用，或者你可能想以原始文件名提供某些文件，像 `robots.txt`、`favicon` 和 PWA 图标这样的文件。

请注意，应使用根绝对路径来引用放置在 `public` 中的文件——例如，`public/icon.png` 应始终在源代码中使用 `/icon.png` 引用。
