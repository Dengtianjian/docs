# KMentions 提及

> 共同约定见 [共同约定](./index.md)。表单补充批。在文本输入中通过触发字符唤起候选列表，选择后插入标签。

## 何时使用

- 评论、工单、协作备注中的 @成员；
- 需要把结构化对象（人、标签、部门）插入自由文本。

## 代码演示

<Demo path="mentions/basic" title="基础用法" :desc="['输入 `@` 唤起候选，弹层定位到 `@` 光标位置。', '输入过滤、滚动或换行时弹层跟随光标。', '上下方向键切换，Enter / Tab 选中，Esc 关闭。', '`#option` 可替换候选项内容。']" />

<Demo path="mentions/trigger" title="自定义触发器" :desc="['`#trigger` 插槽可放原生 textarea / input / contenteditable，也可放 KInput 这类封装；组件自动找到底层可编辑节点取光标并插入选中项。', '插槽 scope 提供 `value / attrs / focus`；非 DOM 编辑器（自绘富文本）不支持自动取光标，仍可用 `render` 整件替换。']" />

<Demo path="mentions/avatar" title="自定义选项" :desc="['`#option` 作用域 `{ option, active }`，示例用头像 + 昵称 + 邮箱替换默认的 label / value。', '头像底色与文字色取自主题 token；`active` 可用于自绘选中态。']" />



<Demo path="mentions/async" title="异步加载" :desc="['提供 `fetchOptions` 后忽略 `options`，按触发词防抖请求，请求期间弹层显示「加载中…」。', '`debounce` 控制防抖毫秒数（默认 200）；连续输入只保留最后一次请求结果。']" />

<Demo path="mentions/slots" title="头部与脚部" :desc="['`#header` / `#footer` 固定在滚动区外，不随候选列表滚动。', '头部适合放分组标题、计数，脚部适合放键盘提示或加载状态。']" />

<Demo path="mentions/paging" title="触底加载" :desc="['列表滚动到底部触发一次 `reachBottom`，滚离后再触底会再次触发。', '脚部插槽展示「加载中 / 已全部加载」，分页状态由业务维护。']" />

<Demo path="mentions/virtual" title="虚拟列表" :desc="['`virtual` 开启后只渲染可视窗口内的候选，2000 条也只保留十几行 DOM。', '行高按实测修正，移动端行高变化同样生效；弹层最高 320px（≤767px 时 `min(220px, 40vh)`）。']" />

<Demo path="mentions/async-paging" title="异步 + 分页 + 虚拟" :desc="['`@search` 触发远程检索（演示 300ms 防抖 + 400ms 网络延迟），`loading` 驱动「正在检索 / 加载中」状态。', '触底通过 `@reach-bottom` 取下一页并追加到 `options`；`virtual` 让 1200 条数据只渲染可视窗口内的行。', '业务侧分页用 `options` + `loading` 自行维护；`fetchOptions` 是单次替换语义，分页场景不适用。']" />

## API

### KMentions Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 文本内容 | `string` | `''` |
| options | 候选项 | `KMentionsOption[]` | `[]` |
| trigger | 触发字符 | `string` | `'@'` |
| rows | 文本域行数 | `number` | `3` |
| placeholder | 占位文本 | `string` | — |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |

| maxlength | 最大长度 | `number` | — |
| notFoundContent | 无匹配文案 | `string` | `'无匹配项'` |
| filter | 自定义过滤 | `(pattern, option) => boolean` | label/value 包含 |
| fetchOptions | 异步候选（提供后忽略 options） | `(pattern) => KMentionsOption[] \| Promise<KMentionsOption[]>` | — |
| debounce | 异步请求防抖毫秒数 | `number` | `200` |
| loading | 业务侧加载态（与内部请求合并） | `boolean` | `false` |
| virtual | 候选虚拟滚动 | `boolean` | `false` |
| render | 自定义渲染闭包 | `KRenderFn<KMentionsRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 文本变化 | `value: string` |
| select | 选中候选项 | `option: KMentionsOption` |
| search | 触发字符后的查询变化 | `pattern: string` |
| reachBottom | 候选列表滚动到底（进入底部状态时触发一次） | — |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 自定义触发器，scope `{ value, attrs, focus }`；自动识别内部 input/textarea/contenteditable |
| header | 弹层头部，固定在滚动区外 |
| footer | 弹层脚部，固定在滚动区外 |
| option | 候选内容，scope `{ option, active }` |
| render | headless 整件替换 |

## 注意事项

- 默认触发器是 KInput（`type="textarea"`），`size / status / rows` 与 KMentions 同步，外观跟随 KForm 的 `variant`（缺省 outlined）；`classNames.textarea` / `styles.textarea` 作用于 KInput 根节点。
- `#trigger` 插槽内自动探测 textarea / input / contenteditable（KInput、NInput 等封装同样适用）：取光标、写入选中的标签；contenteditable 按纯文本处理。非 DOM 编辑器（自绘富文本）不支持自动光标。
- 触发字符只有在行首、空白或 `([{` 之后才生效，避免普通邮箱地址误触发。
- 选中后插入 `trigger + label + 空格`，value 作为候选项元数据通过 `select` 事件返回。
- 弹层与输入框共享焦点；点击候选不会先触发 blur。
- 弹层宽度由内容撑开：最小 200px，最大 `100vw - 16px`，超宽标签在弹层内省略；桌面最高 320px，移动端（≤767px）限制为 `min(220px, 40vh)`。弹层内文字统一 14px（候选项、次要 value、空态、加载态与 header/footer 内容均继承），候选项上下内边距 4px、行高不低于 36px。需要固定宽度时用 `styles.popup` 覆盖。
- 异步模式下 `fetchOptions` 返回的数组直接作为候选，不再经过本地 `filter`；失败按空列表处理，过期请求（输入已变化）会被丢弃。
- `loading` 与内部请求合并：空列表时显示「加载中…」，有候选时在列表底部吸底显示加载行；不传 `loading` 时可用 `#footer` 自行展示分页状态。
- `reachBottom` 只在「进入底部状态」时触发一次；加载完新一页后需先向上滚动离开底部，再次触底才会触发。短列表（不足滚动高度）不会在打开时触发。
- `virtual` 与 `fetchOptions` 可组合；`header` / `footer` 位于滚动容器外，不计入虚拟行高。