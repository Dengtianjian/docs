# KMarquee 跑马灯

> 共同约定见 [共同约定](./index.md)。P8 增强件。水平循环滚动的内容条，悬停暂停并遵循 reduced-motion。

## 何时使用

- 公告、实时动态、榜单等需要持续滚动的短内容；
- 空间有限但需要展示长文案；
- 需要渐变遮罩与悬停暂停的展示条。

## 代码演示

<Demo path="marquee/basic" title="基础滚动" :desc="['`text` 直接给文本，或使用默认插槽。', '`duration` 控制单圈秒数，越大约慢。', '`direction` 支持 `left / right`，`gradient` 控制两端遮罩。']" />

<Demo path="marquee/custom" title="自定义内容" :desc="['默认插槽可放任意行内内容。', '内容会被复制一份用于无缝循环，第二份带 `aria-hidden`。', '`pauseOnHover` 默认开启，键盘聚焦也会暂停。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 纯文本内容 | `string` | — |
| duration | 单圈时长（秒） | `number` | `12` |
| direction | 滚动方向 | `'left' \| 'right'` | `'left'` |
| gap | 内容组之间的间距 | `number` | `48` |
| pauseOnHover | 悬停 / 聚焦暂停 | `boolean` | `true` |
| gradient | 两端渐变遮罩 | `boolean` | `true` |
| ariaLabel | 无障碍名称 | `string` | `'滚动公告'` |
| classNames / styles | 部件：`root / track / group` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 滚动内容；会渲染两次用于无缝循环 |

### 无障碍

- 第二份内容带 `aria-hidden="true"`，读屏只读一次；
- `prefers-reduced-motion: reduce` 时停止动画并隐藏副本；
- 悬停或内部聚焦时暂停。