# KSideBar 侧边导航

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。左侧垂直分类导航，支持角标、禁用与键盘切换。

## 何时使用

- 商品分类、消息分类、设置分区；
- 需要左侧固定宽度、右侧内容联动；
- 需要数字角标或小红点。

## 代码演示

<Demo path="side-bar/basic" title="分类联动" :desc="['`items` 定义分类，`v-model` 绑定当前 key。', '`badge` 支持数字、`true` 显示红点。', '↑ / ↓ / Home / End 在分类间移动。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 分类项 | `KSideBarItem[]` | `[]` |
| sticky | 吸顶 | `boolean` | `false` |
| height | 高度 | `number \| string` | — |
| ariaLabel | 无障碍名称 | `string` | `'侧边导航'` |
| classNames / styles | 部件：`root / item / title / badge` | — | — |

### KSideBarItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| title | 文本 | `string` |
| badge | 数字或红点 | `string \| number \| boolean` |
| disabled | 禁用 | `boolean` |

### v-model

`modelValue: string | number`

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| item | 自定义分类内容 | `{ item, index, active }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换分类 | `key, item` |