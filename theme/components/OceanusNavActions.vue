<script lang="ts" setup>
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button class="nav-actions" :aria-expanded="active" aria-label="" :class="active && 'active'">
    <div class="actions-chevron" />
  </button>
</template>

<style lang="scss" scoped>
.nav-actions {
  width: 30px;
  height: 30px;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;

  .actions-chevron {
    position: relative;
    transition:
      transform 1s cubic-bezier(0.86, 0, 0.07, 1),
      transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 11px;
      height: 1px;
      z-index: 1;
      transition:
        transform 1s cubic-bezier(0.86, 0, 0.07, 1),
        transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);

      background: #000;

      border-radius: 0 0.5px 0.5px 0;
    }

    &::before {
      transform-origin: 100% 100%;
      transform: rotate(40deg) scaleY(1.1);

      right: 50%;
    }

    &::after {
      transform-origin: 0% 100%;
      transform: rotate(-40deg) scaleY(1.1);

      left: 50%;
    }
  }

  &.active {
    .actions-chevron {
      &::before {
        transform-origin: 100% 0%;
        transform: rotate(-40deg) scaleY(1.1);
      }
      &::after {
        transform-origin: 0% 0%;
        transform: rotate(40deg) scaleY(1.1);
      }
    }
  }
}
</style>
