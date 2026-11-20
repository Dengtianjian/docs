# KMessage 全局提示

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第五件（原 message-notification 同页，notification 已拆至 [KNotification](./notification.md)）。无模板组件：只有 `useKApp().message` 实例 API + KApp 内挂载的队列 Holder。

## 何时使用

- 操作结果的轻反馈（不打断、自动消失）。
- 带标题+描述+操作的结构化系统通知用 [KNotification](./notification.md)；渲染在页面里持续可见的提示用 [KAlert](./alert.md)。

## 代码演示

<Demo path="message/basic" title="message" :desc="['四类型 + loading。', '时长秒、0 常驻。', '同 key 复更新（loading→success 不叠条）。', 'destroyAll。']" />

<Demo path="message/sizes" title="三档尺寸" :desc="['`size` 支持 `sm` / `md` / `lg`，字号、内边距与图标同步缩放。', '尺寸按单条消息配置，不影响队列其它消息。']" />

<Demo path="message/render" title="自定义内容（render + classNames）" :desc="['render 只替换图标与正文，外层 k-message 的队列、role、计时与关闭回调仍由 Holder 提供。', 'classNames/styles 逐部件覆盖。']" />

## API

### 实例 API（`useKApp().message`）

先在 `<KApp>` 子树里取实例，再调方法（文档站由主题在最外层统一挂 KApp；业务里自行包一层）：

```ts
import { useKApp } from 'kit/vue/ui'

const { message } = useKApp()!   // 未挂 <KApp> 时 useKApp() 为 undefined
message.success('操作成功')
```

```
message.open(config | string) → { destroy() }
message.info|success|error|warning|loading(content, duration?, onClose?) → { destroy() }
message.info|…({ content, duration, icon, key, onClose, render, classNames, styles }) → { destroy() }
message.destroy(key) / message.destroyAll()
```

| config 字段 | 说明 | 默认 |
| --- | --- | --- |
| content | 文本或 VNode | — |
| duration | 自动关闭秒数，`0` = 常驻 | `3` |
| type | 图标类型；icon 可覆盖、`null` 去图标 | `'info'` |
| size | 尺寸：字号、内边距、图标同步缩放 | `'md'` |
| key | 同 key 复用同一条（内容/类型原地更新） | — |
| render | 自定义图标+正文：`({ content, type, icon, size, close }) => VNodeChild`；外层队列/role/计时不变 | — |
| classNames | 部件类名覆盖：`root / icon / content` | — |
| styles | 部件样式覆盖：`root / icon / content` | — |
| onClose | 该条销毁时回调 | — |

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-message-bg` | `--k-color-bg-elevated` |
| `--k-message-radius` | `--k-border-radius-lg` |
| `--k-message-pad / -font-size / -icon-size` | 随 size 档（上下×左右：sm 8×16 / md 12×20 / lg 16×24；字号 12/14/16、图标 16/18/20）；多条纵向间距 12px |
| z 层级 | `--k-z-index-message` |
| 图标着色 | 类型语义色 `--k-color-success/error/warning/info` |

## 注意事项

- 移动端（≤767px）：顶部留出 `safe-area-inset-top`，消息最大宽度收为 `100vw - 24px`。

- 实例 API 只在 KApp 之下可用（拍板③：无全局静态），队列与计时器随 KApp 卸载整体清理；`useKApp()` 返回 `undefined` 时先检查页面是否套了 `<KApp>`。
- Holder 出口 Teleport 到 body 并按契约④携带 `scopeClass`/`data-k-theme`。
- 图标是内建 inline SVG：实心圆底 + 反白符号（路径表与 notification 同源），零图标库依赖。
- 离场动画：消失条先钉在原位脱离文档流，淡出 + 轻微上移的同时剩余消息以 FLIP 过渡平滑补位；最后一条移除时容器常驻以便动画播完。
- 读屏：普通消息 `role="status"`（polite），错误消息 `role="alert"`（assertive），单条 `aria-atomic="true"` 整条朗读；动态插入自动播报。
- loading 常驻靠 `duration: 0`，结束时同 key 更新或 `handle.destroy()`。
