# KPullToRefresh 下拉刷新

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。触摸下拉 / 鼠标拖拽触发刷新，支持加载态与自定义指示器。

## 何时使用

- 移动端列表、消息流下拉刷新；
- 需要保留滚动位置、只在顶部触发；
- 需要自定义下拉文案或指示器。

## 代码演示

<Demo path="pull-to-refresh/basic" title="下拉刷新" :desc="['滚动到顶部后向下拖拽超过阈值触发 `refresh`。', '父组件设置 `loading` 后显示刷新中，结束后自动回弹。', '`#indicator` 可自定义指示器内容与进度。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 刷新中 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| threshold | 触发阈值（px） | `number` | `56` |
| maxPull | 最大下拉距离（px） | `number` | `120` |
| pullText / releaseText / loadingText | 文案 | `string` | 下拉刷新 / 松开刷新 / 刷新中… |
| classNames / styles | 部件：`root / indicator / content` | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| default | 可滚动内容 | — |
| indicator | 自定义指示器 | `{ distance, progress, loading }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 达到阈值并松手 | — |
| pull | 下拉过程 | `distance, progress` |

### 暴露方法

`reset()` 立即回弹；`pull` 为当前距离。

### 说明

组件根节点自身是滚动容器，需要在父级给定高度；触摸与鼠标拖拽都可用。