# KAffix 吸顶

> 共同约定见 [共同约定](./index.md)。P4 导航批。基于 `position: sticky` 的吸顶容器，无布局跳变。

## 何时使用

- 侧栏目录、工具栏在滚动容器内保持可见；
- 需要感知吸顶状态（`change`）做样式联动。

## 代码演示

<Demo path="affix/basic" title="容器内吸顶 / 状态回调" :desc="['`offset-top` 控制吸顶距离，sticky 相对最近的滚动祖先生效。', '`change` 回调返回当前是否吸顶。', '演示在滚动容器内滚动左侧卡片，观察吸顶状态。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetTop | 距滚动容器顶部吸顶距离 | `number` | `0` |
| offsetBottom | 距滚动容器底部吸底距离；设置后优先于 offsetTop | `number` | — |
| classNames | 部件类名（`root / content`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / content`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 吸顶状态变化 | `affixed: boolean` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 吸顶内容 |

### 部件

`root`（占位包装）/ `content`（sticky 内容）。

## 注意事项

- 采用 sticky 而非 fixed：占位容器保留原高度，吸顶时不会引起布局跳动，也无需同步宽度。
- sticky 相对**最近的滚动祖先**生效；祖先链上不能有不期望的 `overflow: hidden` 截断。
- `offsetBottom` 与 `offsetTop` 同时传入时按底端模式运行。
- 状态通过 scroll 捕获与 ResizeObserver 更新；内容尺寸变化会重新判定。