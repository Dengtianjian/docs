# KUser 用户信息

> 共同约定见 [共同约定](./index.md)。P8 增强件。头像、姓名、描述与在线状态的组合展示。

## 何时使用

- 顶部账号入口、成员列表、评论区作者信息；
- 需要在头像角标展示在线 / 忙碌 / 离开状态；
- 横向列表或纵向卡片式成员展示。

## 代码演示

<Demo path="user/basic" title="基础用户信息" :desc="['`avatar-text` 在没有图片时作为头像文字。', '`status` 渲染头像角标。', '`clickable` 提供按钮语义、键盘 Enter / Space 与 hover 反馈。']" />

<Demo path="user/vertical" title="纵向成员卡" :desc="['`orientation=&quot;vertical&quot;` 头像在上、信息在下。', '`size` 同时控制头像与文字档位。', '可组合 `KFlex` 做成员墙。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 姓名 | `string` | — |
| description | 描述 / 职位 | `string` | — |
| avatar | 头像图片地址 | `string` | — |
| avatarText | 头像文字 | `string` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | `'md'` |
| orientation | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| status | 在线状态 | `'online' \| 'offline' \| 'busy' \| 'away'` | — |
| clickable | 可点击 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| ariaLabel | 无障碍名称 | `string` | `name` |
| classNames / styles | 部件：`root / avatar / status / body / name / description` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| avatar | 替换头像区域 |
| name | 替换姓名 |
| description | 替换描述 |
| default | 追加到信息区底部 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击或键盘激活 | `MouseEvent \| KeyboardEvent` |

### 部件

`root` 根节点；`avatar` 头像容器；`status` 状态点；`body` 信息区；`name` 姓名；`description` 描述。