# KNavigationMenu 导航菜单

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。水平下拉与垂直折叠导航，支持悬停、键盘与选中态。

## 何时使用

- 顶部主导航需要下拉分组；
- 侧栏需要可折叠的一级/二级菜单；
- 希望统一菜单的键盘、ARIA 与打开动画。

## 代码演示

<Demo path="navigation-menu/horizontal" title="水平下拉" overflow="visible" :desc="['`items` 一级项可带 `children`。', '悬停或点击展开，同一时间只保留一个展开项。', '`select` 派发子项与路径。', '`← / →` 切换一级项，`↓` 展开并聚焦子项。']" />

<Demo path="navigation-menu/vertical" title="垂直折叠" :desc="['`orientation=&quot;vertical&quot;` 内联展开。', '`:open-on-hover=&quot;false&quot;` 时完全由点击/键盘控制。', '选择子项后父级保持展开，`Esc` 收起并回到父项。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项（一级） | `KNavigationMenuItem[]` | `[]` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| openOnHover | 水平时悬停展开 | `boolean` | `true` |
| hoverDelay | 离开延迟（ms） | `number` | `120` |
| defaultOpenKeys | 默认展开项 | `(string \| number)[]` | `[]` |
| ariaLabel | 无障碍名称 | `string` | `'主导航'` |
| classNames / styles | 部件：`root / list / item / trigger / icon / label / chevron / panel / panelItem / panelIcon / panelLabel / panelDescription` | — | — |

### KNavigationMenuItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 文本 | `string` |
| href | 链接地址 | `string` |
| icon | 图标组件 | `Component` |
| description | 子项描述 | `string` |
| disabled | 禁用 | `boolean` |
| children | 子项（一级） | `KNavigationMenuItem[]` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 当前选中项 key | `string \| number \| null` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| trigger | 自定义一级触发内容 | `{ item, open }` |
| item | 自定义子项内容 | `{ item, parent }` |
| panel | 完全接管下拉面板 | `{ item, close }` |
| footer | 菜单底部 | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选择项 | `item, path` |
| openChange | 展开项变化 | `keys` |
| update:modelValue | 选中变化 | `key` |

### 暴露方法

`close()` / `open(item)`。

### 键盘

水平：`← / →` 移动一级，`↓` 展开并进入子项，`Esc` 关闭。垂直：`↑ / ↓` 移动，`→` 展开，`←` 收起。子项支持 `↑ / ↓ / Home / End / Esc`。