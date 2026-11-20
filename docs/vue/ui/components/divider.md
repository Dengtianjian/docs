# KDivider 分割线

> 共同约定见 [共同约定](./index.md)。区隔内容边界的分割线，支持内嵌文字与纵向形态。

## 何时使用

- 大段内容的区块分隔（水平线）；
- 行内操作/链接之间的轻量分隔（纵向线）。

## 代码演示

<Demo path="divider/horizontal" title="水平分割线" :desc="['缺省为纯线；有默认插槽内容时左右出线、文字居中。', '`orientation` 调文字位置，`plain` 用常规字重，`dashed` 虚线。']" />

<Demo path="divider/vertical" title="纵向分割线" desc="`type=vertical` 与相邻文本基线对齐，常见于操作列、面包屑式行内分隔。" />

<Demo path="divider/render" title="自定义渲染（headless）" :desc="['外观不合需求但逻辑合适时，`#render` 插槽或 `render` prop 整件替换视觉输出。', 'scope 给状态与语义绑定包，自绘节点散播即继承。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | 虚线 | `boolean` | `false` |
| orientation | 文字位置（仅含文字时生效） | `'start' \| 'center' \| 'end'` | `'center'` |
| plain | 文字用常规字重（缺省 500 强调） | `boolean` | `false` |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 分割线内嵌文字（有则左右出线） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-divider-inset-block` | `var(--k-size-lg)` | 纯线形态上下外边距 |
| `--k-divider-inset-block-with-text` | `var(--k-size)` | 含文字形态上下外边距 |
| `--k-divider-vertical-gap` | `var(--k-size-xs)` | 纵向线左右外边距 |
| `--k-divider-vertical-height` | `0.9em` | 纵向线高度（inline-block 无内容必须显式给高，否则不可见） |
| `--k-divider-line-color` | `var(--k-color-split)` | 线色 |
| `--k-divider-line-type` | `solid` | 线型（dashed 类切换） |
| `--k-divider-text-color` | `var(--k-color-text)` | 文字色 |
| `--k-divider-text-gap` | `1em` | 文字与线之间的留白 |

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，组件**整件视觉输出被替换**（默认线/文字结构不再渲染），只保留逻辑与语义。两条通道收到同一份 scope = `KDividerRenderScope`（入口导出）。

通用契约见 [headless 自定义渲染](../headless.md)。静态件零行为，无 ref / 动作组，仅状态与绑定包两组：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `'horizontal' \| 'vertical'` | 方向（缺省 `'horizontal'`）；已作为 `aria-orientation` 写进 rootAttrs。默认渲染 horizontal 走 flex + 上边框线，vertical 走 inline-block + 左边框线（显式高度 `0.9em`，否则 0 高不可见）——线形态视觉自绘 |
| dashed | `boolean` | 虚线（缺省 `false`）；默认渲染切 `--k-divider-line-type: dashed` 变量，该变量声明在 `k-divider` 基础类上、**不在包内**，自绘按此值自选 border-style |
| orientation | `'start' \| 'center' \| 'end'` | 文字位置（缺省 `'center'`，仅含文字时生效）；默认渲染 start/end 用伪元素线 `max-width: 5%` 收窄一侧，自绘按值分配文字两侧线的比例 |
| plain | `boolean` | 文字常规字重（缺省 `false` = 500 强调 `--k-font-weight-strong`）；自绘按值选字重 |
| hasText | `boolean` | 是否含文字形态：`type === 'horizontal'` **且默认插槽存在**（判插槽有无，非内容多少）；为 true 时自绘应取 `ctx.slots.default?.()` 画「左右出线、文字居中」结构，vertical 恒 false |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `role="separator"` + `aria-orientation=type`（分隔符无障碍语义，`v-bind` 到自绘根即继承）。**无事件包、不含 class/style**——线色/线型/粗细（`--k-line-width`）、上下外边距、文字留白等全部部件变量（`--k-divider-*`）声明在 `k-divider` 基础类上、不在包内，背景/线条/间距视觉与变量取值全自绘；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 内嵌文字），自绘时可按需取用，如 `ctx.hasText && ctx.slots.default?.()`。

契约：**绑定包散播才继承逻辑**。`render` prop 走 `h()` 时 attrs 直接展开即可（Divider 无事件包）。`classNames` / `styles` 只作用于默认渲染。

**render prop 闭包产物在组件子作用域渲染，不带调用方 `<style scoped>` 的 data-v 属性**——该通道的自绘样式须全局（专属前缀命名）或内联；`#render` 插槽通道在调用方作用域编译，scoped 照常生效。

```vue
<KDivider dashed>
  <template #render="{ dashed, rootAttrs }">
    <div v-bind="rootAttrs" class="my-bar">…</div>
  </template>
</KDivider>
```

---

## 规格附录（实现决策，面向贡献者）

- a11y：`role="separator"` + `aria-orientation`；
- 文字模式的左右线用 `::before/::after`（`flex: auto`）实现，**不生成幽灵元素**——复制/打印内容不带多余空白；
- 线粗细统一吃全局 `--k-line-width`，本组件不自管。
