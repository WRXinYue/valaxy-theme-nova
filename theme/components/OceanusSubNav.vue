<script lang="ts" setup>
import type { SubNavItem } from '../types'
import { useToggle } from '@vueuse/core'

defineProps<{
  title: string
  subNav: SubNavItem[]
}>()

const [isOpen, toggle] = useToggle()
</script>

<template>
  <nav class="oceanus-sub-nav oceanus-safe-padding" :class="[isOpen && 'screen-open']" w="full" role="navigation">
    <div class="oceanus-sub-nav-content oceanus-safe-padding" flex="~ col" w="full">
      <div class="oceanus-sub-nav-bg" />

      <div class="oceanus-sub-nav-content-header" flex="~ justify-between items-center" w="full">
        <div flex="~ center">
          <OceanusSideNavToggle />

          <span class="oceanus-sub-nav-title">{{ title }}</span>
        </div>

        <div class="items-center leading-5 <md:hidden">
          <template v-for="(item, i) in subNav" :key="i">
            <AppLink :to="item.link" rel="noopener" class="oceanus-link-text">
              {{ item.text }}
            </AppLink>
            <span v-if="i !== subNav.length - 1" class="mx-4" />
          </template>
        </div>

        <div class="<md:hidden" />
        <OceanusNavActions class="sub-nav-menu md:hidden!" h="full" :active="isOpen" @click="toggle()" />
      </div>

      <ul class="nav-screen-menu">
        <li v-for="(item, i) in subNav" :key="i" class="sub-nav-menu-item">
          <AppLink class="sub-nav-menu-link" :to="item.link">
            {{ item.text }}
          </AppLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.oceanus-sub-nav {
  z-index: 30;
  top: 0;
  width: 100%;
  height: auto;
  min-height: var(--oceanus-nav-height);
  transition: background-color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);

  &-title {
    color: var(--oceanus-c-text);
    font-size: 21px;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: 0.011em;
    cursor: default;
    display: block;
    white-space: nowrap;
    transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  }

  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    z-index: 1;

    &-header {
      height: var(--oceanus-nav-height);
    }
  }

  .oceanus-link-text {
    display: inline-flex;
    max-width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 3.14286;
    font-weight: 400;
    line-height: inherit;
    color: var(--oceanus-c-text);
    text-overflow: ellipsis;
    letter-spacing: 0;
    transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .nav-screen-menu {
    cursor: default;
    width: auto;
    // height: 44px;
    height: auto;
    max-height: 0;

    display: none;
    justify-content: space-between;
    user-select: none;
    overflow: hidden;
    transition:
      max-height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      visibility 0s linear 1s;

    // opacity: 0;
    // padding: 4px 24px 24px;
    // transform: translate3d(0, -150px, 0);
    // transition:
    //   transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.5s,
    //   opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;

    @media only screen and (max-width: 767px) {
      display: block;
      max-width: 664px;
      padding-inline: 40px;
      box-sizing: border-box;
      // overflow-y: auto;
      visibility: hidden;
    }

    @media only screen and (max-width: 767px) {
      visibility: visible;
      transition-delay: 0s;
    }

    > *:not(:first-child)::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #d7d7d7;
    }

    .sub-nav-menu-item {
      height: 44px;
      transition:
        opacity 0.3091s cubic-bezier(0.32, 0.08, 0.24, 1) 0.03s,
        transform 0.3455s cubic-bezier(0.32, 0.08, 0.24, 1) 0.02s;
      opacity: 0;
      transform: translate3d(0, -25px, 0);

      .sub-nav-menu-link {
        font: 400 17px / 2.4 var(--oceanus-font);
        color: var(--oceanus-c-text);
      }
    }
  }

  &.screen-open {
    .oceanus-sub-nav-content {
      height: auto;
    }

    .nav-screen-menu {
      max-height: calc(100vh - var(--oceanus-nav-height));

      // opacity: 1;
      // transform: translate3d(0, 0, 0);
      // transition-delay: 0.2s, 0.4s;
    }

    .sub-nav-menu-item {
      opacity: 0.88;
      transform: translate3d(0, 0, 0);
    }
  }

  &.screen-open {
    .nav-screen-menu {
      @for $i from 1 through 20 {
        > *:nth-child(#{$i}) {
          transition-delay: calc($i * 0.07s);
        }
      }
    }
  }
}

.oceanus-sub-nav-bg {
  z-index: -1;
  background: var(--oceanus-c-sub-nav-bg);
  backdrop-filter: saturate(180%) blur(20px);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);

  &::after {
    content: '';
    background-color: var(--oceanus-c-border-line);
    width: 100%;
    position: absolute;
    top: 100%;
    height: 1px;
  }
}
</style>
