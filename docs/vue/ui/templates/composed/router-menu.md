# 路由菜单

> 组件类型：二次封装（Composed） · `KRouterMenu = KMenu + vue-router`。把路由表或手写菜单转成 KMenu 选项，激活项由当前路由决定，子路由命中时父级自动展开。

## 预览

<Demo
  path="templates/composed/router-menu"
  title="路由表生成菜单"
  :desc="['传 `routes` 时按路由表生成菜单；不传则取当前 router 的顶层路由。', '子路由（退款处理 / 角色权限）命中时，父级自动展开并高亮。', '点击菜单项由组件用 router.push 导航，前进后退和程序跳转都会同步高亮。']"
/>

## 二次封装

| 组成 | 职责 |
| --- | --- |
| `KMenu` | 菜单外观、层级展开、弹层、折叠与溢出 |
| 路由转换 | 路由表 → 菜单项：路径补齐、`meta.menu` 读取、按当前路由高亮 |

`KRouterMenu` 已由 kit 导出（`kit/vue/ui`）；本页演示接入方式，内部转换规则见下方。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menus | 手写菜单；子级可只写相对 `path` | `KRouterMenuItem[]` | — |
| routes | 路由表；不传 `menus` 时生效，缺省取当前 router 的顶层路由 | `RouteRecordRaw[]` | — |
| filter | 路由筛选：`{ name?, level?, includeChildren? }` | `KRouterMenuFilter` | — |
| routerMode | 点击菜单项的跳转方式 | `'push' \| 'replace'` | `'push'` |

其余 `KMenu` 属性（`mode` / `size` / `indent` / `collapsed` / `accordion` / `submenuTrigger` / `overflow` / `disabled` / `menuLabel` / `classNames` / `styles`）原样透传。选中项与展开项由路由驱动，不要再传 `selectedKeys`。

### 路由约定

- `meta.menu.label` 优先，其次 `meta.title`、路由 name、path。
- `meta.menu` 支持 `icon` / `key` / `level` / `order`（或 `index`）/ `show` / `hidden` / `disabled` / `danger` / `extra` / `type: 'group'`；`meta.menu: false`、`show: false` 或 `meta.hidden` 跳过。
- 没有 `meta.menu`、也没有 name / title 的路由视为分组容器，子级摊平到当前层。
- 有子级的路由渲染成可展开父项；叶子项用 `{ name }` 或绝对 path 生成链接。
- `filter.level` 只取 `meta.menu.level` 命中的层级，命中项的子树完整保留；`includeChildren: false` 剥掉子级。
- 手写 `menus` 的子级相对 `path` 会按父级补齐；`http(s)://` 地址转成 `href` 并在新窗口打开。
- 手写菜单的 `key` 默认按路由 name 匹配；key 与 name 不一致时用 `match`（路由名数组或 `(route) => boolean`）声明归属。

### Events

`select` / `itemClick` / `openChange` 等 KMenu 事件原样透传。

### Slots

`item` / `icon` / `label` / `extra` / `arrow` 透传给 `KMenu`；`item` 用于整项自定义渲染，scope 与 [KMenu](../../components/menu.md) 一致。

## 注意

- 选中项由 `route.matched` 计算：从最内层向外找，子路由命中时父项跟着高亮并展开。
- 组件在挂载时读取当前路由并直接初始化选中/展开项；应用应在 `router.isReady()` 后再挂载（或先完成初始导航），避免首帧无高亮。
- 依赖应用已安装 vue-router；不传 `menus` / `routes` 时读取当前 router 的顶层路由。
- 菜单项由组件调用 `router.push` / `router.replace` 导航，不渲染 RouterLink（因此没有新标签页打开等原生链接行为）；需要原生链接时直接用 `KMenu` 的 `to`。
- 外链只走 `href`（新窗口），不会改变当前路由。
- 路由表默认只在初始化时读取；运行中 `addRoute` 后请把新的 `routes` 传给组件，或重新挂载。
- 菜单是单选语义，不要开启 `multiple`。