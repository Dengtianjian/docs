# KCarousel 轮播

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。滑动 / 淡入淡出、自动播放、拖拽与键盘切换。

## 何时使用

- 首屏 Banner、活动推荐与图片画廊；
- 需要在有限空间内循环展示多张内容；
- 需要触屏滑动与键盘操作。

## 代码演示

<Demo path="carousel/basic" title="基础轮播" :desc="['`items` 提供内容，`#content` 自定义单页。', '`autoplay` + `interval` 控制自动播放。', '悬停或聚焦时暂停。']" />

<Demo path="carousel/fade" title="淡入淡出与垂直" :desc="['`effect=&quot;fade&quot;` 切换为叠层淡入。', '`vertical` 垂直滑动，方向键同步为上下。', '`indicator=&quot;line&quot;` 切换指示器形态。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 轮播项 | `KCarouselItem[]` | `[]` |
| effect | 切换效果 | `'slide' \| 'fade'` | `'slide'` |
| vertical | 垂直方向 | `boolean` | `false` |
| loop | 循环 | `boolean` | `true` |
| autoplay | 自动播放 | `boolean` | `false` |
| interval | 间隔（ms） | `number` | `3000` |
| pauseOnHover | 悬停/聚焦暂停 | `boolean` | `true` |
| showArrows | 显示箭头 | `boolean` | `true` |
| showIndicators | 显示指示器 | `boolean` | `true` |
| height | 高度 | `number \| string` | `240` |
| indicator | 指示器形态 | `'line' \| 'dot'` | `'dot'` |
| ariaLabel | 无障碍名称 | `string` | `'轮播'` |
| classNames / styles | 部件：`root / viewport / track / slide / arrow / indicators / indicator` | — | — |

### KCarouselItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| src | 图片地址 | `string` |
| alt | 图片替代文本 | `string` |
| content | 文本内容 | `string` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 当前索引 | `number` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| item | 完全接管单个轮播页 | `{ item, index }` |
| content | 文本页内容 | `{ item, index }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换 | `index, item` |

### 暴露方法

`next()` / `prev()` / `goTo(index)`。

### 无障碍

根节点可聚焦，`← / →`（垂直为 `↑ / ↓`）切换，`Home / End` 首尾；非当前页 `aria-hidden` 且不可交互。