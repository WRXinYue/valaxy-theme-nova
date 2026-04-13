<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'
import NovaSiteLoader from './components/NovaSiteLoader.vue'
import { useLocale } from './composables'

const { lang } = useLocale()
const appStore = useAppStore()

useHead({
  meta: [
    {
      name: 'google',
      content: 'notranslate',
    },
    {
      'http-equiv': 'Content-Language',
      'content': lang,
    },
  ],
})
</script>

<template>
  <ClientOnly>
    <Transition name="nova-site-loader-fade">
      <NovaSiteLoader v-if="appStore.showLoading" />
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.nova-site-loader-fade-enter-active,
.nova-site-loader-fade-leave-active {
  transition: opacity 0.35s ease;
}

.nova-site-loader-fade-enter-from,
.nova-site-loader-fade-leave-to {
  opacity: 0;
}
</style>
