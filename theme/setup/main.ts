import { defineAppSetup } from 'valaxy'

export default defineAppSetup((ctx) => {
  const { router, isClient } = ctx

  if (!isClient)
    return

  router.isReady().then(() => {
    // TODO: rtl
    document.documentElement.setAttribute('dir', 'ltr')
  })
})
