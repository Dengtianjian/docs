# KSteps 步骤条

> 共同约定见 [共同约定](./index.md)。P4 导航批。任务流程进度：`KSteps` + `KStep` 组合，自动推导 wait / process / finish / error。

## 何时使用

- 多步骤任务的进度展示与引导；
- 需要让用户回看或切换已完成步骤。

## 代码演示

<Demo path="steps/basic" title="基础 / 受控" :desc="['`current` 为 0 基索引；小于 current 为 finish，等于为 process（可被 status 覆盖），大于为 wait。', '`v-model:current` 受控切换。']" />

<Demo path="steps/states" title="错误 / 点状 / 尺寸" :desc="['`status=&quot;error&quot;` 让当前步骤显示错误态，后续步骤保持 wait。', '`variant=&quot;dot&quot;` 使用点状节点。', '`size` 三档：sm / md / lg。']" />

<Demo path="steps/vertical" title="垂直 / 可点击" :desc="['`direction=&quot;vertical&quot;` 纵向排列。', '`clickable` 开启后步骤可点击或键盘操作（Enter / Space），切换时触发 `change`。', '单项 `disabled` 禁止点击。']" />

<Demo path="steps/custom" title="自定义图标与内容" :desc="['`#icon` 插槽自定义节点。', '`#title` / `#description` 插槽覆盖文字内容。']" />

## API

### KSteps Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:current | 当前步骤索引（0 基） | `number` | `0` |
| status | 当前步骤状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 节点形态 | `'default' \| 'dot'` | `'default'` |
| clickable | 全部步骤可点击切换；单项用 `disabled` 排除 | `boolean` | `false` |
| classNames | 部件类名（`root`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KStep Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题；也可用默认插槽 | `string` | — |
| description | 描述；也可用 `#description` 插槽 | `string` | — |
| icon | 图标组件；`#icon` 插槽优先 | `Component` | — |
| status | 单项状态覆盖 | `'wait' \| 'process' \| 'finish' \| 'error'` | — |
| disabled | 禁用：不可点击 | `boolean` | `false` |
| classNames | 部件类名（`root / icon / content / title / description / connector`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 点击切换步骤（当前步骤不触发） | `index: number` |
| update:current | 受控模型更新 | `number` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | `KSteps`：`KStep` 列表；`KStep`：标题内容（等价 `#title`） |
| title | `KStep`：标题内容 |
| icon | `KStep`：自定义节点内容 |
| description | `KStep`：描述内容 |

## 注意事项

- `KStep` 必须是 `KSteps` 的直接子节点（支持 `v-for` / `<template>` 片段）；其它节点会被忽略。
- 状态优先级：`KStep.status` > `KSteps.status`（仅当前步骤）> 由 `current` 推导。
- `clickable` 在 `KSteps` 上开启，作用于全部步骤；`disabled` 的步骤不响应点击，也不进入焦点。
- 节点带 `aria-current="step"`（当前步骤）；可点击时根节点为 `role="button"`，支持 Enter / Space。
- `dot` 变体仍保留连接线与状态色，节点中心点带当前色光环。