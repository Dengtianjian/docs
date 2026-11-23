# KCascader 级联选择

> 共同约定见 [共同约定](./index.md)。表单补充批。多级联动选择，支持搜索、悬浮展开、任意层级选择与多选。

## 何时使用

- 省/市/区、类目、组织层级等树形路径选择；
- 需要在一屏内逐级浏览并回显完整路径。

## 代码演示

<Demo path="cascader/basic" title="基础 / 任意层级" :desc="['`options` 为递归树，`v-model` 为值路径数组。', '`change-on-select` 允许选中非叶子节点。', '`expand-trigger=&quot;hover&quot;` 悬停展开。']" />

<Demo path="cascader/multiple" title="多选与搜索" :desc="['`multiple` 时 model 为路径数组的数组。', '搜索模式按叶子节点匹配并展示完整路径。', '已选项以标签回显，可逐个移除。']" />

<Demo path="cascader/variants" title="外观变体" :desc="['`variant` 四档：outlined 带框 / filled 灰底无框 / borderless 全透明 / underlined 仅底部边框（hover / 聚焦只变底线颜色，不出聚焦圈）。']" />

## API

### KCascader Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单条路径或多条路径 | `KTreePath \| KTreePath[] \| null` | `null` |
| options | 递归选项树 | `KTreeOption[]` | `[]` |
| multiple | 多选 | `boolean` | `false` |
| changeOnSelect | 任意层级可选 | `boolean` | `false` |
| expandTrigger | 展开方式 | `'click' \| 'hover'` | `'click'` |
| searchable | 面板内搜索 | `boolean` | `true` |
| searchPlaceholder | 搜索占位 | `string` | `'搜索选项'` |
| placeholder | 触发器占位 | `string` | `'请选择'` |
| allowClear | 允许清除 | `boolean` | `true` |
| separator | 路径分隔符 | `string` | `' / '` |
| displayRender | 自定义回显 | `(labels, options) => string` | — |
| filter | 自定义搜索 | `(query, row) => boolean` | — |
| disabled / size / status | 禁用 / 尺寸 / 校验态 | — | — |
| variant | 外观 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 跟随 KForm（缺省 `'outlined'`） |
| render | 自定义渲染闭包 | `KRenderFn<KCascaderRenderScope>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择变化 | `value: KCascaderValue` |
| search | 搜索词变化 | `query: string` |
| openChange | 面板开合 | `open: boolean` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix / suffix | 触发器前后缀 |
| display | 自定义单值回显，scope `{ path, labels, options }` |
| render | headless 整件替换 |

## 注意事项

- 搜索默认只返回叶子节点；开启 `changeOnSelect` 后可选择任意层级。
- 多选只对可选项（叶子或 `changeOnSelect` 节点）生效，父节点点击用于展开。
- 当前版本不包含懒加载与虚拟滚动，超大层级树建议先裁剪数据。