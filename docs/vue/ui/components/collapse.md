# KCollapse 折叠面板

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。可折叠内容区，支持多开、手风琴与无边框。

## 何时使用

- 将长表单、设置项或说明内容按主题收起；
- 同一区域只允许展开一项时使用 `accordion`。

## 代码演示

<Demo path="collapse/basic" title="基础用法" :desc="['v-model:active-key 受控展开项，不传走内部状态。', '非手风琴模式可同时展开多项。', '展开 / 收起使用高度与透明度动画，收起后内容不可聚焦。', '标题、额外内容与内容区都可以用插槽。']" />

<Demo path="collapse/accordion" title="手风琴 / 无边框" :desc="['accordion 同一时间只展开一项。', 'ghost 去掉外框与底色，只保留分隔线。', 'disabled 禁用单项；extra 放计数或操作。']" />

## API

### KCollapse Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 受控展开项 | `string \| number \| (string \| number)[]` | — |
| defaultActiveKey | 非受控初始展开项 | 同上 | — |
| accordion | 手风琴模式 | `boolean` | `false` |
| bordered | 外框 | `boolean` | `true` |
| ghost | 无边框/透明底 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| expandIconPosition | 箭头位置 | `'start' \| 'end'` | `'start'` |
| destroyOnHide | 收起后销毁内容 | `boolean` | `false` |
| classNames / styles | 部件：`root` | — | — |

### KCollapse Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:activeKey | 展开项变化 | `string \| number \| (string \| number)[] \| null` |
| change | 同上 | 同上 |

### KCollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemKey | 唯一标识，必填 | `string \| number` | — |
| title | 标题 | `string` | — |
| extra | 标题右侧内容 | `VNodeChild` | — |
| disabled | 禁用 | `boolean` | `false` |
| showArrow | 显示箭头 | `boolean` | `true` |
| classNames / styles | 部件：`root / header / title / extra / icon / content` | — | — |

### Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| KCollapse | default | 放置 `KCollapseItem` |
| KCollapseItem | default | 面板内容 |
| KCollapseItem | title / extra / icon | 覆盖标题、右侧区、箭头 |

<CommonProps />

## 注意事项

- `KCollapseItem` 必须放在 `KCollapse` 内，`itemKey` 必填且唯一。
- 手风琴模式会把 `activeKey` 归一为最多一项；从多选切换到 `accordion` 时只保留第一项。
- 箭头使用原生按钮，展开态带 `aria-expanded` 与 `aria-controls`；内容区为 `role="region"`。