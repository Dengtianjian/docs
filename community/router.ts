import { readonly, ref } from 'vue'

const path = ref(readPath())

function readPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

window.addEventListener('hashchange', () => {
  path.value = readPath()
  window.scrollTo({ top: 0 })
})

export function useRoute() {
  return readonly(path)
}

export function navigate(to: string) {
  if (path.value === to) return
  window.location.hash = to
}