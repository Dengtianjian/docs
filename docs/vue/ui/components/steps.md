# KSteps 步骤条

> 共同约定见 [共同约定](./index.md)。P4 导航批。任务流程进度：`KSteps` + `KStep` 组合，自动推导 wait / process / finish / error。

## 何时使用

- 多步骤任务的进度展示与引导；
- 需要让用户回看或切换已完成步骤。

## 代码演示

<Demo path="steps/basic" title="基础 / 受控" :desc="['`current` 为 0 基索引；小于 current 为 finish，等于为 process（可被 status 覆盖），大于为 wait。', '`v-model:current` 受控切换。']" />

<Demo path="steps/states" title="错误 / 尺寸" :desc="['`status=&quot;error&quot;` 让当前步骤显示错误态，后续步骤保持 wait。', '`size` 三档：sm / md / lg。', '`pulse=false` 关闭当前步骤呼吸动画。']" />

<Demo path="steps/dot" title="点状步骤条" :desc="['`variant=&quot;dot&quot;` 使用小圆点节点，连接线与状态色保持一致。', '点状与默认样式统一由 `variant` 管理。']" />

<Demo path="steps/max" title="限量展示" :desc="['`max` 限制展示的步骤数，超出部分折叠为省略节点。', '始终保留首尾与当前步骤，并围绕当前步补足名额。']" />

<Demo path="steps/navigation" title="导航型" :desc="['`variant=&quot;navigation&quot;` 面包屑式文字步骤，当前项主题色下划线。', '项间空隙中央显示 30px 细箭头（描边 1.25，浅色）；三档尺寸，步骤可点击切换。']" />

<Demo path="steps/navigation-vertical" title="导航型（垂直）" :desc="['`direction=&quot;vertical&quot;` 时改为左侧 2px 当前指示条。', '文字左侧留出槽位，箭头下指居中放在项间空隙。']" />

<Demo path="steps/navigation-icon" title="导航型 / 图标与序号" :desc="['`show-icon` 打开序号或图标，默认序号为紧凑圆形。', '`#icon` 自定义图标为纯图标；未提供时显示步骤序号。']" />

<Demo path="steps/navigation-icon-vertical" title="导航型（垂直）/ 图标与序号" :desc="['垂直方向同样支持 `show-icon`，图标与文字间距 16px。', '自定义图标与默认序号混用，左侧指示条随当前项移动。']" />

<Demo path="steps/panel" title="面板型" :desc="['`variant=&quot;panel&quot;` 单一容器内的连体分段，当前项浅主色底 + 底部指示条。', '内部分段用 1px 分隔线连接；三档尺寸，步骤可点击切换。']" />

<Demo path="steps/panel-vertical" title="面板型（垂直）" :desc="['`direction=&quot;vertical&quot;` 时面板上下相连，共享横向分隔线。', '当前项浅主色底 + 左侧 2px 指示条。']" />

<Demo path="steps/panel-icon" title="面板型 / 图标与序号" :desc="['`show-icon` 在面板左侧展示序号或图标。', '自定义 `#icon` 为纯图标，未提供时显示步骤序号。']" />

<Demo path="steps/panel-icon-vertical" title="面板型（垂直）/ 图标与序号" :desc="['垂直连体面板同样支持 `show-icon`，图标位于文字左侧。', '当前项浅主色底 + 左侧指示条，图标随状态色。']" />

<Demo path="steps/vertical" title="垂直 / 可点击" :desc="['`direction=&quot;vertical&quot;` 纵向排列。', '`clickable` 开启后步骤可点击或键盘操作（Enter / Space），切换时触发 `change`。', '单项 `disabled` 禁止点击。']" />

<Demo path="steps/custom" title="自定义图标与内容" :desc="['`#icon` 插槽自定义节点；自绘图标不再套圆形底色与描边，默认撑满节点尺寸。', '`#title` / `#description` 插槽覆盖文字内容。']" />

## API

### KSteps Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:current | 当前步骤索引（0 基） | `number` | `0` |
| status | 当前步骤状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 步骤条形态：默认图标 / 点状 / 导航型 / 面板型 | `'default' \| 'dot' \| 'navigation' \| 'panel'` | `'default'` |
| clickable | 全部步骤可点击切换；单项用 `disabled` 排除 | `boolean` | `false` |
| pulse | 当前步骤呼吸动画 | `boolean` | `true` |
| max | 最多展示的步骤数（含首尾与当前步），超出折叠为省略节点；生效最小 3 | `number` | — |
| showIcon | 导航型 / 面板型是否展示序号或图标 | `boolean` | `false` |
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
| classNames | 部件类名（`root / icon / content / title / description / connector / arrow`） | `Partial<Record<Part, string>>` | — |
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
- 水平方向：图标、标题、描述按列水平居中，连接线连到下一列图标边缘；垂直方向保持图标在左、文字在右。
- 默认图标（序号 / 勾 / 叉）固定为节点尺寸并带圆形底与描边；使用 `icon` prop 或 `#icon` 插槽时只渲染纯图标，不再套圆底与边框，且默认按节点尺寸渲染（默认 34px，导航/面板 `show-icon` 为 24px）。
- 当前步骤默认带呼吸动画（`pulse`），默认图标为状态色光环扩散，自定义图标为透明度呼吸；`prefers-reduced-motion` 下自动关闭。
- `max` 触发折叠时，省略节点不参与状态与点击；始终保留首尾与当前步骤，名额优先补给当前步骤两侧。
- `dot` 变体仍保留连接线与状态色，节点中心点带当前色光环。
- `navigation` 隐藏图标与连接线，改为文字步骤 + 当前项下划线；`panel` 隐藏图标，整条为一个圆角容器，内部分段以 1px 分隔线连接；当前项浅主色底 + 底部 2px 指示条，不使用箭头。导航型项间显示 chevron-compact-right 箭头（固定 30px、1.25 描边、浅色）。两种形态均支持 sm / md / lg 三档，也支持 `direction="vertical"`：导航型为左侧指示条 + 空隙下箭头，面板型为上下分段 + 左侧指示条。两种变体默认隐藏节点图标，传 `show-icon` 后展示序号；`#icon` 自定义图标按纯图标渲染。