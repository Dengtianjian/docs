# 原子样式（atoms）

> 定位：组件库自带的一层**轻量、可选**的原子样式类，供业务页面、业务组件和二次封装使用；不是完整 Tailwind，无构建引擎、无变体语法、无任意值。类名与设计 token 对齐，亮暗主题自动跟随。

## 引入与使用

```ts
// 已包含在 index.css 中；单独引入亦可
import 'kit/vue/ui/css/atoms.css'
```

- **按容器选择**：给需要的节点加类，不做全局兜底；同一个类在不同容器可分别使用。
- **作用对象**：业务/自绘节点、二次封装的外壳与布局；kit 组件内部样式仍用语义类，改组件请走 `classNames` / `styles`。
- **优先级**：普通单类，未分层；与组件同层，靠引入顺序竞争，业务样式可覆盖。仅 `k-hidden`、`k-scrollbar-none` 带 `!important`。
- **冲突顺序**：整体间距 < 单轴（x/y）< 单边（t/r/b/l）< 自动外边距。

## 尺寸档位

间距类共用同一档位，对应 `--k-size-*`：

| 档位 | `0` | `xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 值 | 0 | 4 | 8 | 12 | 20 | 24 | 32 | 48 |

## 滚动条

按容器加类即可统一外观；变量可在容器或 `:root` 覆写。

```html
<div class="k-scrollbar" style="max-height: 120px; overflow-y: auto">
  <div v-for="i in 20" :key="i">第 {{ i }} 行</div>
</div>
```

<div class="k-scrollbar k-p-sm k-border k-rounded-lg" style="max-height: 120px; overflow-y: auto">
  <div v-for="i in 20" :key="i">第 {{ i }} 行</div>
</div>

| 类名 | 说明 |
| --- | --- |
| `k-scrollbar` | 统一滚动条：细轨、圆角滑块、悬浮加深 |
| `k-scrollbar-none` | 隐藏滚动条（仍可滚动） |

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `--k-scrollbar-size` | `6px` | 滚动条宽/高 |
| `--k-scrollbar-thumb` | `--k-color-fill-secondary` | 滑块颜色 |
| `--k-scrollbar-thumb-hover` | `--k-color-fill` | 滑块悬浮颜色 |
| `--k-scrollbar-track` | `transparent` | 轨道颜色 |

```css
/* 局部统一：某个容器更细、更浅 */
.panel .k-scrollbar { --k-scrollbar-size: 4px; }
```

## 布局

| 类名 | 说明 |
| --- | --- |
| `k-block` / `k-inline-block` / `k-inline` | display |
| `k-flex` / `k-inline-flex` / `k-grid` | display |
| `k-hidden` | `display: none !important` |
| `k-flex-row` / `k-flex-col` / `…-reverse` | 主轴方向 |
| `k-flex-wrap` / `k-flex-nowrap` | 换行 |
| `k-flex-1` / `k-flex-auto` / `k-flex-none` | 伸缩 |
| `k-items-start` / `-center` / `-end` / `-baseline` / `-stretch` | 交叉轴对齐 |
| `k-justify-start` / `-center` / `-end` / `-between` | 主轴对齐 |
| `k-self-start` / `-center` / `-end` / `-stretch` | 单项交叉轴 |
| `k-min-w-0` | 允许 flex 子项收缩 |
| `k-w-full` | `width: 100%` |

```html
<div class="k-flex k-items-center k-gap-sm k-p-sm k-bg-fill-tertiary k-rounded-lg">
  <span class="k-text-secondary k-text-sm">本月调用</span>
  <span class="k-ml-auto k-font-strong">12,480</span>
</div>
```

<div class="k-flex k-items-center k-gap-sm k-p-sm k-bg-fill-tertiary k-rounded-lg" style="max-width: 320px">
  <span class="k-text-secondary k-text-sm">本月调用</span>
  <span class="k-ml-auto k-font-strong">12,480</span>
</div>

## 间距

`{prop}-{size}` 模式，`size` 取上方档位；`0` 用于清零。

| 前缀 | 作用 |
| --- | --- |
| `k-p-*` / `k-m-*` | 四边 padding / margin |
| `k-px-*` / `k-py-*` | 水平 / 垂直 padding |
| `k-mx-*` / `k-my-*` | 水平 / 垂直 margin |
| `k-pt-*` `k-pr-*` `k-pb-*` `k-pl-*` | 单边 padding |
| `k-mt-*` `k-mr-*` `k-mb-*` `k-ml-*` | 单边 margin |
| `k-gap-*` / `k-gap-x-*` / `k-gap-y-*` | flex/grid 间距 |
| `k-m-auto` / `k-mx-auto` / `k-ml-auto` / `k-mr-auto` | 自动外边距 |

## 文本

| 类名 | 说明 |
| --- | --- |
| `k-text-sm` / `k-text-base` / `k-text-lg` / `k-text-xl` | 字号（沿用 token 字阶） |
| `k-text-primary` / `k-text-secondary` / `k-text-tertiary` / `k-text-quaternary` | 文本层级 |
| `k-text-success` / `k-text-warning` / `k-text-error` / `k-text-info` / `k-text-link` | 语义色 |
| `k-text-light` | 深色底上的浅色文本 |
| `k-font-strong` | 强调字重 |
| `k-ellipsis` / `k-ellipsis-2` | 单行 / 两行省略 |
| `k-tabular-nums` | 等宽数字 |

## 背景 / 边框 / 圆角

| 类名 | 说明 |
| --- | --- |
| `k-bg-container` / `k-bg-elevated` / `k-bg-layout` | 容器 / 浮层 / 布局底色 |
| `k-bg-fill` / `k-bg-fill-secondary` / `k-bg-fill-tertiary` | 填充层级 |
| `k-border` | `1px solid var(--k-color-border)` |
| `k-rounded-none` / `-xs` / `-sm` / 无后缀 / `-lg` / `-xl` / `-full` | 圆角 |

## 不提供

hover / 响应式 / 暗色变体、任意值、负间距、栅格模板、宽高比例。当前目标是轻量外壳工具；出现真实需求再按 token 增量补齐。