# KCarousel 轮播

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。滑动 / 淡入轮播，支持自动播放、拖拽、键盘与无障碍朗读。

## 何时使用

- 首页 Banner、图片集、活动位；
- 需要在有限空间内轮换展示多张卡片或图文内容。

## 代码演示

<Demo path="carousel/basic" title="基础轮播" :desc="['默认 `slide` 位移切换，`arrows` 显示左右按钮。', '`autoplay` + `interval` 自动播放，悬停 / 聚焦自动暂停。', '指示器默认在容器内，`indicator=&quot;line&quot;` 使用进度条样式。']" />

<Demo path="carousel/fade" title="淡入与外部指示器" :desc="['`effect=&quot;fade&quot;` 交叉淡入，幻灯片绝对定位叠放。', '`indicator-placement=&quot;outside&quot;` 把指示器放到容器下方。', '自定义内容无需额外包裹，直接作为幻灯片子节点。']" />

<Demo path="carousel/vertical" title="纵向与受控切换" :desc="['`direction=&quot;vertical&quot;` 纵向切换，`loop=false` 到边界停止。', '`v-model:active-index` 双向绑定当前页。', '聚焦容器后可用方向键、Home / End 切换。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeIndex | 当前页（`v-model:active-index`） | `number` | `0` |
| autoplay | 自动播放 | `boolean` | `false` |
| interval | 自动播放间隔（ms） | `number` | `3000` |
| duration | 切换时长（ms） | `number` | `420` |
| loop | 循环切换 | `boolean` | `true` |
| effect | 切换效果 | `'slide' \| 'fade'` | `'slide'` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| indicator | 指示器样式 | `'dots' \| 'line' \| 'none'` | `'dots'` |
| indicatorPlacement | 指示器位置 | `'inside' \| 'outside'` | `'inside'` |
| arrows | 左右按钮 | `boolean` | `false` |
| draggable | 指针拖拽 | `boolean` | `true` |
| height | 容器高度 | `string \| number` | `280` |
| pauseOnHover | 悬停 / 聚焦暂停 | `boolean` | `true` |
| size | 尺寸档 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| ariaLabel | 无障碍名称 | `string` | `'轮播图'` |
| classNames / styles | 部件：`root / viewport / track / slide / arrow / indicators` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 幻灯片列表，每个直接子节点为一页（Fragment 会展开） |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:activeIndex | 当前页变化 | `number` |
| change | 当前页变化 | `number` |

<CommonProps />

## 注意事项

- 拖拽阈值取 `max(36px, 容器尺寸 × 15%)`；到边界且 `loop=false` 时增加阻尼而不是硬停。
- 容器可聚焦并带 `aria-roledescription="carousel"`，每页为 `role="group"`、`aria-roledescription="slide"`，标签为「n / 总数」。
- `prefers-reduced-motion` 下关闭过渡动画；自动播放仍按间隔切换，需要完全静止请关闭 `autoplay`。
- 幻灯片内容请保证可自适应容器高度；图片可用 `object-fit: cover`（组件内已对 `img` 默认处理）。
- `activeIndex` 越界时会按 `loop` 归一化或夹到边界。
