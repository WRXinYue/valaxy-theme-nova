<script lang="ts" setup>
import { useAppStore } from 'valaxy'

const appStore = useAppStore()
</script>

<template>
  <div class="oceanus-nav-toolbar-text text-icon" flex="~ center">
    <button type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
      <div v-if="!appStore.isDark" i-tabler-sun />
      <div v-else i-tabler-moon />
    </button>
  </div>
</template>
