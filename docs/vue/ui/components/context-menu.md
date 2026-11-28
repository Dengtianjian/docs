# KContextMenu 右键菜单

> 共同约定见 [共同约定](./index.md)。P8 增强件。包裹任意内容并在右键位置打开操作菜单。

## 何时使用

- 文件、卡片、列表项的上下文操作；
- 需要比下拉菜单更贴近指针位置的交互；
- 需要完整的键盘导航与危险项样式。

## 代码演示

<Demo path="context-menu/basic" title="基础右键菜单" :desc="['右键触发区域打开菜单，自动限制在视口内。', '`divider` 生成分隔线，`shortcut` 展示快捷键。', '`select` 派发被选项；点击外部或 Esc 关闭。']" />

<Demo path="context-menu/states" title="禁用项与危险项" :desc="['`disabled` 项不可聚焦、不可选择。', '`danger` 使用错误色。', '支持 Shift+F10 与键盘菜单键唤起。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项 | `KContextMenuItem[]` | `[]` |
| disabled | 禁用整个菜单 | `boolean` | `false` |
| ariaLabel | 菜单无障碍名称 | `string` | `'上下文菜单'` |
| classNames / styles | 部件：`root / trigger / header / item / itemIcon / label / shortcut / divider / footer` | — | — |

### KContextMenuItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 文本 | `string` |
| icon | 图标组件 | `Component` |
| shortcut | 快捷键文案 | `string` |
| disabled | 禁用 | `boolean` |
| danger | 危险项 | `boolean` |
| divider | 渲染为分隔线 | `boolean` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| default | 触发区域 | — |
| header | 菜单顶部 | — |
| footer | 菜单底部 | — |
| item | 自定义菜单项文本 | `{ item }` |
| icon | 自定义图标 | `{ item }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选择菜单项 | `item, MouseEvent \| KeyboardEvent` |
| open | 菜单打开 | `{ x, y }` |
| close | 菜单关闭 | — |

### 暴露方法

| 方法 | 说明 |
| --- | --- |
| openAt(x, y) | 在视口坐标打开 |
| close() | 关闭 |

### 键盘

`↓ / ↑` 移动，`Home / End` 首尾，`Enter / Space` 执行，`Esc` 关闭；触发区支持 `Shift + F10`。