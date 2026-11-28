# KSignature 签名板

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。Canvas 手写签名，支持触摸 / 鼠标、清空与导出 PNG。

## 何时使用

- 签收、合同、审批手写签名；
- 需要导出 data URL 上传；
- 需要高 DPI 清晰绘制与响应式尺寸。

## 代码演示

<Demo path="signature/basic" title="基础签名" :desc="['在画板上拖动鼠标或手指绘制。', '`#footer` 作用域提供 `clear / save / isEmpty`。', '`save` 返回 PNG data URL，并派发 `end`。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 画板高度（px） | `number` | `180` |
| penColor | 画笔颜色 | `string` | `'#111827'` |
| lineWidth | 线宽 | `number` | `2.5` |
| backgroundColor | 背景色 | `string` | `'transparent'` |
| disabled | 禁用 | `boolean` | `false` |
| placeholder | 空态提示 | `string` | `'请在此签名'` |
| ariaLabel | 无障碍名称 | `string` | `'签名画板'` |
| classNames / styles | 部件：`root / canvas / placeholder / toolbar` | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| footer | 底部工具区 | `{ clear, save, isEmpty }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始一笔 | — |
| change | 一笔完成 | `dataUrl` |
| end | 保存 / 抬笔 | `dataUrl` |
| clear | 清空 | — |

### 暴露方法

`clear()` / `toDataURL(type?, quality?)` / `save()` / `resize()` / `isEmpty`。

### 说明

画板按设备像素比缩放，窗口尺寸变化时保留已有笔迹。