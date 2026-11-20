# KSortable 拖拽排序

> 共同约定见 [共同约定](./index.md)。P2.5 通用交互件；原生 HTML5 拖拽，无第三方依赖；纵向 / 横向 / 网格三种排列，实时让位 + 松手 FLIP。

## 何时使用

- 需要对一组对象做可拖拽重排（任务列表、看板列、标签顺序、仪表盘卡片）。
- 希望自带让位/收位动画，而不是只显示一条插入线。

## 代码演示

<Demo path="sortable/basic" title="纵向列表" :desc="['`v-model` 绑定对象数组，`itemKey` 必填。', '拖动整项上下排序，经过相邻项中点时中间行实时让位（0.18s），松手由 FLIP（0.22s）归位。', 'change 回传移动项与前后下标。']" />

<Demo path="sortable/dynamic" title="动态高度纵向列表" desc="每项高度随内容不同：占位块用被拖项自身高度，让位与占位起点按最终布局累加计算，跨过高矮不一的项时不遮挡、不留白。" />

<Demo path="sortable/overflow" title="定高容器 / 自动滚动" :desc="['容器设 max-height + overflow:auto：拖到上下边缘自动滚动（40px 边缘、≤16px/帧）。', '容器或页面滚动后重测布局，占位与让位保持正确。']" />

<Demo path="sortable/multi-column" title="多列互通（看板）" :desc="['同 group 的实例之间可互相拖入/拖出，各自维护 v-model。', 'add / remove 事件回传落点与源位置。', '空列给根节点最小高度即可接住拖拽。']" />

<Demo path="sortable/table" title="原生表格行排序" :desc="['rootTag=&quot;tbody&quot; + itemTag=&quot;tr&quot;：组件根节点直接作为表格 tbody，行原生语义保留。', '占位为整行宽的虚线浮层（不参与表格布局），行内让位与松手 FLIP 一致。']" />

<Demo path="sortable/tree" title="树形跨层拖拽（dnd-kit 投影）" :desc="['扁平列表 + 缩进表示层级：拖动时横向移动调整投影深度（dnd-kit SortableTree 同款），空父级也能通过拖到其下方并右移成为子级。', '落点仍用内置占位块，松手后按投影深度重挂。']" />

<Demo path="sortable/horizontal" title="横向单行" desc="orientation=horizontal：按 X 轴中点判定落点，让位沿水平方向平移。" />

<Demo path="sortable/grid" title="网格" :desc="['orientation=grid：按最近中心定位目标格、横向中点决定插前/插后。', '换行由容器宽度决定。']" />

<Demo path="sortable/handle" title="把手指针（#handle）" :desc="['提供 #handle 后整项不再 draggable，只有把手能起拖。', '行内链接/按钮可以正常点击。']" />

