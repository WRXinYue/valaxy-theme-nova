<script lang="ts" setup>
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button
    flex="~ center"
    class="mobile-btn oceanus-nav-menu" :class="active ? 'mobile-btn-open' : ''" aria-label="mobile navigation" :aria-expanded="active"
  >
    <span class="nav-menu-bread nav-menu-bread-top">
      <span class="nav-menu-bread-crust nav-menu-bread-crust-top" :class="active ? 'bg-$oceanus-c-text-deeper' : 'bg-$oceanus-c-text-deeper'" />
    </span>

    <span class="nav-menu-bread nav-menu-bread-bottom">
      <span class="nav-menu-bread-crust nav-menu-bread-crust-bottom" :class="active ? 'bg-$oceanus-c-text-deeper' : 'bg-$oceanus-c-text-deeper'" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.mobile-btn {
  position: relative;
  width: 30px;
  height: 30px;

  .nav-menu-bread {
    position: absolute;
    z-index: 3;
    width: 17px;
    height: 1px;

    transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);

    &-crust {
      position: absolute;
      inset: 0;
      border-radius: 0.5px;
      transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
      z-index: 1;

      &-top {
        transform: translateY(-3px);
      }
      &-bottom {
        transform: translateY(3px);
      }
    }
  }

  &.mobile-btn-open .nav-menu-bread {
    transition: transform 0.3192s cubic-bezier(0.04, 0.04, 0.12, 0.96) 0.1008s;

    &-top {
      transform: rotate(45deg);
    }
    &-bottom {
      transform: rotate(-45deg);
    }

    &-crust {
      transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);

      &-top {
        transform: none;
      }
      &-bottom {
        transform: none;
      }
    }
  }
}
</style>
