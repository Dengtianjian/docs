# KTour 漫游引导

> 共同约定见 [共同约定](./index.md)。P8 增强件。按步骤高亮页面元素并展示引导浮层。

## 何时使用

- 新功能首次使用引导；
- 需要高亮指定元素并逐步讲解；
- 需要键盘切换、跳过与完成回调。

## 代码演示

<Demo path="tour/basic" title="基础两步引导" :desc="['`steps` 每步通过 `target` 指定 CSS 选择器或返回元素的函数。', '`v-model:open` 控制显隐，`v-model:current` 控制当前步。', '浮层会自动避让视口并在滚动 / 缩放时重新定位。']" />

<Demo path="tour/custom" title="自定义内容与底栏" :desc="['`#step` 作用域 `{ step, index }` 替换正文。', '`#footer` 提供 `next / prev / finish / skip` 方法。', '`Esc` 关闭，`← / →` 切换步骤。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 步骤列表 | `KTourStep[]` | `[]` |
| mask | 高亮遮罩 | `boolean` | `true` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| closeOnOverlay | 点击遮罩关闭 | `boolean` | `true` |
| showSkip | 显示跳过 | `boolean` | `true` |
| padding | 高亮外扩 | `number` | `6` |
| offset | 浮层与目标间距 | `number` | `12` |
| nextText / prevText / finishText / skipText | 按钮文案 | `string` | 下一步 / 上一步 / 完成 / 跳过 |
| classNames / styles | 部件：`root / highlight / header / title / progress / body / footer / close` | — | — |

### KTourStep

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| target | 目标选择器、元素函数或空 | `string \| (() => HTMLElement \| null)` |
| title | 标题 | `string` |
| description | 描述 | `string` |
| placement | 浮层方位 | `'top' \| 'bottom' \| 'left' \| 'right'` |

### v-model

| 名称 | 说明 | 默认值 |
| --- | --- | --- |
| open | 是否打开 | `false` |
| current | 当前步骤索引 | `0` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 标题 | `{ step, index }` |
| step | 正文 | `{ step, index }` |
| footer | 底部操作 | `{ step, index, next, prev, finish, skip }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 步骤变化 | `index, step` |
| finish | 最后一步完成 | — |
| skip | 跳过 | — |
| close | 关闭 | — |

### 暴露方法

`next()` / `prev()` / `finish()` / `skip()` / `refresh()`。