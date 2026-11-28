# KImage 图片

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。加载占位、失败兜底、懒加载与预览。

## 何时使用

- 内容图片、头像、封面与画廊缩略图；
- 需要失败兜底与加载态；
- 点击图片打开全屏预览（复用 KPreview）。

## 代码演示

<Demo path="image/basic" title="基础与兜底" :desc="['`width / height` 支持数字或 CSS 长度。', '`shape` 支持 square / rounded / circle。', '加载失败显示 `fallback` 或 `#error`。']" />

<Demo path="image/preview" title="预览组" :desc="['`preview` 开启点击预览。', '`previewItems` 传入多图，`previewCurrent` 指定起始索引。', '预览层由 KPreview 提供缩放、旋转与切换。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | — |
| alt | 替代文本 | `string` | — |
| fallback | 失败文案 | `string` | `'图片加载失败'` |
| placeholder | 加载文案 | `string` | — |
| lazy | 原生懒加载 | `boolean` | `false` |
| preview | 点击预览 | `boolean` | `false` |
| previewItems | 预览组 | `KImagePreviewItem[]` | — |
| previewCurrent | 预览起始索引 | `number` | `0` |
| shape | 形状 | `'square' \| 'rounded' \| 'circle'` | `'rounded'` |
| fit | 填充方式 | `CSSProperties['objectFit']` | `'cover'` |
| width / height | 尺寸 | `string \| number` | — |
| disabled | 禁用预览 | `boolean` | `false` |
| classNames / styles | 部件：`root / cover / image / placeholder / error` | — | — |

### KImagePreviewItem

`src` 必填；`name`、`type`、`thumbnail`、`poster` 等透传给 KPreview，支持任意扩展字段。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| placeholder | 加载态内容 |
| error | 失败态内容 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| load | 图片加载完成 | `Event` |
| error | 加载失败 | `Event` |
| click | 点击图片 | `MouseEvent \| KeyboardEvent` |
| previewChange | 预览切换 | `index, item` |
| previewClose | 预览关闭 | — |