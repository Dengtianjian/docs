# KBackTop 回到顶部

> 共同约定见 [共同约定](./index.md)。P4 导航批。滚动超过阈值后出现，点击平滑回到顶部。

## 何时使用

- 长页面、长列表滚动后提供快速回到顶部入口；
- 需要绑定自定义滚动容器而非 window。

## 代码演示

<Demo path="back-top/basic" title="滚动阈值 / 自定义容器 / 位置" :desc="['`target` 绑定滚动容器；缺省 window。', '`visibility-height` 控制出现阈值。', '演示用 `styles.root` 把默认 fixed 改为 absolute，实际应用通常保持默认。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 滚动容器；缺省 window | `KScrollTarget` | — |
| visibilityHeight | 滚动超过该距离后显示 | `number` | `200` |
| right | 距视口右侧 | `number` | `24` |
| bottom | 距视口底部 | `number` | `24` |
| classNames | 部件类名（`root / icon`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / icon`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击按钮（已触发滚动） | `MouseEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 图标内容，缺省为向上箭头 |

## 注意事项

- 默认 `position: fixed` 贴视口右下角；嵌入局部区域时可通过 `styles.root` 覆盖为 absolute（演示同款）。
- 点击使用平滑滚动；系统开启“减少动态效果”时自动改为立即滚动。
- `right/bottom` 单位为 px；`target` 变化不会自动重绑监听，请在重建容器时同步更新组件。
- 按钮出现/隐藏带淡入上移动画，减少动态效果时关闭。