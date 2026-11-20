# KTreeSelect 树选择

> 共同约定见 [共同约定](./index.md)。表单补充批。树形结构中选择节点，支持搜索、多选级联与父子独立。

## 何时使用

- 部门、组织、分类等层级数据选择；
- 需要多选并自动维护父级勾选状态。

## 代码演示

<Demo path="treeselect/basic" title="单选与搜索" :desc="['`options` 为递归树，`v-model` 为节点值。', '`default-expand-all` 初始展开全部父节点。', '搜索过滤保留祖先路径，便于定位。']" />

<Demo path="treeselect/multiple" title="多选级联 / 父子独立" :desc="['`multiple` 使用复选框，父级与子级自动级联。', '`check-strictly` 关闭级联，父子可独立勾选。', '已选标签只展示叶子节点（严格模式下包含父节点）。']" />

## API

### KTreeSelect Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单值或值数组 | `string \| number \| (string \| number)[] \| null` | `null` |
| options | 递归选项树 | `KTreeOption[]` | `[]` |
| multiple | 多选 | `boolean` | `false` |
| checkStrictly | 关闭父子级联 | `boolean` | `false` |
| showSearch | 面板搜索 | `boolean` | `true` |
| searchPlaceholder | 搜索占位 | `string` | `'搜索节点'` |
| placeholder | 触发器占位 | `string` | `'请选择'` |
| allowClear | 允许清除 | `boolean` | `true` |
| defaultExpandAll | 初始展开全部父节点 | `boolean` | `false` |
| defaultExpandedKeys | 初始展开节点 | `(string \| number)[]` | `[]` |
| filterTreeNode | 自定义搜索 | `(query, node) => boolean` | label/value 包含 |
| disabled / size / status | 禁用 / 尺寸 / 校验态 | — | — |
| render | 自定义渲染闭包 | `KRenderFn<KTreeSelectRenderScope>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择变化 | `value: KTreeSelectValue` |
| search | 搜索词变化 | `query: string` |
| expand | 展开节点变化 | `keys: (string \| number)[]` |
| openChange | 面板开合 | `open: boolean` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix / suffix | 触发器前后缀 |
| display | 单选回显，scope `{ node, path }` |
| render | headless 整件替换 |

## 注意事项

- 多选级联会在 model 中包含被自动选中的父节点值；标签展示会折叠到叶子。
- 搜索时展示过滤后的完整路径，不改变原有展开状态。
- 当前版本不做节点懒加载；大树的搜索与渲染开销随节点数线性增长。