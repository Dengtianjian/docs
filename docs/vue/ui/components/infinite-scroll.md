# KInfiniteScroll 无限滚动

> 共同约定见 [共同约定](index.md)。P9 移动端专项。滚动到底部自动加载，支持加载中、没有更多与空态文案。

## 何时使用

- 长列表分页加载；
- 需要在接近底部时提前触发请求；
- 需要加载中 / 没有更多状态。

## 代码演示

<Demo path="infinite-scroll/basic" title="滚动加载" :desc="['滚动到哨兵位置触发 `load`，`loading` 阻止重复请求。', '`finished` 后不再触发，显示“没有更多了”。', '容器需可滚动；`immediate-check` 控制首次是否立即检查。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 加载中 | `boolean` | `false` |
| finished | 已全部加载 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| distance | 提前触发距离（px） | `number` | `40` |
| immediateCheck | 首次立即检查 | `boolean` | `true` |
| loadingText / finishedText / idleText | 状态文案 | `string` | 加载中… / 没有更多了 / 上拉加载更多 |
| ariaLabel | 无障碍名称 | `string` | `'滚动加载列表'` |
| classNames / styles | 部件：`root / footer` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 列表内容 |
| loading / finished / idle | 自定义底部状态 |

### Events

| 事件 | 说明 |
| --- | --- |
| load | 需要加载下一页 |

### 暴露方法

`check()` 手动检查一次位置。