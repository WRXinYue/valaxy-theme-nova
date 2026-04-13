<script lang="ts" setup>
import { useAppStore } from 'valaxy'

withDefaults(
  defineProps<{
    /** 全屏菜单等：≥44px 触摸目标 */
    largeTouch?: boolean
  }>(),
  { largeTouch: false },
)

const appStore = useAppStore()
</script>

<template>
  <div
    class="nova-nav-toolbar-text text-icon"
    flex="~ center"
    :class="largeTouch && 'nova-toggle-theme--touch'"
  >
    <button type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
      <div v-if="!appStore.isDark" i-tabler-sun />
      <div v-else i-tabler-moon />
    </button>
  </div>
</template>

<style scoped>
.nova-toggle-theme--touch button {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: var(--nova-c-text);
  background: transparent;
  border: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s ease;
}

.nova-toggle-theme--touch button:focus,
.nova-toggle-theme--touch button:focus-visible,
.nova-toggle-theme--touch button:active {
  outline: none;
  box-shadow: none;
}

.nova-toggle-theme--touch button:active {
  opacity: 0.88;
}
</style>
