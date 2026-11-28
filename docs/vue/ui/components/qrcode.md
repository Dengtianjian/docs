# KQRCode 二维码

> 共同约定见 [共同约定](./index.md)。P8 增强件。零依赖 SVG 二维码，支持 L/M/Q/H 容错等级与 UTF-8。

## 何时使用

- 分享链接、支付码、设备配对等需要扫码的场景；
- 不能引入运行时依赖的前端包；
- 需要自定义颜色、留白与尺寸。

## 代码演示

<Demo path="qrcode/basic" title="基础二维码" :desc="['`value` 支持 URL 与中文，内部按 UTF-8 字节编码。', '`level` 默认 M；H 级抗遮挡更强但矩阵更大。', '`darkColor / lightColor / margin` 可调视觉，扫码对比度需自行保证。']" />

<Demo path="qrcode/levels" title="四种容错等级" :desc="['L / M / Q / H 对应约 7% / 15% / 25% / 30% 恢复能力。', '内容越长、等级越高，版本越大。', '当前实现支持版本 1–10，超限展示错误插槽。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 编码内容 | `string` | — |
| level | 容错等级 | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` |
| size | 渲染边长（px） | `number` | `160` |
| margin | 静区模块数 | `number` | `4` |
| darkColor | 深色模块颜色 | `string` | `'#111111'` |
| lightColor | 背景颜色 | `string` | `'#ffffff'` |
| ariaLabel | 无障碍名称 | `string` | `二维码：${value}` |
| errorText | 超长错误文案 | `string` | `'内容过长，无法生成二维码'` |
| classNames / styles | 部件：`root / svg / background / modules / error` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| error | 编码失败时的替代内容 |

### 实现边界

- byte 模式、版本 1–10、固定 mask 0；已用 macOS Vision 对多组内容实测解码；
- 单段内容容量随等级变化（版本 10：L 约 271 字节、H 约 119 字节）；
- 背景与前景需保持足够对比度，暗色页面请显式设置 `lightColor`。