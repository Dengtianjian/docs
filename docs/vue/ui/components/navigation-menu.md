# KNavigationMenu 导航菜单

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。水平 / 垂直导航，支持二级菜单、悬停或点击触发、键盘漫游与自定义面板。

## 何时使用

- 站点或应用顶部主导航；
- 需要把二级入口收进下拉面板；
- 移动端 / 侧边栏场景使用垂直折叠导航。

## 代码演示

<Demo path="navigation-menu/basic" title="水平导航" :desc="['`items` 的 `children` 自动生成下拉面板。', '默认悬停展开（`trigger=\"hover\"`），也支持点击。', '`v-model:value` 与 `select` 同步当前项。']" />

<Demo path="navigation-menu/vertical" title="垂直折叠" :desc="['`orientation=\"vertical\"` 切换为侧边栏样式。', '子项以内联折叠展示，不再绝对定位。', '键盘漫游：方向键在顶级项之间移动，Enter / 空格展开。']" />

<Demo path="navigation-menu/custom" title="自定义触发与面板" :desc="['`#item` 自定义顶级项，作用域 `{ item, active, open }`。', '`#content` 接管下拉面板，作用域含 `close` 方法。', '`trigger=\"click\"` 适合面板内含复杂交互的场景。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前项（`v-model:value`） | `string \| number \| null` | `null` |
| items | 菜单项 | `KNavigationMenuItem[]` | `[]` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| trigger | 二级菜单触发方式 | `'hover' \| 'click'` | `'hover'` |
| closeOnSelect | 选择后关闭 | `boolean` | `true` |
| disabled | 整体禁用 | `boolean` | `false` |
| ariaLabel | 无障碍名称 | `string` | `'主导航'` |
| classNames / styles | 部件：`root / list / item / trigger / triggerLabel / icon / badge / chevron / content / link / linkIcon / linkLabel / linkDescription` | — | — |

### KNavigationMenuItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键，作为 `value` | `string \| number` |
| label | 名称 | `string` |
| icon | 图标组件 | `Component` |
| badge | 徽标文本 | `string \| number` |
| description | 子项描述 | `string` |
| href / target | 链接地址与打开方式 | `string` |
| disabled | 禁用 | `boolean` |
| children | 二级菜单 | `KNavigationMenuItem[]` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| item | 顶级项，作用域 `{ item, active, open }` |
| content | 下拉面板，作用域 `{ item, close }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:value | 当前项变化 | `string \| number \| null` |
| select | 选择菜单项 | `(item, parent?)` |
| openChange | 二级菜单开合 | `(key, open)` |

<CommonProps />

## 注意事项

- 水平导航使用 `role="menubar"` / `menuitem`，左右方向键在顶级项间漫游，`Home / End` 跳首尾，`Esc` 关闭面板。
- 下拉面板内 `↑ / ↓` 在链接间移动；面板打开时移出焦点或点击外部自动关闭。
- 悬停模式带 120ms 关闭延迟，移入面板不会闪烁；触屏与复杂面板建议改用 `trigger="click"`。
- 顶级项若配置 `href` 且无 `children`，作为普通链接渲染；点击时若未配置 `href` 则只派发 `select`、不导航。
- 水平模式在窄容器下横向滚动，不换行，适合移动端顶部导航。
