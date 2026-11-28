# KSplitter 分隔面板

> 共同约定见 [共同约定](./index.md)。P8 增强件。可拖拽、可键盘调整的多面板布局。

## 何时使用

- 侧栏 + 内容、代码 + 预览等可调整比例的区域；
- 需要最小/最大比例约束；
- 需要键盘可操作的分隔条。

## 代码演示

<Demo path="splitter/basic" title="水平分隔" :desc="['`panels` 定义每个面板的 `min / max / key`。', '`v-model` 绑定百分比数组，拖动与键盘都会同步。', '分隔条可聚焦，← / → 调整 2%，Shift 加速到 10%。']" />

<Demo path="splitter/vertical" title="垂直三分栏" :desc="['`direction=&quot;vertical&quot;` 上下排列。', '`gutterSize` 控制命中区域。', '`aria-orientation`、`aria-valuenow` 随比例更新。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| panels | 面板配置 | `KSplitterPanel[]` | `[]` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| gutterSize | 分隔条命中宽度 | `number` | `8` |
| step | 键盘步进（%） | `number` | `2` |
| disabled | 禁用调整 | `boolean` | `false` |
| classNames / styles | 部件：`root / panel / gutter` | — | — |

### KSplitterPanel

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| min | 最小占比（%） | `number` |
| max | 最大占比（%） | `number` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 各面板占比，自动归一化到 100 | `number[]` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| panel | 面板内容 | `{ panel, index }` |
| gutter | 分隔条附加内容 | `{ index }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| resizeStart | 开始拖拽 | `sizes` |
| resize | 比例变化 | `sizes` |
| resizeEnd | 结束拖拽 | `sizes` |
| update:modelValue | 比例变化 | `sizes` |

### 无障碍

分隔条 `role="separator"`，带 `aria-orientation`、`aria-valuemin / max / now` 与键盘操作。