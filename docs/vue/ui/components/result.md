# KResult 结果页

> 共同约定见 [共同约定](./index.md)。反馈补充批。用预设状态图标承载操作结果，并提供标题、副标题、操作区与内容插槽。

## 何时使用

- 表单提交、支付、审批等流程结束后的结果页；
- 403 / 404 / 500 等错误页。

## 代码演示

<Demo path="result/status" title="预设状态" :desc="['`status` 支持 success / warning / error / info。', '标题与副标题可直接传 prop，也可用同名插槽覆盖。']" />

<Demo path="result/extra" title="错误码与操作区" :desc="['403 / 404 / 500 渲染大号错误码。', '`#extra` 放返回、重试等操作。', '默认插槽展示补充内容。']" />

<Demo path="result/slots" title="插槽覆盖" :desc="['icon / title / subTitle / extra 四个具名插槽分别覆盖内建图标与对应 prop。', '同名插槽优先：左侧卡片同时传了 title / subTitle prop，渲染时被插槽替换。', 'default 作为补充内容追加在操作区下方，可放列表、步骤等任意结构。']" />

## API

### KResult Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 结果状态 | `'success' \| 'error' \| 'info' \| 'warning' \| '403' \| '404' \| '500'` | `'info'` |
| title | 标题 | `string \| VNode` | — |
| subTitle | 副标题 | `string \| VNode` | — |
| extra | 操作区内容 | `string \| VNode` | — |
| render | 自定义渲染闭包 | `KRenderFn<KResultRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

部件：`root / icon / title / subtitle / extra / content`。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义图标（覆盖内建 SVG / 错误码） |
| title / subTitle / extra | 覆盖对应 prop（同名插槽优先） |
| default | 结果页补充内容，追加在操作区下方 |
| render | headless 整件替换（插槽优先于 `render` prop） |

### 事件

无事件。