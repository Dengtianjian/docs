# KPopup 弹层 / KCenterPopup 居中弹层

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。底部 / 顶部 / 左右 / 居中五向弹层。

## 何时使用

- 移动端底部弹层、侧滑面板与居中确认；
- 需要遮罩、圆角、安全区与 Esc 关闭；
- 需要 Teleport 到 body 或 ConfigProvider 容器。

## 代码演示

<Demo path="popup/basic" title="底部与居中" :desc="['`placement` 支持 bottom / top / left / right / center。', '遮罩淡入，面板按方向滑入；居中弹层使用缩放 + 淡入。', '`closeable` 显示关闭按钮，`closeOnMask` 控制遮罩关闭。', '`KCenterPopup` 固定居中，适合确认与短提示。']" />

<Demo path="popup/nested" title="弹层套弹层" :desc="['多层 KPopup 各自维护 `v-model:open`，后打开的在最上层，遮罩逐层加深。', 'Esc / 点击遮罩只关闭最上层；全部关闭前 body 滚动锁保持，滚动条宽度已补偿，页面不抖动。']" />

## API

### KPopup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placement | 方向 | `'bottom' \| 'top' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| title | 标题 | `string` | — |
| round | 圆角 | `boolean` | `true` |
| closeable | 关闭按钮 | `boolean` | `false` |
| closeOnMask | 遮罩关闭 | `boolean` | `true` |
| safeArea | 底部安全区 | `boolean` | `true` |
| width / height | 尺寸；bottom / top 默认最大宽 `420px` | `number \| string` | width 上限 `420px` |
| zIndex | 层级 | `number` | 主题弹层层级 |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / close / header / title / body / footer` | — | — |

### v-model

`open: boolean`

### Slots

`default` / `header` / `footer`

### Events

`close` / `opened` / `update:open`

### KCenterPopup

接受 KPopup 全部属性与插槽，固定 `placement="center"`；通常用于确认与短提示。

## PC 端宽度

- bottom / top 默认 `width: min(100%, 420px)`：移动端仍占满，PC 端自动缩窄并居中。
- `width` prop 直接覆盖；也可用 `--k-popup-max-width` 修改默认上限。
- 视口 ≥ 768px 时 bottom / top 只收窄到 420px 并保持贴底 / 贴顶；left / right / center 维持各自宽度。

## 注意事项

- 多层叠加按打开顺序排层：Esc / 点击遮罩只关闭最上层，下层保持打开。
- body 滚动锁按引用计数：叠开多层只锁一次，全部关闭才恢复；锁定期间补偿滚动条宽度，页面不会抖动。
- 需要自定义层级时传 `zIndex`；弹层默认 Teleport 到 KApp 根或 ConfigProvider 容器。