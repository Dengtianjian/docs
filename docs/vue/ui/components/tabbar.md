# KTabBar 底部标签栏

> 共同约定见 [共同约定](./index.md)。P4 导航批。移动端底部导航：图标、文案、角标与受控选中。

## 何时使用

- App 一级页面切换；
- 需要角标提示未读/待办。

> 悬浮胶囊 + 左侧头像 / AI 入口等组合场景，见 [胶囊导航（KTabBarCapsule）](../templates/composed/tabbar-capsule.md)。

## 代码演示

<Demo path="tabbar/basic" title="图标 / 角标 / 受控 / 键盘" :desc="['`items` 提供 `key/title/icon/badge/disabled`。', '`v-model:active` 受控选中；`change` 返回 key 与原 item。', '底部固定为默认行为；演示用 `:fixed=&quot;false&quot;` 嵌入手机框。']" />

<Demo path="tabbar/icon-only" title="仅图标" :desc="['不传 `title` 时只显示图标，适合一级入口。', '用 `ariaLabel` 补读屏名；`activeIcon` 可切选中态图标，缺省沿用 `icon`。']" />

<Demo path="tabbar/text-only" title="仅文字" :desc="['不传 `icon` 时只显示文案，适合二级频道切换。']" />

<Demo path="tabbar/badge" title="角标" :desc="['`badge` 数字或文本按内容显示。', '`badge: true` 渲染红点；不传则无角标。']" />

<Demo path="tabbar/safe-area" title="安全区" :desc="['`safeArea` 用 `env(safe-area-inset-bottom)` 预留底部。', '桌面环境为 0，演示用 20px padding 模拟；关闭后内容贴底。']" />

<Demo path="tabbar/menu" title="子菜单" :desc="['`items[].children` 声明子项，点击在标签栏上方展开。', '再点、点外部或 Esc 收起；`child-click` 返回子项。`children` 插槽可自定义。']" />

<Demo path="tabbar/menu-bubble" title="气泡子菜单" :desc="['`menuVariant` 设为 `bubble` 时锚定点击项上方，宽度随内容。', '左右超出自动收进栏内；再点、点外部或 Esc 收起。']" />

<Demo path="tabbar/center-action" title="中间操作键" :desc="['`render` 自绘中间发布键，替换默认文案。', '其余项保持文案 + 角标。']" />

<Demo path="tabbar/meituan" title="中间悬浮图标" :desc="['`render` 画悬浮品牌图标，`margin-top` 上移。', '图标用 `@tabler/icons-vue`；中间图标有选中态，点击有回弹。']" />

<Demo path="tabbar/floating" title="悬浮模式 / 圆角" :desc="['`mode=floating` 悬浮卡片：留边、四边框、全圆角与投影。', '`radius` 控制圆角（数字按 px），实时可调。']" />

<Demo path="tabbar/active-hide" title="选中隐藏文案 / 图标" :desc="['`activeHide` 控制选中项隐藏文案或图标。', '演示用分段切换：都显示 / 隐藏文案 / 隐藏图标。']" />


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 标签项 | `KTabBarItem[]` | `[]` |
| v-model:active | 当前 key | `string` | 第一个可用项 |
| fixed | 固定在视口底部 | `boolean` | `true` |
| safeArea | 底部安全区（`env(safe-area-inset-bottom)`） | `boolean` | `true` |
| mode | 外观：`default` 贴底通栏；`floating` 悬浮卡片 | `'default' \| 'floating'` | `'default'` |
| radius | 圆角，数字按 px；缺省 default 0 / floating 全圆 | `number \| string` | — |
| menuVariant | 子菜单形态：`full` 铺满栏上方；`bubble` 锚定点击项的气泡 | `'full' \| 'bubble'` | `'full'` |
| bounce | 点击切换的缩放回弹；单项可覆盖 | `boolean` | `false` |
| activeHide | 选中时隐藏文案或图标；单项可覆盖 | `'label' \| 'icon'` | — |
| classNames | 部件类名（`root / item / itemActive / icon / label / badge`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KTabBarItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| title | 文案 / VNode；不传且给了 icon 时只显示图标 | `VNodeChild` |
| activeTitle | 选中态文案；缺省沿用 `title` | `VNodeChild` |
| icon | 图标组件 | `Component` |
| activeIcon | 选中态图标；缺省沿用 `icon` | `Component` |
| ariaLabel | 仅图标时的读屏名 | `string` |
| children | 点击后在栏上方展开的子项 | `KTabBarChild[]` |
| badge | `true` = 红点；其余按文本显示 | `string \| number \| boolean` |
| disabled | 禁用 | `boolean` |
| bounce | 该项是否回弹；缺省跟随 `KTabBar.bounce` | `boolean` |
| activeHide | 该项选中时隐藏文案或图标；缺省跟随组件级 | `'label' \| 'icon'` |
| render | 自定义单项外观，替换默认图标 / 文案 / 角标 | `(scope: { item, index, active }) => VNodeChild` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 切换标签 | `key: string, item: KTabBarItem` |
| update:active | 受控模型更新 | `key: string` |
| child-click | 点击子菜单项 | `key: string, child: KTabBarChild, item: KTabBarItem` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| item | 单项作用域插槽，scope `{ item, index, active }` |
| children | 子菜单单项，scope `{ item, child, index }` |

### KTabBarChild

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| title | 文案 / VNode | `VNodeChild` |
| icon | 图标组件 | `Component` |
| iconColor | 子项图标颜色；缺省跟随文字 | `string` |
| disabled | 禁用 | `boolean` |

## 注意事项

- 键盘 ←/→ 循环切换并跳过禁用项，Home/End 跳首尾；选中项 `tabindex=0`，其余 -1。
- 只传 `icon` 不传 `title` 时仅显示图标，用 `ariaLabel` 提供读屏名；只传 `title` 时仅显示文案。
- 项带 `children` 时点击展开/收起子菜单：面板覆盖在栏上方，点外部、Esc 或选中子项都会关闭。
- `render` 提供后该项不再渲染默认图标/文案/角标；`#item` 插槽优先于单项 `render`。
- `activeTitle` / `activeIcon` 只在选中时替换文案与图标，其余状态沿用 `title` / `icon`。
- `mode=floating` 时左右与底部留 `--k-size-sm`，四边框 + 投影；`fixed` 时自动改为贴底偏移。
- 回弹默认关闭；`bounce` 开启后点击播放缩放回弹（0.3s），单项 `item.bounce` 优先。
- `activeHide` 控制选中时隐藏文案或图标（单项可覆盖）；胶囊组合场景见 [KTabBarCapsule](../templates/composed/tabbar-capsule.md)。
- 默认隐藏是瞬时切换（选中项带 `is-hide-label` / `is-hide-icon` 类）；需要过渡时可基于 `classNames` 自定义类覆盖，见「选中隐藏文案 / 图标」演示。
- `fixed` 默认贴视口底部；嵌入局部容器时传 `:fixed="false"`。
- `safeArea` 使用 `env(safe-area-inset-bottom)`，桌面环境为 0。
- 当前只做导航选中，不内建页面内容切换；`role="tablist"` + `role="tab"` 供读屏识别。