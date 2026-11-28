# 接口封装 — Discuz

- **文件位置**: `packages/vue/api/discuzX/common/`
- **引入方式**: 子路径**必须带 `.ts` 扩展名**，如 `import AttachmentApi from 'kit/vue/api/discuzX/common/AttachmentApi.ts'`
- **共同点**: 全部继承 [`discuzXRequest`](/vue/foundation/http)，请求地址会拼成 `{baseUrl}?uri=a/b/c` 的形式

| 文件 | 导出 | 状态 |
| --- | --- | --- |
| `AttachmentApi.ts` | 默认导出实例（`prefix = attachment`） | 可用 |
| `DiscuzAttachmentsApi.ts` | 具名类 | **`@deprecated`** |
| `DiscuzFilesApi.ts` | 默认导出实例（`prefix = files`） | **`@deprecated`** |
| `DiscuzSettingsApi.ts` | 默认导出实例（`prefix = settings`） | 可用（被 `DiscuzSettingFormService` 使用） |

## AttachmentApi

| 方法 | 说明 |
| --- | --- |
| `uploadAttachment(file: File, body?: Record<string, string>, fileName?: string)` | 上传附件，返回 `Promise<TAttachment>`；`fileName` 默认 `"file"` |
| `getAttachment(aid: number)` | 读取附件信息，返回 `Promise<TAttachment>` |
| `deleteAttachment(aid: number \| string)` | 删除附件 |

`TAttachment`：

```ts
type TAttachment = {
  aid: number
  fileName: string
  width: number
  height: number
  isImage: boolean
  size: number
  downloadLink: string
  thumbURL: string
}
```

```ts
import AttachmentApi from 'kit/vue/api/discuzX/common/AttachmentApi.ts'

const attachment = await AttachmentApi.uploadAttachment(file)
```

## DiscuzAttachmentsApi（`@deprecated`）

具名类，需自行 `new`。除请求方法外还提供两个 **URL 生成**方法（用于 `<img>` / `<a>` 直链）：

| 方法 | 说明 |
| --- | --- |
| `uploadAttachment(file: File)` | `Promise<string>` |
| `deleteAttachment(attachId: string)` | `Promise<number>` |
| `getAttachment(attachId: string)` | `Promise<string>` |
| `genAttachmentPreviewUrl(attachId, width?, height?, radio?)` | 拼出预览直链，宽高/比例非空时追加 `w=` / `h=` / `r=` 查询参数 |
| `genAttachmentDownloadUrl(attachId)` | 拼出下载直链 |

> 两个 URL 方法基于 `this.requestUrl` 直接拼接 `` `${this.requestUrl}&uri=...` ``，因此 **`baseUrl` 里必须已经带 `?`**（如 `https://host/api?`），否则生成的地址不合法。

## DiscuzFilesApi（`@deprecated`）

| 方法 | 说明 |
| --- | --- |
| `getUploadAuth(sourceFileName, filePath, size)` | 获取上传授权，返回 `Promise<IRuyiFileAuthData>` |
| `getFileInfo(fileKey)` | 读取文件信息，返回 `Promise<IRuyiFileInfo>` |
| `uploadFile(FileKey, file, body?, fileName?)` | 上传文件，返回 `Promise<IRuyiFileInfo>` |
| `deleteFile(fileKey)` | 删除文件 |

`IRuyiFileInfo` / `IRuyiFileAuthData` 定义见 [types](/vue/types/index)。

## DiscuzSettingsApi

| 方法 | HTTP | 路径 | 说明 |
| --- | --- | --- | --- |
| `list<T>(keys: string[])` | GET | `settings?name=a,b` | 批量读取设置 |
| `saveList(KeyValues: Record<string, any>)` | PATCH | `settings`（无子路径），body 为 `KeyValues` | 批量保存 |
| `save(key: string, value: any)` | PATCH | `settings/<key>`，body `{ value }` | 保存单个键 |

```ts
import DiscuzSettingsApi from 'kit/vue/api/discuzX/common/DiscuzSettingsApi.ts'

const settings = await DiscuzSettingsApi.list<{ siteName: string }>(['siteName'])
await DiscuzSettingsApi.saveList({ siteName: '如意' })
```

---

> **相关**：[HTTP](/vue/foundation/http)、[DiscuzSettingFormService](/vue/services/discuzx-setting-form)、[api/common](/vue/api/index)
