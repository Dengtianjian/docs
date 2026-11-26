# KMenu 导航菜单

> 共同约定见 [共同约定](./index.md)。P4 导航批。面向后台骨架的递归菜单：`items` 树形数据，支持 vertical / horizontal / inline，自动联动 `KLayoutSider` 折叠态。

## 何时使用

- 后台侧边导航（inline + Sider）；
- 顶部导航（horizontal，子菜单弹层）；
- 需要多级、受控选中/展开、路由跳转的菜单。

## 代码演示

<Demo path="menu/inline" title="内嵌菜单 / 多级 / 受控" :desc="['`items` 递归树；有 `children` 即子菜单。', '`v-model:selected-keys` 与 `v-model:open-keys` 受控选中和展开。', '`divided` 分隔线；`disabled` 禁用项会被键盘跳过。']" />

<Demo path="menu/multi-level" title="多级菜单 / 四级展开" :desc="['`items` 递归嵌套到任意层级，示例展开到第四级（系统管理 → 用户与权限 → 角色 → 管理员）。', '`open-keys` 一次控制整条展开链；每级缩进 16px，行高与 4px 间距保持一致。', 'horizontal / 折叠态下子菜单转为弹层，弹层内继续内嵌展开。']" />

<Demo path="menu/submenu-modes" title="单项选择展开 / 弹层" :desc="['每个父级可用 `submenuMode: &quot;popup&quot;` 单独改为弹层显示，其余项保持 inline 展开。', '弹层触发可整菜单统一：`submenu-trigger=&quot;hover | click&quot;`，单项也可用 `submenuTrigger` 覆盖。', '示例：「报表中心」顶层弹层，「日志」二级弹层；弹层内默认继续内嵌展开。']" />

<Demo path="menu/modes" title="手风琴 / 图标栏" :desc="['`collapsed` 直接进入图标栏：只显示图标，子菜单走弹层。', '`accordion` 开启后 inline 同级只展开一个，打开深层项会保留祖先链。', '两者可组合进 Sider：折叠时用图标栏，展开时用手风琴。']" />

<Demo path="menu/vertical" title="垂直菜单 / 右侧弹层" :desc="['`mode=&quot;vertical&quot;`：一级项纵向排列，子菜单从右侧弹层展开，对应 antd 的垂直菜单形态。', '与 inline 的区别是不在行内展开；图标与文字常显。', '弹层触发同样支持 hover / click。']" />

<Demo path="menu/groups" title="菜单分组" :desc="['`type: &quot;group&quot;` 渲染分组标题，`children` 平铺在标题下，不可选也不展开。', '分组可混用普通项与子菜单；分组标题在折叠态自动隐藏。']" />

<Demo path="menu/custom" title="自定义渲染 / 尺寸" :desc="['`#icon` / `#label` / `#extra` / `#arrow` 插槽覆盖默认渲染，scope 带 `item / level / active`。', '`size` 三档同时作用于菜单与弹层行高、字号；`indent` 控制每级缩进。']" />

<Demo path="menu/overflow" title="溢出收起" :desc="['`overflow` 开启后，水平模式超出宽度、纵向模式超出高度时，剩余项收进末尾「更多」弹层。', '随容器尺寸变化自动重算；被收起项仍然可选中，选中后「更多」呈现高亮。']" />

<Demo path="menu/horizontal" title="水平菜单 / 弹层子菜单" :desc="['`mode=&quot;horizontal&quot;` 顶部排列；子菜单悬停/点击弹出。', '弹层内多级子菜单继续内嵌展开。', '`placement` 语义复用通用弹层基座，横向默认 `bottomLeft`，纵向默认 `rightTop`。']" />

<Demo path="menu/horizontal-icons" title="水平菜单（带图标）" :desc="['顶层项配置 `icon` 后水平菜单带图标展示。', '图标默认 16px；折叠态放大到 20px，文字隐藏。']" />

