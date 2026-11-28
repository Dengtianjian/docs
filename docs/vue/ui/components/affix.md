# KAffix 吸顶

> 共同约定见 [共同约定](./index.md)。P4 导航批。基于 `position: sticky` 的吸顶容器，无布局跳变。

## 何时使用

- 侧栏目录、工具栏在滚动容器内保持可见；
- 页面滚动时固定工具条、筛选条等（相对视口吸顶）；
- 需要感知吸顶状态（`change`）做样式联动。

## 代码演示

<Demo path="affix/basic" title="容器内吸顶 / 状态回调" :desc="['`offset-top` 控制吸顶距离，sticky 相对最近的滚动祖先生效。', '`change` 回调返回当前是否吸顶。', '演示在滚动容器内滚动左侧卡片，观察吸顶状态。']" />

<Demo path="affix/page" title="页面级吸顶" :desc="['不设置滚动容器，直接滚动整个文档页面：sticky 相对视口生效，`offset-top` 预留了顶部导航高度。', '吸顶行程受根节点高度限制：示例用网格叠放让根节点撑满正文区域，实际项目也可让根节点包裹长正文。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetTop | 距滚动容器顶部吸顶距离，无滚动容器时相对视口 | `number` | `0` |
| offsetBottom | 距滚动容器底部吸底距离，无滚动容器时相对视口；设置后优先于 offsetTop | `number` | — |
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
- sticky 的可移动范围受根节点高度限制：页面级吸顶要让根节点覆盖足够长的内容（如包裹正文或与正文叠放），否则只能吸住很短一段。
- `offsetBottom` 与 `offsetTop` 同时传入时按底端模式运行。
- 状态通过 scroll 捕获与 ResizeObserver 更新；内容尺寸变化会重新判定。