<Demo path="sortable/render" title="自定义渲染（headless）" :desc="['#render 整件替换为暗色清单。', '拖拽判定、换序、change 逻辑由绑定包继承，动画需自绘。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 排序列表（受控双模） | `T[]` | — |
| itemKey | 唯一键：对象字段名或取值函数 | `keyof T \| ((item: T) => string \| number)` | — |
| orientation | 排列形态 | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` |
| disabled | 是否禁用拖拽 | `boolean` | `false` |
| tag | 列表容器标签（ul / div…） | `string` | `'div'` |
| group | 同组实例之间可跨列表拖拽 | `string` | — |
| canDrop | 目标列表是否接受外部拖入项（树下防成环等） | `(item: unknown) => boolean` | — |
| rootTag | 合并根标签（如 tbody）：根节点即排序容器 | `string` | — |
| itemTag | 每项标签（表格用 tr） | `string` | `'div'` |
| columns | itemTag=tr 时占位行 colspan | `number` | `1` |
| showPlaceholder | 是否渲染内置占位块（树形等自定义投影指示时可关） | `boolean` | `true` |
| placeholderInset | 占位块左侧内缩（px），纵向时宽度同步收窄（树形投影按深度缩进） | `number` | `0` |
| touchDelay | 触屏长按激活延迟（ms）；期间移动超过容差会让给页面滚动 | `number` | `250` |
| touchTolerance | 触屏长按前允许的移动容差（px） | `number` | `8` |
| pointer | pointer 事件拖拽（dnd-kit 式克隆浮层跟随、无原生拖影；支持触屏与 `group` 跨列）；缺省时 `rootTag` 合并根（表格等）**自动开启** | `boolean` | 自动 |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | `items: T[]` |
| change | 拖拽换序成功（原地落下不触发） | `items, info: { item, from, to }` |
| add | 跨列拖入目标列表 | `item, index` |
| remove | 跨列拖出源列表（与目标 add 成对） | `item, index` |
| dragstart | 起拖（自定义投影/指示用） | `{ x, y, key, index }` |
| dragmove | 拖动中（内置占位关闭时自绘指示线） | `{ x, y, slot, overKey, index }` |
| dragend | 拖拽结束（change 之后） | — |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 每一项的内容 | `{ item, index }` |
| handle | 自定义拖拽把手；提供后仅把手可起拖 | `{ item, index }` |

### Expose

| 方法 | 说明 |
| --- | --- |
| `move(from, to)` | 编程式换序（to 为移除后下标），会更新 v-model 并触发 change |
| `resetDrag()` | 清空拖拽中状态（让位、落点、拖拽源） |

### 部件变量

| 变量 | 说明 |
| --- | --- |
| `--k-sortable-gap` | 项间距（默认 `--k-size-xs`） |
| `--k-sortable-shift-duration` | 拖动中让位过渡（默认 0.18s） |
| `--k-sortable-move-duration` | 松手 FLIP 收位（默认 0.22s） |

## 注意事项

- **数据形状**：`v-model` 只接对象数组，`itemKey` 必须全局唯一；键用于 v-for key、FLIP 与拖拽目标识别，重复会破坏动画与落点。
- **实时让位**：纵向按指针 Y 与各行布局中点、横向按 X 中点、网格按最近中心 + 横向中点判定；
  - 纵/横落点带 **8px 滞回**——越过中点 8px 才切换目标，指针在中点轻微抖动时不会来回切换（避免行闪烁）。
  - 列表（纵/横）的让位距离按**最终布局**计算：让位项移动到新顺序下的实际坐标（累加经过项的实际宽/高与间距），空档尺寸自然等于被拖项尺寸——拖拽项比目标大或小时都不会出现遮挡或空白；
  - 网格为等宽格，按相邻中心差让位（含换行 2D 位移）。
  - 让位行置 `pointer-events: none` 防止指针命中错位。
- **拖拽源与副本**：原生拖影（跟随指针的副本）保留；
  - 原位置项在起拖后一帧 `opacity: 0` 隐藏——既让浏览器拖影快照拍到可见原项，又不会留下半透明影子遮住滑入该位置的相邻项。
- **落点占位块**：拖动时在目标空档渲染绝对定位的虚线主色占位框，位置取让位后的空档起点（向下/右累加经过项尺寸与间距，向上/左取目标槽位起点，网格取目标格），**尺寸沿用被拖拽项本身**；`left / top / width / height` 带 0.18s 过渡。
  - 回到原位时占位块停在自身原布局位，松手即无变化。
  - 不再使用上下/左右参考线。
  - `data-drop` 属性保留给 headless 自绘样式使用。
- **松手收位**：`move()` 先清让位再换序，TransitionGroup 记录的旧位置即当前视觉位置，由 FLIP 收位；`change` 只在真正换序时触发。
- **把手**：提供 `#handle` 插槽后，项本身不再 `draggable`，仅把手可起拖，适合行内含链接/输入等交互元素；不传则整项可拖。
  - 把手模式项自动 `display: flex`，把手与内容同一行（内容 `flex: 1` 占满剩余宽度）。