<Demo path="menu/sider" title="Sider 折叠联动" :desc="['`KLayoutSider collapsible` 提供触发器与折叠上下文。', '内部 `KMenu mode=&quot;inline&quot;` 自动读取折叠态：收起时只显示图标，子菜单改为弹层。', '`v-model:collapsed` 可受控；`#trigger` 可替换默认折叠按钮。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单树；有 `children` 即子菜单 | `KMenuItem[]` | `[]` |
| mode | 排列模式 | `'vertical' \| 'horizontal' \| 'inline'` | `'inline'` |
| size | 尺寸（行高 / 字号） | `'sm' \| 'md' \| 'lg'` | `'md'` |
| indent | 每级缩进（px） | `number` | `16` |
| disabled | 整菜单禁用 | `boolean` | `false` |
| multiple | 多选：点击切换选中项 | `boolean` | `false` |
| accordion | inline 手风琴：同级只展开一个子菜单，保留祖先链 | `boolean` | `false` |
| overflow | 溢出收起：水平宽度 / 纵向高度不够时收进末尾「更多」弹层 | `boolean` | `false` |
| collapsed | 折叠态；不传则自动读父级 `KLayoutSider` | `boolean` | — |
| submenuTrigger | 弹层子菜单触发方式 | `'hover' \| 'click'` | `'hover'` |
| menuLabel | 菜单的 `aria-label` | `string` | — |
| v-model:selected-keys | 选中项 key 列表 | `string[]` | `[]` |
| v-model:open-keys | inline 展开项 key 列表 | `string[]` | `[]` |
| classNames | 部件类名（`root / item / itemActive / itemDanger / icon / label / submenu / submenuActive / arrow / subList / popup / divider / group / groupTitle / groupList / extra / overflow`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KMenuItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| label | 文字 / VNode | `VNodeChild` |
| icon | 图标组件 | `Component` |
| disabled | 禁用 | `boolean` |
| danger | 危险样式 | `boolean` |
| divided | 在本项前插入分隔线（首项忽略） | `boolean` |
| to / href / external | 路由 / 普通链接 / 外链 | `RouteLocationRaw \| string` / `string` / `boolean` |
| submenuMode | 本项子菜单的展开方式；`popup` 改为弹层显示（默认跟随菜单） | `'inline' \| 'popup'` |
| type | 传 `'group'` 渲染为分组标题 + 平铺子项 | `'group'` |
| submenuTrigger | 本项弹层触发方式；默认跟随菜单，建议整菜单统一 | `'hover' \| 'click'` |
| extra | 行尾附加内容（数量 / 状态点） | `VNodeChild` |
| title | 原生 title 提示；折叠态缺省用标题 | `string` |
| children | 子菜单项 | `KMenuItem[]` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选中叶子项 | `key: string, item: KMenuItem` |
| openChange | inline 展开项变化 | `keys: string[]` |
| itemClick | 点击任意可交互项（含父级） | `key: string, item: KMenuItem` |
| update:selectedKeys | 受控选中更新 | `string[]` |
| update:openKeys | 受控展开更新 | `string[]` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| icon | 覆盖每项图标 | `{ item, level, active }` |
| label | 覆盖每项标题 | `{ item, level, active }` |
| extra | 行尾附加内容 | `{ item, level }` |
| arrow | 子菜单箭头（展开态可换向） | `{ item, open }` |

### 部件

`root` / `item` / `icon` / `label` / `submenu` / `arrow` / `subList` / `popup` / `divider` / `group` / `groupTitle` / `groupList` / `extra` / `overflow`。

## 注意事项

- 有 `children` 的项只负责展开，不触发 `select`；叶子项选中后弹层自动关闭。
- 键盘：vertical/inline 用 ↑/↓，horizontal 用 ←/→；Home/End 跳首尾；Enter/Space 展开或选中；inline 子菜单可用 → 展开、← 收起；弹层内 ↑/↓ 漫游，Esc/← 返回父项。
- 弹层内的更深层级以内嵌方式展开，避免多级 Teleport 的焦点与点外关闭互扰。
- PC 弹层触发默认 hover，可整菜单设为 click；单项 `submenuTrigger` 覆盖时避免混用，否则会出现有的悬浮弹出、有的必须点击。
- 弹层子菜单进出场对齐 antd 的 slide-up：起点 `scaleY(0.8)`、原点左上、0.3s `cubic-bezier(.08,.82,.17,1)` 并淡入；减少动态偏好时直接显隐。
- 图标栏使用 `collapsed`（显式传值优先于 Sider 折叠态），建议宽度 64px 左右；`accordion` 只影响 inline 展开，不改变弹层行为。
- 分组（`type: "group"`）适合纵向与弹层菜单；水平菜单不建议使用分组，会把横向排列撑成多行。
- `overflow` 依赖容器实际尺寸（ResizeObserver），纵向需给菜单或父级明确高度才会触发；收起项在「更多」弹层里按原层级渲染。
- 折叠态下只显示顶层图标，文字通过原生 `title` 兜底；子菜单改为右侧弹层。图标默认 16px，折叠态放大到 20px。
- 展开的父级不铺底色；子级选中时父级只保留主色文字，hover 时加浅底、文字仍保持主色。
- inline 子菜单展开/收起是对齐 naive-ui 的折叠过渡：max-height + 透明度 + 间距 0.3s 同步动画，动画期间不接收点击；减少动态偏好时直接切换。
- 菜单默认文字/图标使用 `text-secondary`，hover 提升到 `text`；弹层子菜单最小宽度 200px，条目与父级行高一致。
- `to` 渲染 `RouterLink`，需要应用已安装 vue-router；文档环境请用 `href`。
- Sider 折叠由 `KLayoutSider` 提供：`collapsible` + `v-model:collapsed`，内部 Menu 通过 context 自动同步。
<style>
/* 文档站 :where(.vp-doc) li + li 的间距会穿透进菜单演示，统一在页面收掉 */
.vp-doc._vue_ui_components_menu .k-menu li + li {
  margin-top: 0;
}
</style>
