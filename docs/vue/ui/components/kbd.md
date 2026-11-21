# KKbd 键帽

> 共同约定见 [共同约定](./index.md)。P8 增强件。以键帽样式展示快捷键，支持组合键拆分与平台修饰键映射。

## 何时使用

- 命令面板、工具栏或空态中提示快捷键；
- 文档中标注 `⌘ / Ctrl + K` 这类组合操作；
- 需要在不同平台自动切换修饰键文案。

## 代码演示

<Demo path="kbd/basic" title="基础组合键" :desc="['`value` 按 `+` 拆分，逐键渲染。', '`mod` 自动映射为 Mac 的 ⌘ 或其他平台的 Ctrl。', '`Esc / Enter / 方向键` 等有内置符号。']" />

<Demo path="kbd/variants" title="尺寸、变体与禁用" :desc="['尺寸 `sm / md / lg`。', '变体 `outline / filled / ghost`。', '`disabled` 只降低视觉权重，不改变语义。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 组合键字符串，按 `+` 拆分 | `string` | — |
| keys | 直接给出按键数组，优先级高于 `value` | `string[]` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 变体 | `'outline' \| 'filled' \| 'ghost'` | `'outline'` |
| separator | 键之间分隔符 | `string` | `'+'` |
| disabled | 禁用视觉 | `boolean` | `false` |
| ariaLabel | 无障碍名称 | `string` | 由按键自动拼接 |
| classNames / styles | 部件：`root / key / separator` | — | — |

### 修饰键映射

| 写法 | Mac | 其他平台 |
| --- | --- | --- |
| `mod` | ⌘ | Ctrl |
| `alt` / `option` | ⌥ | Alt |
| `shift` | ⇧ | Shift |
| `enter` | ↵ | ↵ |
| `esc` | Esc | Esc |
| `backspace` | ⌫ | ⌫ |

### 部件

| 部件 | 说明 |
| --- | --- |
| root | 键盘组合容器，带 `role="group"` 与组合键 `aria-label` |
| key | 单个 `<kbd>` 键帽 |
| separator | 键间分隔符，`aria-hidden` |