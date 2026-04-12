import { refDebounced, useLocalStorage, useToggle, useWindowSize } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { watch } from 'vue'

export const useNovaAppStore = defineStore('nova-app', () => {
  const isSideOpenStorage = useLocalStorage('stored-is-side-open', true)
  const [isSideOpen, toggleSide] = useToggle(isSideOpenStorage.value)

  const { width } = useWindowSize()

  watch([isSideOpen, refDebounced(width, 500)], () => {
    if (width.value > 768)
      isSideOpenStorage.value = isSideOpen.value
  })

  watch(refDebounced(width, 100), (newValue) => {
    if (newValue <= 768)
      isSideOpen.value = false
    else
      isSideOpen.value = isSideOpenStorage.value
  }, { immediate: true })

  return {
    isSideOpen,
    toggleSide,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNovaAppStore, import.meta.hot))
