# KBanner 公告条

> 共同约定见 [共同约定](./index.md)。P8 增强件。带图标、标题、描述与操作区的横向公告容器。

## 何时使用

- 产品更新、维护通知、构建结果等全宽提示；
- 需要比 Alert 更丰富的标题 + 描述 + 操作组合；
- 可关闭且可重新唤起的公告。

## 代码演示

<Demo path="banner/basic" title="四种语义" :desc="['`type` 支持 `info / success / warning / error`。', '错误语义使用 `role=&quot;alert&quot;`，其余为 `status`。', '`bordered` 控制描边，`showIcon` 控制图标。']" />

<Demo path="banner/actions" title="操作区与关闭" :desc="['`#actions` 放按钮组。', '`v-model:open` 控制显隐，`close` 在关闭时派发。', '关闭后可由外部按钮重新打开。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 语义类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| closable | 显示关闭按钮 | `boolean` | `false` |
| bordered | 显示描边 | `boolean` | `true` |
| showIcon | 显示语义图标 | `boolean` | `true` |
| closeLabel | 关闭按钮无障碍名称 | `string` | `'关闭公告'` |
| classNames / styles | 部件：`root / icon / content / title / description / actions / close` | — | — |

### v-model

| 名称 | 说明 | 默认值 |
| --- | --- | --- |
| open | 是否显示 | `true` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 替换图标 |
| title | 替换标题 |
| default | 替换描述正文 |
| actions | 操作区 |

### Events

| 事件 | 说明 |
| --- | --- |
| close | 点击关闭按钮 |
| update:open | 显隐变化 |