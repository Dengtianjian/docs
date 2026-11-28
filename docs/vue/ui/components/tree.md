# KTree 树形控件

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。层级数据展示，支持展开、单选/多选、级联勾选与异步加载。

## 何时使用

- 目录、组织架构、权限、分类等层级数据；
- 需要勾选子树或按父级汇总选中状态时。

## 代码演示

<Demo path="tree/basic" title="展开与选择" :desc="['data 使用 label / value / children。', 'default-expand-all 展开所有含子节点的行。', 'selectedKeys 支持单选数组或多选数组。', 'select 事件返回当前 keys、节点与是否选中。']" />

<Demo path="tree/checkable" title="级联勾选 / 严格模式" :desc="['checkable 显示复选框；父级自动全选/半选。', 'checkStrictly 只勾选当前节点，不联动子级。', 'checkedKeys 受控保存全部勾选值。']" />

<Demo path="tree/async" title="异步加载" :desc="['loadData 在首次展开时请求子节点。', '返回的 children 会缓存，收起再展开不重复请求。', 'isLeaf=true 的节点不显示箭头。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树数据 | `KTreeData` | — |
| checkable | 显示复选框 | `boolean` | `false` |
| selectable | 可选中 | `boolean` | `true` |
| multiple | 多选 | `boolean` | `false` |
| checkStrictly | 勾选不联动 | `boolean` | `false` |
| defaultExpandAll | 默认展开所有父节点 | `boolean` | `false` |
| expandOnClickNode | 点击节点展开 | `boolean` | `false` |
| indent | 每级缩进 | `number` | `20` |
| blockNode | 行占满宽度 | `boolean` | `true` |
| showLine | 显示层级线 | `boolean` | `false` |
| disabled | 整体禁用 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| loadData | 异步加载子节点 | `(node) => Promise<KTreeData \| void>` | — |
| classNames / styles | 部件：`root / node / caret / title / checkbox / empty` | — | — |

### Models

| 模型 | 说明 | 类型 |
| --- | --- | --- |
| expandedKeys | 展开节点 key 数组 | `(string \| number)[]` |
| selectedKeys | 选中值数组 | `(string \| number)[]` |
| checkedKeys | 勾选值数组 | `(string \| number)[]` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义节点标题，作用域 `{ node, row, selected, checked }` |
| empty | 自定义空态 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| expand | 展开/收起 | `(keys, node, expanded)` |
| select | 选中/取消 | `(keys, node, selected)` |
| check | 勾选/取消 | `(keys, node, checked)` |

<CommonProps />

## 注意事项

- `value` 必须唯一；展开 key 使用完整路径，避免同值节点冲突。
- 非严格模式下勾选父节点会连带整棵子树；父级状态按子级全选/半选自动汇总。
- 异步加载只在首次展开时触发；`loadData` 抛错会结束 loading，可再次点击重试。
- 键盘：上下移动、右展开/进入子级、左收起、Enter 选择、Space 勾选或选择。