# KFloatButton 悬浮按钮

> 共同约定见 [共同约定](./index.md)。P8 增强件。固定于视口四角的快捷操作按钮，可展开菜单。

## 何时使用

- 全局新建、帮助、反馈等随时可用的入口；
- 需要从主按钮展开一组快捷操作；
- 需要角标、提示与方形文字按钮；
- 长页面回到顶部用 `KFloatButtonBackTop`（独立组件）；多个悬浮入口用 `KFloatButtonGroup` 堆叠。

## 代码演示

<Demo path="float-button/basic" title="展开菜单" :desc="['传入 `items` 后点击按钮展开菜单。', '`badge` 展示角标，`tooltip` 在未展开时提示。', '`select` 派发菜单项并自动收起。']" />

<Demo path="float-button/back-top" title="分组堆叠" :desc="['`KFloatButtonGroup` 把多个 KFloatButton（包括 KFloatButtonBackTop）常驻堆叠在一个角落。', '组统一负责 `position / offset / gap`，子按钮不再各自定位；把 KFloatButtonBackTop 放进组内即可。']" />

<Demo path="float-button/backtop-single" title="单独回顶按钮" :desc="['`KFloatButtonBackTop` 独立使用：滚动阈值后出现，回到顶部。', '与 KFloatButton 另有平级 offset，或放入 KFloatButtonGroup。']" />

<Demo path="float-button/variants" title="方形按钮与位置" :desc="['`position` 支持四角，`offset` 为 `[水平, 垂直]`。', '`shape=&quot;square&quot;` 可展示 `content` 文字。', '`type=&quot;default&quot;` 使用卡片风格。']" />

<Demo path="float-button/content-badge" title="内容 / 对象角标 / 链接 / hover 提示" :desc="['`content` 展示方形按钮文字，`badge` 支持 `{ count, dot, color }`。', '有 `href` 且无菜单时渲染为链接，自动补 `target=_blank` 的 rel。', '`tooltip` hover 或键盘聚焦时显示，默认隐藏。']" />

<Demo path="float-button/draggable" title="拖拽 / 磁吸" :desc="['`draggable` 开启拖拽，拖动后通过 `v-model:coordinate` 回写坐标。', '`magnetic` 吸附左右边缘，`axis` 可限制水平/垂直，`gap` 控制边距。', '拖拽不会误触点击；`reset()` 回到 `position` 指定的角落。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项 | `KFloatButtonItem[]` | `[]` |
| position | 视口位置 | `'right-bottom' \| 'left-bottom' \| 'right-top' \| 'left-top'` | `'right-bottom'` |
| offset | 距离边缘 | `[number, number] \| number` | `[24, 24]` |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| type | 风格 | `'default' \| 'primary'` | `'primary'` |
| content | 主按钮文字（方形按钮常用） | `string \| number` | — |
| description | 兼容别名，等价于 `content` | `string` | — |
| tooltip | hover / 键盘聚焦提示 | `string` | — |
| badge | 角标；支持数字、文本或对象 `{ count, dot, color, overflowCount, showZero }` | `string \| number \| KFloatButtonBadge` | — |
| href / target | 有 `href` 且无菜单时渲染为链接 | `string` | — |
| htmlType | 原生按钮类型 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| draggable | 可拖拽 | `boolean` | `false` |
| coordinate | 拖拽坐标（`v-model:coordinate`）；`null` 时使用 `position` | `{ x, y } \| null` | `null` |
| magnetic | 吸附左右边缘 | `boolean` | `true` |
| axis | 拖动轴 | `'both' \| 'x' \| 'y'` | `'both'` |
| gap | 拖拽边距；缺省跟随 `offset` 的水平值 | `number` | — |
| disabled | 禁用 | `boolean` | `false` |
| safeArea | 上下边距叠加安全区 | `boolean` | `true` |
| teleport | 传送到 popup 容器；`false` 时原地渲染 | `boolean` | `true` |
| ariaLabel | 按钮名称 | `string` | `'快捷操作'` |
| menuAriaLabel | 菜单名称 | `string` | `'快捷操作菜单'` |
| classNames / styles | 部件：`root / button / icon / description / badge / menu / menuItem / tooltip` | — | — |

### KFloatButtonItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 文本 | `string` |
| icon | 图标组件 | `Component` |
| disabled | 禁用 | `boolean` |
| danger | 危险项 | `boolean` |

### KFloatButtonBadge

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| count | 数字角标 | `number` |
| dot | 红点模式 | `boolean` |
| color | 自定义底色 | `string` |
| overflowCount | 封顶值 | `number`（默认 99） |
| showZero | `count=0` 时仍显示 | `boolean` |

### KFloatButtonBackTop

独立回到顶部组件，复用 `KFloatButton` 的外观与定位：滚动超过阈值后出现，点击先触发 `click` 再平滑回到顶部；组内使用时自动改为组布局并保留占位。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 滚动容器；缺省 window | `KScrollTarget` | — |
| visibilityHeight | 滚动超过该距离后显示 | `number` | `200` |
| position / offset | 视口位置与边距，同 KFloatButton | 同上 | `'right-bottom'` / `[24, 24]` |
| size / shape / type | 尺寸、形状、风格 | 同上 | `'md'` / `'circle'` / `'default'` |
| tooltip | hover / 键盘聚焦提示 | `string` | — |
| ariaLabel | 按钮名称 | `string` | `'回到顶部'` |
| safeArea / teleport | 安全区、传送；默认原地渲染 | `boolean` | `true` / `false` |
| classNames / styles | 部件：`root / button / icon / tooltip` | — | — |

事件：`click`。插槽：`icon`（缺省向上箭头）。

```vue
<KFloatButtonBackTop :target="() => scrollEl" :visibility-height="80" />
```

### KFloatButtonGroup

把多个 `KFloatButton`（含 `KFloatButtonBackTop`）常驻堆叠在同一个角落；组统一负责定位与间距，子按钮自动改为组内布局（自身 `position` / `offset` 不生效）。使用时直接把回顶组件放入 Group 的插槽即可。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position / offset | 组在视口的角落与边距 | 同 KFloatButton | `'right-bottom'` / `[24, 24]` |
| gap | 子按钮间距 | `number` | `10` |
| safeArea | 边距叠加安全区 | `boolean` | `true` |
| teleport | 传送到 popup 容器；`false` 时原地渲染 | `boolean` | `true` |
| ariaLabel | 组名称 | `string` | `'悬浮按钮组'` |
| classNames / styles | 部件：`root` | — | — |

插槽：`default`（组内 KFloatButton / KFloatButtonBackTop）。

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| icon | 主按钮图标 | — |
| menu-item | 自定义菜单项 | `{ item }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 无子项时点击主按钮 | `MouseEvent` |
| select | 选择菜单项 | `item` |
| openChange | 菜单开合 | `boolean` |
| dragStart | 开始拖拽 | `{ x, y }` |
| dragEnd | 拖拽结束并完成吸附 | `{ x, y }` |

### 暴露方法

`open()` / `close()` / `reset()`。

### 与 KFloatingBubble 的关系

拖拽、吸附、轴限制与坐标已并入 KFloatButton；KFloatingBubble 继续保留给只需要悬浮球、不需要菜单/四角定位的场景，后续可按项目需要降级为 KFloatButton 的预设用法。

### 端侧适配

- 层级走 `--k-z-index-float-button`（高于吸顶/侧栏，低于 modal/遮罩），拖到侧栏上也不会被覆盖。
- 上下角落自动叠加 `env(safe-area-inset-top/bottom)`，可用 `safeArea=false` 关闭。
- 触屏设备下 `sm` 按钮不低于 44px，菜单行高 44px。
- hover 浮起只在支持 hover 的设备启用，触屏不会粘住悬浮态。
- 拖拽、磁吸与点击抑制同时适用于桌面鼠标和触屏。
- 磁吸落位有 220ms 过渡，按钮按下有缩放反馈，菜单沿用进出场动画。

### 与 antd FloatButton 的差异

- 基础按钮已对齐 `content / href / target / htmlType / badge 对象 / tooltip / disabled / shape / type`。
- `FloatButton.BackTop` = `KFloatButtonBackTop`（独立组件）；`FloatButton.Group` = `KFloatButtonGroup`（常驻堆叠容器，KFloatButtonBackTop 作为子项放入）。
- 为兼容既有用法，KFloatButton 的 `type` 默认仍为 `primary`（antd 默认 `default`），可显式传 `type="default"`。