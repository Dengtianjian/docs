---
pageClass: token-reference
---

<script setup>
import TokenTable from './TokenTable.vue'
</script>

# CSS Token / 原子类对照

按分类成表，**名称 / 描述在首列**。一对一的关系直接并排在一行；只有一对多才拆子行：

- 一个 token 对应多个原子类（如 `--k-size-xxs` 对应 17 个间距类）：token 父行下逐个列出类的子行；
- 一个原子类对应多个 token（如 `k-border`、`k-scrollbar`）：类做父行，token 逐个摊成子行。

子行带自己的名称、描述、示例，沿用父行的 CSS token、JS 键名和默认值；没有对应项就留空，不写占位符。没有 token 的原子类（如 `k-scrollbar-none`、布局类）是独立行，不挂靠、不缩进，并进对得上的分类末尾，对不上的按它自己的分类单独成表（见「布局」）。表格直接解析 `theme.css` 与 `atoms.css` 生成，改源码即同步。

- **默认值**：默认主题（亮色）下的取值；表达式类 token 保留派生表达式，缩放类 token 已换算成实际 px。
- **示例**：每行标注类型——`CSS`（变量用法）、`类名`（原子类用法）、`CSS 变量`（作用域内覆盖）、`JS 配置`（createTheme / breakpoints）。
- **JS 键名**：`createTheme({ alias })` / `KConfigProvider` 主题配置的键，kebab → camelCase（`--k-size-md` → `sizeMD`）；`seed` 层写作 `seed.colorPrimary`，配置时放 `seed` 下并去掉 `seed-` 前缀。
- 更多派生规则见[主题 Token 规格](/vue/ui/design/theme-tokens)；`--k-scrollbar-*` 是 `.k-scrollbar` 的局部变量，没有主题键。

```ts
createTheme({
  seed: { colorPrimary: '#1677ff' },
  alias: {
    sizeMD: '20px',
    colorPrimaryText: '#0958d9'
  }
})
```

## Seed

<TokenTable section="Seed" />

## Base · 模式基线

<TokenTable section="Base · 模式基线" />

## Map · 语义色

<TokenTable section="Map · 语义色" />

## Alias · 文本 / 填充 / 遮罩

<TokenTable section="Alias · 文本 / 填充 / 遮罩" />

## Alias · 灰阶 / 中性色

<TokenTable section="Alias · 灰阶 / 中性色" />

## Alias · 背景 / 边框 / 阴影 / 光晕

<TokenTable section="Alias · 背景 / 边框 / 阴影 / 光晕" />

## Alias · 字体

<TokenTable section="Alias · 字体" />

## Alias · 圆角 / 间距 / 控件高

<TokenTable section="Alias · 圆角 / 间距 / 控件高" />

## Alias · 动效 / zIndex / 图标 / 断点

<TokenTable section="Alias · 动效 / zIndex / 图标 / 断点" />

## 滚动条局部变量

<TokenTable section="滚动条局部变量" />

## 布局

<TokenTable section="布局" />