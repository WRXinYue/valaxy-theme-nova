<script setup lang="ts">
import { computed } from 'vue'
import { useNovaAppStore } from '../stores'

const novaApp = useNovaAppStore()

const active = computed(() => novaApp.isSideOpen)
</script>

<template>
  <button mr-3 class="nova-side-nav-toggle" :aria-expanded="active" :class="active && 'is-active'" @click="novaApp.toggleSide()">
    <span class="toggle-wrapper inline-block" i-f7-sidebar-left />
  </button>
</template>

<style lang="scss" scoped>
.nova-side-nav-toggle {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:not(.is-active) {
    color: var(--nova-c-text-muted);
  }

  &:hover {
    background: var(--nova-c-active-bg);
  }
}
</style>
