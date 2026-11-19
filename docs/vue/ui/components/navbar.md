# KNavBar 顶部导航

> 共同约定见 [共同约定](./index.md)。P4 导航批。移动端顶部导航：返回、标题/副标题与两侧插槽。

## 何时使用

- 移动端页面标题栏；
- 需要返回按钮与右侧操作（分享、更多）。

## 代码演示

<Demo path="navbar/basic" title="标题 / 副标题 / 返回 / 右侧操作" :desc="['`title` 与 `subtitle`；`back` 控制返回按钮。', '`#left` / `#title` / `#subtitle` / `#right` 插槽可替换各区域。', '`fixed` 固定在视口顶部；`safeArea` 处理刘海屏安全区。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| subtitle | 副标题 | `string` | — |
| back | 显示返回按钮 | `boolean` | `true` |
| fixed | 固定在视口顶部 | `boolean` | `false` |
| safeArea | 顶部安全区（`env(safe-area-inset-top)`） | `boolean` | `true` |
| classNames | 部件类名（`root / left / center / title / subtitle / right / back`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| back | 点击返回按钮（不自动执行 history.back） | `MouseEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| left | 左侧返回按钮之后的内容 |
| title | 标题内容 |
| subtitle | 副标题内容 |
| right | 右侧操作区 |

## 注意事项

- 返回只派发事件，是否 `router.back()` 由业务决定。
- `fixed` 时导航脱离文档流，页面内容需自行补顶部占位；`safeArea` 只加内边距不改变高度。
- 左右区域等宽（`flex: 1`），中间标题自然居中并省略溢出。