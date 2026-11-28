# KScrollArea 滚动区域

> 共同约定见 [共同约定](./index.md)。P8 增强件。细滚动条、顶部阴影与横向滚动容器。

## 何时使用

- 长日志、消息流、代码块等需要限制高度的区域；
- 需要统一滚动条视觉（含暗色）；
- 横向标签、表格附属内容需要横向滚动。

## 代码演示

<Demo path="scroll-area/basic" title="纵向滚动" :desc="['`height` 固定高度，`maxHeight` 控制最大高度。', '滚动后顶部出现渐隐阴影。', '视口可聚焦，键盘可直接滚动。']" />

<Demo path="scroll-area/horizontal" title="横向滚动" :desc="['`horizontal` 切换为横向滚动。', '`type` 支持 `auto / always / hidden`。', '内容宽度会自动撑开，不会换行。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 视口高度 | `string \| number` | — |
| maxHeight | 最大高度 | `string \| number` | — |
| horizontal | 横向滚动 | `boolean` | `false` |
| shadow | 滚动阴影 | `boolean` | `true` |
| type | 滚动条策略 | `'auto' \| 'always' \| 'hidden'` | `'auto'` |
| tabindex | 视口 tabindex | `number` | `0` |
| ariaLabel | 视口无障碍名称 | `string` | `'可滚动区域'` |
| classNames / styles | 部件：`root / viewport / content` | — | — |

### 暴露方法

| 方法 | 说明 |
| --- | --- |
| scrollTo(options) | 平滑滚动到指定位置 |
| viewport | 视口元素 ref |

### 部件

`root` 外壳与阴影定位；`viewport` 实际滚动元素；`content` 内容包裹层。