# KSwipeCell 滑动单元格

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。左 / 右滑露出操作按钮，支持触摸与鼠标拖拽。

## 何时使用

- 消息、待办、列表项的置顶 / 删除；
- 需要左右两侧不同操作；
- 移动端手势操作替代长按菜单。

## 代码演示

<Demo path="swipe-cell/basic" title="左滑操作" :desc="['`rightActions` / `leftActions` 定义两侧按钮。', '拖动超过阈值后吸附打开，点击内容或 Esc 关闭。', '`action` 派发操作项与侧别。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| leftActions / rightActions | 两侧操作 | `KSwipeCellAction[]` | `[]` |
| disabled | 禁用滑动 | `boolean` | `false` |
| threshold | 打开阈值（px） | `number` | `30` |
| actionWidth | 单个操作宽度（px） | `number` | `72` |
| classNames / styles | 部件：`root / actions / content` | — | — |

### KSwipeCellAction

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| text | 文本 | `string` |
| color | 背景色 | `string` |
| disabled | 禁用 | `boolean` |

### KSwipeAction

独立按钮组件：`text / color / disabled / classNames / styles`，点击派发 `click`。

### v-model

`modelValue: 'left' | 'right' | null`

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 单元格内容 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| action | 点击操作 | `action, side` |
| click | 点击内容（未打开时） | `MouseEvent` |
| open | 吸附状态变化 | `side` |

### 暴露方法

`open(side)` / `close()`。