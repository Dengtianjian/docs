# KImage 图片

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。带加载态、失败回退与点击预览的图片容器。

## 何时使用

- 列表、卡片、详情页中的图片展示；
- 需要占位、失败兜底或点击查看大图的场景。

## 代码演示

<Demo path="image/basic" title="基础与形状" :desc="['`width` / `height` / `ratio` 控制尺寸与比例。', '`shape` 支持 square / rounded / circle，`radius` 可细调圆角。', '`fit` 对应 object-fit。']" />

<Demo path="image/preview" title="点击预览" :desc="['`preview` 开启点击/键盘预览，内部复用 KPreview。', '`previewSrc` 可指定大图地址，`previewText` 自定义遮罩文案。', '`preview-open` / `preview-close` 事件可用于埋点。']" />

<Demo path="image/states" title="失败、懒加载与禁用" :desc="['加载失败展示 `#error` / `fallback` 兜底。', '`lazy` 使用原生懒加载，`placeholder` 自定义加载文案。', '`preview + disabled` 保留样式但不可打开。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | — |
| alt | 替代文本 | `string` | `''` |
| width / height | 宽高 | `string \| number` | — |
| ratio | 宽高比 | `number` | — |
| fit | object-fit | `CSSProperties['objectFit']` | `'cover'` |
| shape | 形状 | `'square' \| 'rounded' \| 'circle'` | `'square'` |
| radius | 圆角 | `string \| number` | — |
| preview | 开启点击预览 | `boolean` | `false` |
| previewSrc | 预览大图；缺省用 src | `string` | — |
| previewText | 遮罩文案 | `string` | `'预览'` |
| placeholder | 加载文案 | `string` | — |
| fallback | 失败文案 | `string` | — |
| lazy | 原生懒加载 | `boolean` | `false` |
| disabled | 禁用预览交互 | `boolean` | `false` |
| classNames / styles | 部件：`root / cover / image / placeholder / error / mask` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| placeholder | 加载占位 |
| error | 失败兜底 |
| mask | 预览遮罩 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| load | 图片加载成功 | `Event` |
| error | 图片加载失败 | `Event` |
| click | 点击容器 | `MouseEvent` |
| preview-open | 打开预览 | — |
| preview-close | 关闭预览 | — |

<CommonProps />

## 注意事项

- 开启 `preview` 后根节点为 `role="button"`、可 Tab 聚焦，Enter / 空格打开预览。
- 预览由内置 `KPreview` 承载，支持 Esc 关闭、缩放、旋转与拖拽。
- `src` 变化会重置加载与失败状态。
- 失败回退不会自动重试；需要重试请在业务侧更换 `src` 触发重新加载。
