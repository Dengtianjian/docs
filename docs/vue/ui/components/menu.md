# KMenu 导航菜单

> 共同约定见 [共同约定](./index.md)。P4 导航批。面向后台骨架的递归菜单：`items` 树形数据，支持 vertical / horizontal / inline，自动联动 `KLayoutSider` 折叠态。

## 何时使用

- 后台侧边导航（inline + Sider）；
- 顶部导航（horizontal，子菜单弹层）；
- 需要多级、受控选中/展开、路由跳转的菜单。

## 代码演示

<Demo path="menu/inline" title="内嵌菜单 / 多级 / 受控" :desc="['`items` 递归树；有 `children` 即子菜单。', '`v-model:selected-keys` 与 `v-model:open-keys` 受控选中和展开。', '`divided` 分隔线；`disabled` 禁用项会被键盘跳过。']" />

<Demo path="menu/multi-level" title="多级菜单 / 四级展开" :desc="['`items` 递归嵌套到任意层级，示例展开到第四级（系统管理 → 用户与权限 → 角色 → 管理员）。', '`open-keys` 一次控制整条展开链；每级缩进 16px，行高与 4px 间距保持一致。', 'horizontal / 折叠态下子菜单转为弹层，弹层内继续内嵌展开。']" />

<Demo path="menu/horizontal" title="水平菜单 / 弹层子菜单" :desc="['`mode=&quot;horizontal&quot;` 顶部排列；子菜单悬停/点击弹出。', '弹层内多级子菜单继续内嵌展开。', '`placement` 语义复用通用弹层基座，横向默认 `bottomLeft`，纵向默认 `rightTop`。']" />

<Demo path="menu/horizontal-icons" title="水平菜单（带图标）" :desc="['顶层项配置 `icon` 后水平菜单带图标展示。', '图标默认 16px；折叠态放大到 20px，文字隐藏。']" />

<Demo path="menu/sider" title="Sider 折叠联动" :desc="['`KLayoutSider collapsible` 提供触发器与折叠上下文。', '内部 `KMenu mode=&quot;inline&quot;` 自动读取折叠态：收起时只显示图标，子菜单改为弹层。', '`v-model:collapsed` 可受控；`#trigger` 可替换默认折叠按钮。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单树；有 `children` 即子菜单 | `KMenuItem[]` | `[]` |
| mode | 排列模式 | `'vertical' \| 'horizontal' \| 'inline'` | `'inline'` |
| multiple | 多选：点击切换选中项 | `boolean` | `false` |
| collapsed | 折叠态；不传则自动读父级 `KLayoutSider` | `boolean` | — |
| submenuTrigger | 弹层子菜单触发方式 | `'hover' \| 'click'` | `'hover'` |
| menuLabel | 菜单的 `aria-label` | `string` | — |
| v-model:selected-keys | 选中项 key 列表 | `string[]` | `[]` |
| v-model:open-keys | inline 展开项 key 列表 | `string[]` | `[]` |
| classNames | 部件类名（`root / item / itemActive / itemDanger / icon / label / submenu / submenuActive / arrow / subList / popup / divider`） | `Partial<Record<Part, string>>` | — |
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
| children | 子菜单项 | `KMenuItem[]` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选中叶子项 | `key: string, item: KMenuItem` |
| openChange | inline 展开项变化 | `keys: string[]` |
| update:selectedKeys | 受控选中更新 | `string[]` |
| update:openKeys | 受控展开更新 | `string[]` |

### 部件

`root` / `item` / `icon` / `label` / `submenu` / `arrow` / `subList` / `popup` / `divider`。

## 注意事项

- 有 `children` 的项只负责展开，不触发 `select`；叶子项选中后弹层自动关闭。
- 键盘：vertical/inline 用 ↑/↓，horizontal 用 ←/→；Home/End 跳首尾；Enter/Space 展开或选中；inline 子菜单可用 → 展开、← 收起；弹层内 ↑/↓ 漫游，Esc/← 返回父项。
- 弹层内的更深层级以内嵌方式展开，避免多级 Teleport 的焦点与点外关闭互扰。
- 折叠态下只显示顶层图标，文字通过原生 `title` 兜底；子菜单改为右侧弹层。图标默认 16px，折叠态放大到 20px。
- 展开的父级不铺底色；子级选中时父级只保留主色文字，hover 时加浅底、文字仍保持主色。
- inline 子菜单展开/收起为高度过渡（约 0.2s），动画期间不接收点击；减少动态偏好时直接切换。
- 菜单默认文字/图标使用 `text-secondary`，hover 提升到 `text`；弹层子菜单最小宽度 200px，条目与父级行高一致。
- `to` 渲染 `RouterLink`，需要应用已安装 vue-router；文档环境请用 `href`。
- Sider 折叠由 `KLayoutSider` 提供：`collapsible` + `v-model:collapsed`，内部 Menu 通过 context 自动同步。