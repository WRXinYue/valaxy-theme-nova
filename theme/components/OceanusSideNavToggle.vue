<script setup lang="ts">
import { computed } from 'vue'
import { useOceanusAppStore } from '../stores'

const oceanusApp = useOceanusAppStore()

const active = computed(() => oceanusApp.isSideOpen)
</script>

<template>
  <button mr-3 class="oceanus-side-nav-toggle" :aria-expanded="active" :class="active && 'is-active'" @click="oceanusApp.toggleSide()">
    <span class="toggle-wrapper inline-block" i-f7-sidebar-left />
  </button>
</template>

<style lang="scss" scoped>
.oceanus-side-nav-toggle {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:not(.is-active) {
    color: var(--oceanus-c-text-muted);
  }

  &:hover {
    background: #fcf8ff;
  }
}
</style>
