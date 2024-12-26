<script lang="ts" setup>
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="oceanus-backdrop" />
  </Transition>
</template>

<style scoped lang="scss">
.oceanus-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--oceanus-z-backdrop);
  background: rgba(0, 0, 0, 0.6);
  transition: opacity 0.5s;

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-active {
    transition-duration: 0.25s;
  }
}

@media (width >= 1280px) {
  .press-backdrop {
    display: none;
  }
}
</style>
