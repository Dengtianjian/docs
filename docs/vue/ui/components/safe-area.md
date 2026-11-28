# KSafeArea 安全区

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。读取 `env(safe-area-inset-*)` 的刘海屏 / 全面屏留白。

## 何时使用

- 顶部状态栏与底部 Home Indicator 安全留白；
- 导航栏、标签栏、提交栏配合使用；
- 需要背景色与安全区一起铺满。

## 代码演示

<Demo path="safe-area/basic" title="顶部与底部安全区" :desc="['`position` 支持 top / bottom / both。', '`background` 设置安全区背景，内容通过默认插槽渲染。', '真机读取 env()，桌面端为 0。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 方向 | `'top' \| 'bottom' \| 'both'` | `'bottom'` |
| background | 背景色 | `string` | `'transparent'` |
| classNames / styles | 部件：`root` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 安全区内的额外内容（通常不需要） |

### 说明

组件宽度 100%，高度由安全区 padding 与插槽内容决定；`aria-hidden` 表示纯布局元素。