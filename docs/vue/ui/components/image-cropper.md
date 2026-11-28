# KImageCropper 图片裁剪

> 共同约定见 [共同约定](./index.md)。独立裁剪面板：传入图片 File，拖动裁剪框/控制点选择区域，确定后回传裁剪后的 File。KUpload 的 `crop` 弹窗内部即复用本面板。

## 何时使用

- 需要在上传前裁图、换头像、裁封面等场景；
- 只需要裁剪 UI、自己管理文件选择与后续上传时。

## 代码演示

<Demo path="image-cropper/basic" title="内联裁剪面板" :desc="['面板直接嵌入文档流：`file` 传入待裁图片，拖动框与 8 个控制点裁剪。', '确定后 `confirm` 回传 File；取消则清空选择。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| file | 待裁剪图片 | `File \| null` | `null` |
| aspectRatio | 固定宽高比；不传 = 自由裁剪（可用比例预设/锁定） | `number` | — |
| type | 输出 MIME；缺省沿用原图（PNG 保透明，其余 JPEG） | `string` | — |
| quality | 输出质量 0~1 | `number` | `0.92` |
| classNames | 语义部件的类名覆盖：`root / alert / stage / box / handle / toolbar / ratios / footer` | `Partial<Record<KImageCropperPart, string>>` | — |
| styles | 语义部件的内联样式覆盖：`root / alert / stage / box / handle / toolbar / ratios / footer` | `Partial<Record<KImageCropperPart, CSSProperties>>` | — |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 确定裁剪，回传新 File | `File` |
| cancel | 取消/关闭（未确认） | — |

### Headless

本件**不提供 `render` 通道**：裁剪框坐标、指针手势和 canvas 输出与内部布局强绑定，整件替换没有稳定的绑定包可给；需要完全自绘请直接用 canvas + pointer 事件实现。`classNames` / `styles` 可覆盖各部件视觉。

### Slots

无；标题固定为「裁剪图片」。需要自定义整体交互请直接使用 canvas 自行实现。

## 注意事项

- 确定后输出自然像素尺寸的裁剪图；不放大原图。
- 自由模式提供 4 角 + 4 边中点；PC 按住 Shift 拖控制点临时锁比例；下方提供 自由 / 1:1 / 4:3 / 3:4 / 16:9 / 3:2 / 5:4 / 7:5 预设与「锁定比例」开关。
- 面板宽度跟随容器；移动端裁剪区自适应高度，控制点命中区扩大，比例预设横向滚动。需要弹窗时由业务用 KModal 包裹（KUpload 内即如此）。
- 键盘：裁剪框可聚焦，方向键移动（Shift 加速），Alt + 方向键调整大小；四角/四边控制点定位为指针操作，读屏下由裁剪框整体承载。
- 组件只负责裁剪；文件选择、上传、预览由业务自行处理（KUpload 内部已串好压缩/分片/上传流程）。
