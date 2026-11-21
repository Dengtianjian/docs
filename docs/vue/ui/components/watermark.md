# KWatermark 水印

> 共同约定见 [共同约定](./index.md)。P8 增强件。基于 Canvas 平铺的文字/图片水印层。

## 何时使用

- 内部资料、报表、代码预览的防泄漏标识；
- 需要在内容上方平铺公司名、账号或时间；
- 希望水印不拦截点击与选择。

## 代码演示

<Demo path="watermark/basic" title="基础文字水印" :desc="['`gap` 接受数字或 `[横向, 纵向]`。', '水印层 `pointer-events: none`，内部按钮仍可点击。', '`color` 支持任意 CSS 颜色。']" />

<Demo path="watermark/custom" title="密度、角度与透明度" :desc="['`rotate` 控制倾斜角度，`fontSize` 控制字号。', '`opacity` 作用于整层。', '`image` 可传入图片地址，失败时自动回退文字。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 水印文字 | `string` | `'K UI'` |
| image | 图片地址，优先于文字 | `string` | — |
| gap | 平铺间距 | `number \| [number, number]` | `[120, 120]` |
| rotate | 旋转角度 | `number` | `-22` |
| fontSize | 字号 | `number` | `14` |
| fontFamily | 字体 | `string` | 系统字体栈 |
| fontWeight | 字重 | `number \| string` | `500` |
| color | 颜色 | `string` | `rgba(0, 0, 0, 0.12)` |
| opacity | 整层透明度 | `number` | `1` |
| imageWidth | 图片宽度 | `number` | `48` |
| zIndex | 水印层层级 | `number` | `9` |
| classNames / styles | 部件：`root / layer` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 被水印覆盖的内容 |

### 注意

容器需要有可测量的宽高；水印层绝对定位铺满最近定位祖先（组件根节点已设为 `relative`）。