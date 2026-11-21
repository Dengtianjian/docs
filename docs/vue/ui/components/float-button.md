# KFloatButton 悬浮按钮

> 共同约定见 [共同约定](./index.md)。P8 增强件。固定于视口四角的快捷操作按钮，可展开菜单。

## 何时使用

- 全局新建、帮助、反馈等随时可用的入口；
- 需要从主按钮展开一组快捷操作；
- 需要角标、提示与方形文字按钮。

## 代码演示

<Demo path="float-button/basic" title="展开菜单" :desc="['传入 `items` 后点击按钮展开菜单。', '`badge` 展示角标，`tooltip` 在未展开时提示。', '`select` 派发菜单项并自动收起。']" />

<Demo path="float-button/variants" title="方形按钮与位置" :desc="['`position` 支持四角，`offset` 为 `[水平, 垂直]`。', '`shape=&quot;square&quot;` 可展示文字描述。', '`type=&quot;default&quot;` 使用卡片风格。']" />

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
| description | 方形按钮文字 | `string` | — |
| tooltip | 未展开提示 | `string` | — |
| badge | 角标 | `string \| number` | — |
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

### 暴露方法

`open()` / `close()`。