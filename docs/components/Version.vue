<script setup lang="ts">
import { version as OceanusVersion } from 'valaxy-theme-oceanus/package.json'
import { version as ValaxyVersion } from 'valaxy/package.json'

defineProps<{
  type?: 'oceanus' | 'valaxy'
}>()
</script>

<template>
  <template v-if="type === 'oceanus'">
    {{ OceanusVersion }}
  </template>
  <template v-if="type === 'valaxy'">
    {{ ValaxyVersion }}
  </template>
</template>
