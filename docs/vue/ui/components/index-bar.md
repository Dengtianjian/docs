# KIndexBar 索引栏

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。右侧字母索引 + 锚点滚动；`KIndexAnchor` 标记分组。

## 何时使用

- 联系人、城市、商品按首字母分组；
- 需要右侧索引快速跳转；
- 需要在滚动时高亮当前分组。

## 代码演示

<Demo path="index-bar/basic" title="联系人群组" :desc="['`indexes` 提供索引列表，与 `KIndexAnchor.index` 对齐。', '点击或按住索引栏滚动；拖动时显示气泡。', '滚动时根据锚点位置自动更新 active。']" />

## API

### KIndexBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| indexes | 索引列表 | `(string \| number)[]` | 由锚点推导 |
| offset | 滚动偏移（px） | `number` | `0` |
| ariaLabel | 无障碍名称 | `string` | `'索引栏'` |
| classNames / styles | 部件：`root / content / rail / index / bubble` | — | — |

### KIndexAnchor Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 分组索引 | `string \| number` | — |
| sticky | 分组标题吸顶 | `boolean` | `true` |
| classNames / styles | 部件：`root / header / body` | — | — |

### Slots

| 组件 | 插槽名 | 说明 |
| --- | --- | --- |
| KIndexBar | default | 锚点内容 |
| KIndexAnchor | default | 分组内容 |
| KIndexAnchor | header | 自定义分组标题 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前索引变化 | `index` |

### 暴露方法

`scrollTo(index)` / `active`。

### 说明

索引栏固定在视口右侧，按页面滚动计算当前分组。