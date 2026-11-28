# KColorPicker 颜色选择

> 共同约定见 [共同约定](./index.md)。表单补充批。支持 hex / rgb / hsl 输出、透明度、预设色与文本输入。

## 何时使用

- 主题色、标签色、图表系列色等颜色配置；
- 需要可视化取色，同时允许直接粘贴色值。

## 代码演示

<Demo path="colorpicker/basic" title="基础 / 透明度 / 格式" :desc="['默认输出 hex；`format=&quot;rgb&quot;` / `format=&quot;hsl&quot;` 切换格式。', '`alpha` 开启透明度滑块。', '`presets` 提供快捷色板，点击立即生效。']" />

## API

### KColorPicker Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 颜色字符串 | `string` | `'#1677ff'` |
| format | 输出格式 | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` |
| alpha | 启用透明度 | `boolean` | `false` |
| presets | 预设色 | `string[]` | `[]` |
| showText | 触发器显示色值 | `boolean` | `true` |
| allowClear | 允许清除 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| render | 自定义渲染闭包 | `KRenderFn<KColorPickerRenderScope>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 颜色变化 | `value: string` |
| changeComplete | 一次拖动/预设/文本提交完成 | `value: string` |
| openChange | 面板开合 | `open: boolean` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| render | headless 整件替换 |

## 注意事项

- 文本输入接受 hex、rgb(a)、hsl(a) 与 `transparent`；无法解析时恢复当前颜色。
- `format=&quot;hex&quot;` 且开启透明度时，半透明颜色输出 8 位 hex。
- 取色面板拖动时持续更新 model；拖动结束触发 `changeComplete`。
- 当前版本不包含吸管取色与色板导入。