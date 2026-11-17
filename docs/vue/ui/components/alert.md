# KAlert 警告提示

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第六件。页面/区块内的静态通告条。

## 何时使用

- 渲染在页面里、需要用户持续可见的提示（区别于自动消失的 [message](./message.md)）。

## 代码演示

<Demo path="alert/basic" title="类型 / 描述 / 可关闭 / 操作区" desc="四类型语义色链（bg/border/icon 三件套随 type）；description 触发加粗标题形态；closable、action 插槽、banner、showIcon=false。" />

<Demo path="alert/render" title="自定义渲染（headless）" desc="双通道：`#render` 自绘语义左缘条（type 驱动强调色，onClose 继承关闭）；`render` prop 自绘紧凑横条。关闭后整件消失（visible 门照跑）。" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 语义类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| message | 主文案（`title` 插槽优先） | `string \| VNode` | — |
| description | 辅助描述（`description` 插槽优先；有值时标题加粗、图标升档） | `string \| VNode` | — |
| showIcon | 显示类型图标（`icon` 插槽 / icon prop 覆盖；prop 传 `null` 强制无图标） | `boolean` | `true` |
| closable | 显示关闭 X | `boolean` | `false` |
| open / v-model:open | 受控开合（关闭钮发 `update:open=false` + 自隐） | `boolean` | `true` |
| banner | 贴边通告条（直角 + 去左右边框） | `boolean` | `false` |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KAlertRenderScope) => VNodeChild` | — |
| classNames / styles | `root \| icon \| content \| title \| description \| action \| close` | — | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 点击关闭 X（与 `update:open=false` 同发） | `(e: MouseEvent)` |
| update:open | 开合态变化（`v-model:open`） | `(open: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义类型图标（覆盖内建 SVG；仅 `icon` prop 缺省时渲染） |
| title | 主文案（覆盖 `message` prop） |
| description | 辅助描述（覆盖 `description` prop） |
| action | 操作区（无回退，仅提供插槽时渲染） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无默认插槽。

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-alert-bg / -border-color / -icon-color` | `--k-color-<type>-bg / -border` + 语义色（随 type 局部重声明） |
| `--k-alert-radius / -padding / -gap` | `border-radius-lg` / `sm size`（12px 16px） / `size-xs` |
| `--k-alert-close-color` | `text-tertiary`（hover 升 secondary） |

## 注意事项

- `role="alert"` 静态渲染；异步出现需要播报时用 [message](./message.md)。
- 关闭是单向的（自隐不可逆），受控场景用 `v-model:open` 由数据源决定重现。
- action 区放按钮请配 `size="xs"`（行高密度）；本库不引图标库，Alert 图标为内建 SVG。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KAlertRenderScope`（入口导出），字段逐组如下（静态通告件：只有状态 + 绑定包 + 单个关闭动作，无 ref/出口组）。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `AlertType` | 语义类型（组件内别名 = `'info' \| 'success' \| 'warning' \| 'error'`）；默认渲染据此切 `--k-alert-bg / -border-color / -icon-color` 三件套语义色链，自绘可映射为自己的强调色 |
| message | `string \| VNode \| undefined` | 主文案 prop 通道；默认渲染 `title` 插槽优先，自绘取 `slots.title` 后以它兜底 |
| description | `string \| VNode \| undefined` | 辅助描述 prop 通道（`description` 插槽优先）；有值时默认渲染标题加粗、图标升档（`k-alert--with-description`），自绘自行判断该形态 |
| showIcon | `boolean` | 是否显示类型图标；默认渲染还受 `icon` prop 约束（传 `null` 强制无图标——该 prop 不在 scope 内），自绘画图标可取 `slots.icon` 或按 type 自绘 |
| closable | `boolean` | 是否应渲染关闭 X；自绘关闭钮据此显隐并绑 `onClose` |
| banner | `boolean` | 贴边通告条标记（默认渲染直角 + 去左右边框）；自绘映射自己的贴边样式 |
| visible | `boolean` | 开合合成态：受控（原始 vnode props 含 `open` 键）取 `props.open`，否则取内部开合态；**整件输出门控**——为 false 时 `#render` 插槽 / `render` prop 整体不渲染（关闭后整件消失），自绘内部无需再做 v-if |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `role="alert"`（静态通告语义）。**不含 `k-alert` token 宿主类**——`--k-alert-*` 变量（语义色链、radius/padding/gap/close-color）声明在 `.k-alert` 上，由默认模板追加；自绘背景/边框/圆角/内边距全自理，想复用 token 可自行补 `k-alert` + `k-alert--<type>` 类 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| onClose | `(e: MouseEvent) => void` | 关闭动作：**受控双模**——非受控置内部开合态 false（自隐不可逆，重现需数据源改值）；受控（传了 `open`）不改内部态；两模都发 `update:open(false)` + `close(e)`。visible 转 false 后 headless 分支被整体门控消失 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（icon/title/description/action，**无默认插槽**），自绘时可按需取用，如 `ctx.slots.action?.()`。
