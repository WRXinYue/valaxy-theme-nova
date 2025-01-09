---
title: Overview
title_zh-CN: 概览
categories:
  - frontmatter-config
end: true
top: 1000
---

frontmatter 支持基于页面的配置。在每个 markdown 文件中，可以使用 frontmatter 配置来覆盖站点级别或主题级别的配置选项。此外，还有一些配置选项只能在 frontmatter 中定义。

示例用法：

```md
---
title: Docs with Oceanus
---
```

### path

- 类型：`string`

`route.path` 路径

### title

- 类型：`string`

```md
---
title: Valaxy
---
```

文章标题

### titleTemplate

- 类型：`string`

使 HTML 标题变为 `Valaxy - Next Generation Static Blog Framework`

```md
---
title: Valaxy
titleTemplate: '%s - Next Generation Static Blog Framework'
---
```

### description

- 类型：`string`

页面的描述。它会覆盖站点级别的配置

```md
---
description: Valaxy
---
```

### date

- 类型：`string` | `number` | `Date`

文章创建日期

```md
---
date: '2025-01-01 00:00:00'
---
```

### updated

- 类型：`string` | `number` | `Date`

文章更新日期

```md
---
date: '2025-01-01 00:00:00'
---
```

### cover

- 类型：`string`

文章封面图片

### toc

- 类型：`boolean`

是否显示目录

### aside

- 类型：`boolean`

### end

是否显示结束标签，将在末尾添加衬线字体 Q.E.D.

### encrypt

- 类型：`boolean`

是否启用加密，password 存在时默认为 true

### password

- 类型：`string`

加密密码
