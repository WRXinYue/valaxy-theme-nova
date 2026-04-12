<script setup lang="ts">
import type { NavTools } from '../types'

defineProps<{
  navTools: NavTools
}>()
</script>

<template>
  <div v-for="(tools, i) in navTools" :key="i" flex="~ center">
    <template v-for="(tool, j) in tools" :key="j">
      <NovaToggleLocale v-if="tool === 'toggleLocale'" />
      <NovaToggleTheme v-if="tool === 'toggleTheme'" />
      <div v-if="tool === 'search'" class="text-icon cursor-not-allowed">
        <!-- TODO: -->
        <div i-tabler-search items-center />
      </div>

      <template v-if="typeof tool === 'object'">
        <AppLink class="text-icon nova-nav-toolbar-text" :to="tool?.link">
          <div :class="tool.icon" />
        </AppLink>
      </template>
    </template>
    <div v-if="i !== navTools.length - 1" class="text-icon text-b" />
  </div>
</template>