- **动画只默认模板**：headless 自绘时让位/进出场/FLIP 都需自行实现；`itemAttrs` 已带 `data-dragging / data-drop / data-shift` 供自绘样式使用。
- **容器溢出**：未设高度时列表随内容撑开，由页面滚动（浏览器原生拖拽会滚动页面）；
  - 通过 `styles.root` / `classNames.root` 给根节点设 `max-height + overflow:auto` 后，拖到容器上/下/左/右 40px 边缘会自动滚动（≤16px/帧，横纵向均可，仅对应轴向可滚动时生效）。
  - 拖拽中容器或页面发生滚动会重测布局并重算落点，占位块随内容滚动；**滚动期间占位与让位临时禁用过渡（滚动停止 140ms 后恢复），避免过渡滞后造成错位/视觉压缩**。
  - 横向容器的左右边缘自动滚动暂未内置。
- **列满 / 定高容器**：纵向行项 `flex: none`，内容再多也不会被 flex 压缩；
  - **本列内拖拽**的让位空档自带余量，不额外补尾空；
  - **跨列/树形外部拖入**时无论插在何处都会补尾空（占位尺寸 + 间距）承接下移的行，且占位块宽高收敛到目标列表内容盒，不越出列边框；
  - 表格模式用尾部占位行补空。
  - 定高列建议配 `max-height + overflow:auto`，拖到上下 40px 边缘会自动滚动（≤16px/帧）；未设高度则随内容撑开。
- **跨列（group）**：同 `group` 的实例共享拖拽会话，拖入/拖出各自更新 v-model；
  - 源列表 emit `remove`、目标 emit `add`。
  - 同组建议同 `orientation`；拖回源列表本身按本地排序处理（change）。
  - 空列表需给根节点最小高度（`styles.root`）才能作为落点。
- **表格（rootTag/itemTag，自动 pointer）**：`rootTag="tbody"` 时组件根节点直接是 tbody（表头留在组件外），`itemTag="tr"` 让每行保留原生表格语义；
  - 默认自动启用 **pointer 模式**（`pointer={false}` 可强制回 HTML5）参考 dnd-kit：pointerdown/move/up + 克隆浮层跟随（tr 克隆进临时 table、逐格复制计算样式），无原生拖影，因此行让位不再闪烁；占位仍为 fixed 虚线浮层，松手 FLIP。
  - pointer 模式同样支持 `group` 跨列（window 级 pointer 路由到同组目标实例）与触屏；HTML5 模式不支持触屏。
  - pointer 拖拽按**列表矩形**判定是否在容器内（越过表格行间距等空隙不会闪断），离开列表保留上次预览，松手在列表外则取消。
  - 克隆浮层会逐格复制计算样式（边框按四边 longhand、背景/圆角/字体），并沿用原 table 类名；演示中的**列拖拽**由表头原生 DnD 自管（拖 th 换列序、同步重排所有行单元格），与行排序互不影响。
- **树形（dnd-kit 投影）**：演示采用 dnd-kit SortableTree 的思路——树存为**扁平列表 + depth**，拖动时用 `dragstart` 记录起点 X、`dragmove` 提供插入位；
  - 可嵌入深度取前一项 `depth + 1`、下限为后一项 `depth`，横向位移 `/ 24px` 决定开口。
  - 拖到空父级下方再右移即可成为其子级，不需要预留空列表落点。
  - 落点仍使用内置占位块，并通过 `placeholder-inset = 投影深度 × 缩进` 让占位块按深度缩进、宽度同步收窄。
  - **同位置也允许横向改层级**（子级列表首项可原地升级）：同插槽时不受后一项最小深度限制，松手即使没有换序也应用投影深度，且只改被拖节点、后续同级不连带重挂（缩进可能出现跳级）。
  - 如需自绘指示可设 `showPlaceholder=false` 并用 `dragmove` 绘制。
