# KDropdown 下拉菜单

> 共同约定见 [共同约定](./index.md)。P4 导航批。`#trigger` 触发区 + `items` 菜单：悬停、点按、右键三种触发方式，支持受控开合与键盘漫游。

## 何时使用

- 一组操作收纳到触发器下（行操作、账号菜单、通知入口）；
- 需要 hover / click / contextmenu 多种打开方式。

## 代码演示

<Demo path="dropdown/basic" title="基础 / 图标 / 分组 / 危险项" :desc="['`items` 提供 `key`、`label`、`icon`、`disabled`、`danger`、`divided`。', '`trigger=&quot;click&quot;` 点按开合；`select` 返回 key 与原 item。', '`danger` 红色危险项；`divided` 在本项前加分隔线。']" />

<Demo path="dropdown/sizes" title="三档尺寸" :desc="['`size` 支持 `sm` / `md` / `lg`，同步调整选项行高、字号与最小宽度；横向内边距统一 8px。', '`size` 只影响弹层；触发器尺寸由业务控件自行决定，示例用同档位按钮对照。', '内容区统一 4px 内边距，md 选项行高 32px。']" />

<Demo path="dropdown/triggers" title="触发方式 / 对齐位置" :desc="['`trigger` 支持 `hover` / `click` / `contextmenu`，也可传数组组合。', '`placement` 走通用 12 方位；空间不足自动翻转。', '触屏设备缺省由 hover 改为 click。']" />

<Demo path="dropdown/custom" title="自定义菜单项 / 受控开合" :desc="['`#item` 作用域插槽自定义每项内容，scope 提供 `item`、`index`。', '`v-model:open` 受控开合；`#trigger` 放任意触发元素。', '`menu-label` 提供菜单的 a11y 名称。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项 | `KDropdownItem[]` | — |
| placement | 弹层位置（12 方位，空间不足自动翻转） | `KOverlayPlacement` | `'bottomLeft'` |
| trigger | 触发方式，可传数组 | `'hover' \| 'click' \| 'contextmenu' \| KDropdownTrigger[]` | 桌面 `['hover']`，触屏 `['click']` |
| mouseEnterDelay | hover 打开延迟（秒） | `number` | `0.1` |
| mouseLeaveDelay | hover 关闭延迟（秒） | `number` | `0.1` |
| v-model:open | 受控开合；不传则组件自管 | `boolean` | — |
| disabled | 禁用触发 | `boolean` | `false` |
| closeOnSelect | 选中后关闭 | `boolean` | `true` |
| menuLabel | 菜单的 `aria-label` | `string` | — |
| size | 菜单尺寸（只影响弹层） | `'sm' \| 'md' \| 'lg'` | `'md'` |
| classNames | 部件类名（`trigger / root / item / label / icon / divider / danger`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KDropdownItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识，`select` 事件返回 | `string \| number` |
| label | 文字 / VNode；`#item` 插槽优先 | `VNodeChild` |
| icon | 左侧图标组件 | `Component` |
| disabled | 禁用项（不可聚焦、不可选中） | `boolean` |
| danger | 危险样式 | `boolean` |
| divided | 在本项前插入分隔线（首项忽略） | `boolean` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选中菜单项 | `key: string \| number, item: KDropdownItem` |
| openChange | 开合变化 | `open: boolean` |
| update:open | 受控模型更新 | `open: boolean` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 触发元素（按钮、链接、任意可交互元素） |
| default | 自定义菜单内容；提供时替代 `items` 渲染 |
| item | 单项作用域插槽，scope `{ item, index }` |

### 部件

`trigger` / `root`（role=menu）/ `item`（role=menuitem）/ `label` / `icon` / `divider`。

## 注意事项

- 菜单打开后，焦点可通过 ↑ / ↓ 在可用项间循环移动，Home / End 跳到首尾，Enter / Space 选中，Esc 关闭并把焦点还给触发器；禁用项会被跳过。
- 触发器支持 ↑ / ↓ / Enter / Space 打开并聚焦首个可用项；右键触发走 `contextmenu`，不会改变当前焦点。
- `default` 插槽完全接管菜单内容时，请自行维护 `role="menuitem"` 与键盘行为。
- 点外部或 Esc 自动关闭；`closeOnSelect=false` 时选中不关闭，适合多选/连续操作。
- 当前版本为单层菜单；多级子菜单与 Sider 折叠场景留给 Menu 批统一实现。