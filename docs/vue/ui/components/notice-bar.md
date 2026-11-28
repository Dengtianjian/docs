# KNoticeBar 通知栏

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。移动端公告条，支持滚动、关闭、链接与换行模式。

## 何时使用

- 首页公告、维护通知、活动提醒；
- 需要滚动展示长文案；
- 需要可关闭或可跳转的通知。

## 代码演示

<Demo path="notice-bar/basic" title="通知类型与模式" :desc="['`type` 控制语义色，`mode` 支持 none / close / link。', '默认使用 KMarquee 横向滚动，`wrapable` 改为换行。', '`v-model:open` 可重新显示已关闭通知。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文案 | `string` | — |
| type | 语义 | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| mode | 尾部模式 | `'none' \| 'close' \| 'link'` | `'none'` |
| showIcon | 显示图标 | `boolean` | `true` |
| wrapable | 换行而非滚动 | `boolean` | `false` |
| duration | 滚动时长（秒） | `number` | `14` |
| ariaLabel | 无障碍名称 | `string` | `'通知'` |
| classNames / styles | 部件：`root / icon / content / close / link` | — | — |

### v-model

`open: boolean`（默认 true）

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 文案内容 |
| icon | 自定义图标 |
| right | 替换关闭 / 箭头 |

### Events

| 事件 | 说明 |
| --- | --- |
| click | 链接模式点击 |
| close | 关闭 |