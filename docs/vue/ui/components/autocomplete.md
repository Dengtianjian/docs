# KAutoComplete 自动完成

> 共同约定见 [共同约定](./index.md)。表单补充批。自由文本输入 + 建议列表，支持本地过滤与异步请求。

## 何时使用

- 搜索框、地址/城市输入、命令面板；
- 用户可自由输入，也可从建议中快速选择。

## 代码演示

<Demo path="autocomplete/local" title="本地建议" :desc="['输入即按 label/value 过滤本地 options。', '`trigger-on-focus` 聚焦时展示全部建议。', '支持清空与键盘上下选择。']" />

<Demo path="autocomplete/async" title="异步建议" :desc="['`fetch-suggestions` 返回数组或 Promise。', '`debounce` 控制请求节流，`min-length` 控制最小查询长度。', '过期请求结果会被丢弃；请求失败时展示空列表。']" />

<Demo path="autocomplete/variants" title="外观变体" :desc="['`variant` 四档：outlined 带框 / filled 灰底无框 / borderless 全透明 / underlined 仅底部边框（hover / 聚焦只变底线颜色，不出聚焦圈）。']" />

## API

### KAutoComplete Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入值 | `string` | `''` |
| options | 本地建议 | `KAutoCompleteOption[]` | `[]` |
| fetchSuggestions | 异步建议 | `(query) => Option[] \| Promise<Option[]>` | — |
| debounce | 异步节流（ms） | `number` | `200` |
| minLength | 触发搜索的最小长度 | `number` | `0` |
| triggerOnFocus | 聚焦即搜索 | `boolean` | `false` |
| allowClear | 显示清除按钮 | `boolean` | `true` |
| placeholder | 占位文本 | `string` | — |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 外观 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 跟随 KForm（缺省 `'outlined'`） |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| notFoundContent | 无结果文案 | `string` | `'无匹配项'` |
| render | 自定义渲染闭包 | `KRenderFn<KAutoCompleteRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 输入变化 | `value: string` |
| search | 触发一次搜索 | `query: string` |
| select | 选中建议 | `option: KAutoCompleteOption` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix / suffix | 输入框前后缀 |
| option | 建议项内容，scope `{ option, active }` |
| render | headless 整件替换 |

## 注意事项

- 异步模式只采用最后一次请求的结果；请求失败会清空建议，不抛出到页面。
- 选中建议会把 `option.value` 写回 model；如果业务需要展示 label，请自行映射。
- `minLength` 未满足时关闭弹层，不触发 `fetchSuggestions`。