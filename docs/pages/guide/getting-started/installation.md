---
title: Installation
title_zh-CN: 安装
categories:
  - getting-started
end: true
top: 100
---

### 兼容性{lang="zh-CN"}

### compatibility{lang="en"}

::: zh-CN
| 版本 | Node | valaxy |
| --- | --- | --- |
| <Version type="oceanus" /> + | Node >= 18.12 | Valaxy >= <Version type="valaxy" /> |
:::

::: en
| version | Node | valaxy |
| --- | --- | --- |
| <Version type="oceanus" /> + | Node >= 18.12 | Valaxy >= <Version type="valaxy" /> |
:::

### 创建 Valaxy 博客项目{lang="zh-CN"}

### Create a Valaxy blog project{lang="en"}

::: zh-CN
::: tip
推荐使用 `pnpm` 进行安装主题。如果您的系统中尚未安装 `pnpm`，可以通过执行 `npm install -g pnpm` 命令进行安装

在创建 Valaxy 项目的过程中， `create valaxy` 命令会自动下载和安装 Valaxy，无需您手动进行安装
:::

::: en
::: tip
It is recommended to use `pnpm` to install the theme. If `pnpm` is not installed on your system, you can install it by running the command `npm install -g pnpm`.

During the creation of a Valaxy project, the `create valaxy` command will automatically download and install Valaxy, so you don't need to install it manually.
:::

::: code-group

```bash [pnpm]
pnpm create valaxy
```

```bash [npm]
npm create valaxy
```

```bash [yarn]
yarn create valaxy
```

:::

::: zh-CN
::: details 你能看到以下的输出
<CreateValaxyTooltip />
:::

::: en
::: details You will be greeted with a few simple questions.
<CreateValaxyTooltip />
:::

### 安装主题{lang="zh-CN"}

### Install theme{lang="en"}

::: zh-CN
在创建 Valaxy 项目后，您需要安装主题以便项目能够按照您期望的样式呈现。

进入到您刚刚创建的 Valaxy 项目所在的文件夹，打开终端，然后执行以下命令来安装主题：
:::

::: en
After creating a Valaxy project, you need to install a theme for the project to display in the style you desire.

Navigate to the folder where you just created the Valaxy project, open the terminal, and then execute the following command to install the theme:
:::

::: code-group

```bash [pnpm]
pnpm add valaxy-theme-oceanus
```

```bash [npm]
npm install valaxy-theme-oceanus
```

```bash [yarn]
yarn add valaxy-theme-oceanus
```

:::

::: zh-CN
::: tip
如果您在创建的过程中遇到困难，强烈建议先看[Valaxy文档](https://valaxy.site/guide/getting-started)
:::

::: en
::: tip
If you encounter difficulties during the creation process, it is highly recommended to first check the [Valaxy documentation.](https://valaxy.site/guide/getting-started)
:::

### 启用主题{lang="zh-CN"}

### Enable theme{lang="en"}

::: zh-CN
在安装主题之后并不会启用主题。首先在 `valaxy.config.ts` 文件中启用 `oceanus` 主题，您需要按照以下步骤操作：

打开 Valaxy 项目的根目录的 `valaxy.config.ts` 文件，修改如下标注的位置，以确保 TypeScript 的类型检查和自动完成功能能够正常使用
:::

::: en
The theme will not be activated after installation. First, enable the `oceanus` theme in the `valaxy.config.ts` file. You need to follow these steps:

Open the `valaxy.config.ts` file in the root directory of the Valaxy project, and modify the positions indicated below to ensure that TypeScript's type checking and auto-completion features work correctly:
:::

```ts {2-4}
import type { ThemeUserConfig } from 'valaxy-theme-oceanus'
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'oceanus'
})
```

::: zh-CN
::: tip
TypeScript 是 JavaScript 的一个超集，添加了类型系统和对 ES6+ 的支持。它不仅能让开发者在编码阶段就能发现潜在的错误，还能提高代码的可读性和可维护性

简单来说，TypeScript 可以在您编辑配置文件时自动完成代码提示，并且如果配置不正确，它会立即用红色警告提示您，以便您及时修正错误
:::

::: en
::: tip
TypeScript is a superset of JavaScript that adds a type system and support for ES6+. It not only allows developers to identify potential errors during the coding phase but also improves code readability and maintainability.

In simple terms, TypeScript can automatically complete code suggestions while you are editing configuration files, and if the configuration is incorrect, it will immediately alert you with a red warning so that you can correct errors promptly.
:::

:::zh-CN

> 主题名称自动根据 `valaxy-theme-xxx` 的格式获取，如本主题名为`valaxy-theme-oceanus`，所以oceanus就是这个主题的名称

在theme选项中填入 `oceanus` 来实现主题切换
:::

:::en

> The theme name is automatically retrieved in the format `valaxy-theme-xxx`. For example, this theme is named `valaxy-theme-oceanus`, so oceanus is the name of this theme.

Fill in `oceanus` in the theme option to switch themes.
:::

```ts {5}
import type { ThemeUserConfig } from 'valaxy-theme-oceanus'
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'oceanus'
})
```

:::zh-CN
::: warning
请确保您已经正确地导入了所有必要的类型。如果导入的类型不正确，可能会导致构建失败
:::

:::en
::: warning
Please ensure that you have correctly imported all the necessary types. Incorrectly imported types may cause the build to fail.
:::

:::zh-CN

> 通过遵循上述步骤，您可以顺利地在您的项目中启用 oceanus 主题，并利用 TypeScript 提供的类型安全和代码智能提示功能，享受到更加愉快的博客使用体验

如果创建 Valaxy 项目的时候没有安装依赖，那么我们就要手动安装依赖:
:::

:::en
By following the steps above, you can successfully enable the oceanus theme in your project and enjoy a more pleasant blogging experience with the type safety and code intelligence features provided by TypeScript.

If the dependencies were not installed when creating the Valaxy project, we need to install the dependencies manually:
:::

::: code-group

```bash [pnpm]
pnpm i
```

```bash [npm]
npm install
```

```bash [yarn]
yarn
```

:::

:::zh-CN
完成上述配置后，您已经完成了基本设置。接下来，您就可以启动您的博客啦！
:::

:::en
After completing the above configuration, you have finished the basic setup. Next, you can start your blog!
:::

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::
