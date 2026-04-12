<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useAppStore } from 'valaxy'
import { useLocale } from './composables'
import OceanusSiteLoader from './components/OceanusSiteLoader.vue'

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
    <Transition name="oceanus-site-loader-fade">
      <OceanusSiteLoader v-if="appStore.showLoading" />
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.oceanus-site-loader-fade-enter-active,
.oceanus-site-loader-fade-leave-active {
  transition: opacity 0.35s ease;
}

.oceanus-site-loader-fade-enter-from,
.oceanus-site-loader-fade-leave-to {
  opacity: 0;
}
</style>
