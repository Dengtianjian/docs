import type { KUploadUpload } from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'

/**
 * 演示用 mock 上传：阶梯进度 + 可配置首次失败 + 成功回传本地对象 URL。
 * KUpload 自身不发请求，upload 全权接管（真实项目里换 fetch/axios 即可）。
 */
export function createMockRequest(opts: {
  failOnce?: Set<string>
  stepMs?: number
  respond?: (file: File) => unknown
} = {}): KUploadUpload {
  return ({ file, signal, onProgress, onSuccess, onError }) => {
    let pct = 0
    const timer = setInterval(() => {
      if (signal.aborted) return
      pct = Math.min(100, pct + 25)
      onProgress(pct)
      if (pct < 100) return
      clearInterval(timer)
      if (opts.failOnce?.delete(file.name)) {
        onError(new Error(`mock 网络错误：${file.name}`))
        return
      }
      onSuccess(opts.respond ? opts.respond(file) : { url: URL.createObjectURL(file) })
    }, opts.stepMs ?? 180)
    return {
      abort() {
        clearInterval(timer)
      },
    }
  }
}

/** 演示用内联 SVG 图片（不依赖网络） */
export function svgImage(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="320" height="200" fill="${color}"/><text x="160" y="112" font-size="30" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}