- **键盘**：item 可聚焦（`tabindex`）；
  - `空格 / Enter` 拾起，方向键移动（纵向 ↑↓、横向 ←→、网格四向），`空格 / Enter / Esc` 结束；
  - 焦点随节点移动，拾起项带 `aria-grabbed` 与左侧主色条，聚焦环为 `focus-visible` 主色描边。
  - 每项 `aria-describedby` 指向操作说明；拾起/移动/放下/取消通过 `role="status" aria-live="polite"` 区域播报（如「已移动到第 3 项，共 8 项」）。
- **触屏**：`pointer` 模式使用 Pointer Events，支持触屏/触控笔；
  - 手指按住 `touchDelay`（默认 250ms）后进入拖拽，之前移动超过 `touchTolerance` 取消候选。
  - 可拖项 `touch-action: none`（dnd-kit 同类取舍），页面滚动从列表空隙/空白处发起；拖拽中锁定选择。
  - 默认 HTML5 模式不支持触摸拖动。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**。

script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KSortableRenderScope`（入口导出）。

#### 状态与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| items | `T[]` | 当前列表 |
| orientation | `'vertical' \| 'horizontal' \| 'grid'` | 排列形态 |
| disabled | `boolean \| undefined` | 是否禁用 |
| draggingKey | `string \| number \| null` | 正在拖拽的键 |
| keyOf | `(item) => string \| number` | 取键函数 |
| rootEl | `Ref<HTMLElement \| null>` | 根节点；让位测量依赖它，必须绑定 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| containerAttrs | `Record<string, unknown>` | 根节点 `data-part="root"` |
| containerOn | `KOnPack` | dragover / dragleave / drop（坐标落点判定） |
| itemAttrs(item) | `(item) => Record<string, unknown>` | data-part=item、data-key、draggable（无把手时）、data-dragging / data-drop / data-shift（默认模板用占位块示意落点，data-drop 供自绘选边） |
| itemDragOn(item) | `(item) => KOnPack` | dragstart / dragend（无把手时使用） |
| handleAttrs | `Record<string, unknown>` | data-part=handle、draggable |
| handleDragOn(item) | `(item) => KOnPack` | 把手的 dragstart / dragend |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| move | `(from, to) => void` | 编程式换序 |

最小契约：

```vue
<KSortable v-model="items" item-key="id">
  <template #render="ctx">
    <div :ref="ctx.rootEl" v-bind="ctx.containerAttrs" v-on="ctx.containerOn">
      <div
        v-for="(item, index) in ctx.items"
        :key="ctx.keyOf(item)"
        v-bind="ctx.itemAttrs(item)"
        v-on="ctx.itemDragOn(item)"
      >
        {{ index }}. {{ item.name }}
      </div>
    </div>
  </template>
</KSortable>
```

注意：headless 下不渲染 TransitionGroup，动画需自绘；`itemAttrs` 提供 `data-*` 状态供样式选择；`render` prop 经 `h()` 自绘时样式须全局或内联。

## 规格附录

### 落点判定

| orientation | 目标项 | 插前 / 插后 |
| --- | --- | --- |
| vertical | 第一条中心线低于指针的行 | 固定插前（行中点以下顺延到下一行） |
| horizontal | 第一条中心线位于指针右侧的列 | 固定插前 |
| grid | 中心距指针最近的格 | 指针在目标中心左侧 = 插前 |

### 动画时序

1. dragstart：记录各项布局中心，基准不随让位 transform 变化；保留浏览器原生拖影，下一帧隐藏原位置项（`opacity: 0`）。
2. dragover：跨过中点 → 中间项平移一格（`--k-sortable-shift-duration`）；让位行不再接收指针；目标空档渲染虚线占位块（绝对定位，跟随落点过渡）。
3. drop：清让位 → 换序 → TransitionGroup FLIP 收位（`--k-sortable-move-duration`）。

### 后续登记

- 折叠树与多容器分组的项目管理能力。
