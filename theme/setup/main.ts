import Lenis from 'lenis'
import { defineAppSetup } from 'valaxy'
import { ref } from 'vue'

export default defineAppSetup((ctx) => {
  const { router, isClient } = ctx

  if (!isClient)
    return

  const lenisRef = ref<Lenis>()

  function raf(time: any) {
    lenisRef.value!.raf(time)
    requestAnimationFrame(raf)
  }

  function initLenis() {
    lenisRef.value = new Lenis({ lerp: 0.4 })

    requestAnimationFrame(raf)
  }

  router.isReady().then(() => {
    initLenis()

    // TODO: rtl
    document.documentElement.setAttribute('dir', 'ltr')
  })
})
