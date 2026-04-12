<script setup lang="ts">
import { version as NovaVersion } from 'valaxy-theme-nova/package.json'
import { version as ValaxyVersion } from 'valaxy/package.json'

defineProps<{
  type?: 'nova' | 'valaxy'
}>()
</script>

<template>
  <template v-if="type === 'nova'">
    {{ NovaVersion }}
  </template>
  <template v-if="type === 'valaxy'">
    {{ ValaxyVersion }}
  </template>
</template>
