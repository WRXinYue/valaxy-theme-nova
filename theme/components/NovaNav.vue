<script lang="ts" setup>
import type { NavItem } from '../types'
import { useToggle } from '@vueuse/core'
import { useNavItemLabel, useThemeConfig } from '../composables'

defineProps<{
  nav: NavItem[]
  title: string | boolean
  favicon?: string
}>()

const themeConfig = useThemeConfig()
const navLabel = useNavItemLabel()

const [isOpen, toggle] = useToggle(false)
</script>

<template>
  <nav class="nova-nav" w="full" role="navigation" :class="[isOpen && 'screen-open']">
    <div class="nav-content" flex="~ items-center">
      <div class="nova-safe-padding nav-content-header" flex="~ center md:justify-between">
        <NovaNavMenu class="nav-menu left-2 z-50 absolute! md:hidden" h="full" :active="isOpen" @click="toggle()" />

        <AppLink to="/" :aria-label="title" class="nova-nav-brand h-36px text-center" flex="~ items-center">
          <img v-if="favicon" class="nova-nav-icon mr-2 h-full object-cover text-xl" alt="logo" :src="favicon">
          <span v-if="title" class="nova-text nova-nav-title text-xl md:inline" flex="~ center">{{ title }}</span>
        </AppLink>

        <div class="items-center leading-5 <md:hidden">
          <template v-for="(item, i) in nav" :key="i">
            <AppLink
              :to="item.link"
              rel="noopener"
              class="nova-link-text"
            >
              {{ navLabel(item) }}
            </AppLink>
            <span v-if="i !== nav.length - 1" class="mx-4" />
          </template>
        </div>

        <slot name="toolbar">
          <div flex="~ center" class="nova-nav-toolbar <md:hidden">
            <NovaNavTools :nav-tools="themeConfig.navTools" />
          </div>
        </slot>
      </div>

      <div class="search-placeholder-container absolute" w="full">
        <form role="search" class="search-from" flex="~ center">
          <!-- <label class="docsearch-input" /> -->
          <label id="docsearch-label" i-tabler-search m="2" />
          <input id="docsearch-input" class="nav-searchform-input" type="text" name="search" aria-label="Search" placeholder="Search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-owns="quicklinks suggestions">
          <span class="search-placeholder">Search</span>
        </form>
      </div>

      <div class="nav-screen-menu">
        <ul class="nav-screen-menu__links">
          <li v-for="(item, i) in nav" :key="i" class="nav-menu-item">
            <AppLink
              :id="i === 0 ? 'ac-gn-firstfocus' : undefined"
              class="nav-menu-link"
              :to="item.link"
            >
              {{ navLabel(item) }}
            </AppLink>
          </li>
        </ul>
        <div class="nav-screen-menu__toolbar">
          <slot name="toolbar-screen">
            <NovaNavTools hide-search variant="screen" :nav-tools="themeConfig.navTools" />
          </slot>
        </div>
      </div>
    </div>

    <div class="nav-placeholder" />
  </nav>
</template>

<style lang="scss" scoped>
.nova-nav {
  // Do not remove, fixed layout
  top: 0;
  height: var(--nova-nav-height);
  z-index: 40;
  // Keep consistent with nav-content height transition
  transition: height 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);

  .nav-placeholder {
    height: var(--nova-nav-height);
  }

  .nav-content {
    // box-shadow: 0px 5px 10px hsla(0, 0%, 0%, 0.135);
    border-bottom: 1px solid var(--nova-c-border-line);
    background: var(--nova-c-nav-bg);
    backdrop-filter: saturate(180%) blur(20px);
    transition:
      background 0.36s cubic-bezier(0.32, 0.08, 0.24, 1),
      height 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 500;
    margin: 0;
    width: 100%;
    // min-width: 1024px;
    // height: 48px;
    height: var(--nova-nav-height);
    // max-height: 44px;
    // background: hsla(0, 0%, 18%, 0.98);
    font-size: 17px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    @media only screen and (max-width: 767px) {
      overflow-y: hidden;
    }

    &-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--nova-nav-height);
    }
  }

  &-title {
    font: 700 20px/1.4 var(--nova-font);
    display: inline-flex;
    max-width: 100%;

    height: 100%;
    transition:
      opacity 0.22s ease,
      filter 0.28s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .nav-content-header :deep(a.nova-nav-brand:hover) &-title,
  .nav-content-header :deep(a.nova-nav-brand:focus-visible) &-title {
    color: transparent;
    background: linear-gradient(180deg, var(--va-c-primary-light) 0%, var(--va-c-primary) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px color-mix(in srgb, var(--va-c-primary) 42%, transparent));
  }

  .nova-link-text {
    display: inline-flex;
    max-width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 400;
    line-height: 3.14286;
    color: var(--nova-c-text);
    text-overflow: ellipsis;
    letter-spacing: 0;
    transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .search-placeholder-container {
    display: none;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background: hsla(240, 2%, 27%, 1);
      position: absolute;
      z-index: 2;
      right: 0;
      bottom: 0;
      left: 0;
      // opacity: 0;
      background-color: hsla(0, 0%, 84%, 1);
      transition:
        opacity 0.31s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.03s,
        transform 0.34s cubic-bezier(0.32, 0.08, 0.24, 1) 0.02s;
    }

    @media only screen and (max-width: 767px) {
      display: block;
      position: absolute;
      // z-index: 4;
      top: var(--nova-nav-height);
      // right: 0;
      // bottom: 0;
      // left: 0;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      height: 3.11765em;
      // background: 0 0;
      // visibility: hidden;
      transition:
        background 0.44s cubic-bezier(0.52, 0.16, 0.24, 1) 0.1s,
        visibility 0s linear 0.5s;
    }

    .search-from {
      position: relative;
      display: flex;
      background-color: hsla(0, 0%, 84%, 1);
      // opacity: 0.8;
      border-radius: 8px;
      height: 2.11765em;
    }

    .search-placeholder {
      font: 400 17px / 1.2 var(--nova-font);
      letter-spacing: -0.022em;
      opacity: 0;
    }

    .nav-searchform-input {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font: 400 17px / 1.2 var(--nova-font);
      background: transparent;
      // color: hsla(0, 0%, 100%, 1);
      outline: none;
      appearance: none;
      // height: 44px;
      width: 100%;
      color: hsla(0, 0%, 20%, 1);
    }
  }

  .nav-screen-menu {
    cursor: default;
    margin: 0 -10px;
    width: auto;
    height: 44px;
    display: none;
    justify-content: space-between;
    user-select: none;

    @media only screen and (max-width: 767px) {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 1;
      top: calc(var(--nova-nav-height) + 3.52941em);
      right: 0;
      bottom: 0;
      left: 0;
      max-width: 664px;
      margin: 0 auto;
      padding-inline: 40px;
      height: auto;
      box-sizing: border-box;
      overflow: hidden;
      visibility: hidden;
      transition: visibility 0s linear 1s;
    }

    @media only screen and (max-width: 767px) {
      visibility: visible;
      transition-delay: 0s;
    }

    &__links {
      margin: 0;
      padding: 0;
      list-style: none;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      > li:not(:first-child)::before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: hsla(0, 0%, 84%, 1);
      }
    }

    &__toolbar {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 14px 8px calc(14px + env(safe-area-inset-bottom, 0));
      border-top: 1px solid var(--nova-c-border-line);
      box-sizing: border-box;
    }

    .nav-menu-item {
      height: 44px;

      .nav-menu-link {
        font: 400 17px / 2.4 var(--nova-font);
        color: var(--nova-c-text);
      }
    }
  }

  &.screen-open {
    height: 100%;

    .nav-screen-menu {
      @for $i from 1 through 20 {
        .nav-screen-menu__links > li:nth-child(#{$i}) {
          transition:
            opacity calc(0.3091s + ($i - 1) * 0.02034s) cubic-bezier(0.32, 0.08, 0.24, 1) calc($i * 0.03s + 0.02s),
            transform calc(0.3455s + ($i - 1) * 0.02034s) cubic-bezier(0.32, 0.08, 0.24, 1) calc($i * 0.02s + 0.02s);
        }
      }
    }

    .nav-menu-item {
      opacity: 0.88;
      transform: translate3d(0, 0, 0);
    }

    .nav-content {
      @media only screen and (max-width: 767px) {
        height: 100%;
        background: var(--nova-c-bg-design);
      }
    }

    .search-placeholder-container {
      @media only screen and (max-width: 767px) {
        // visibility: visible;
        transition:
          background 0.18s cubic-bezier(0.32, 0.08, 0.24, 1) 0.18s,
          visibility 0s linear 0s;
      }
    }
  }

  &:not(.screen-open) .nav-screen-menu {
    .nav-screen-menu__links .nav-menu-item {
      opacity: 0;
      pointer-events: none;
      transform: translate3d(0, -25px, 0);
    }

    .nav-screen-menu__toolbar {
      opacity: 0;
      pointer-events: none;
      transform: translate3d(0, 12px, 0);
    }

    @for $i from 1 through 20 {
      .nav-screen-menu__links > li:nth-child(#{$i}) {
        transition:
          opacity calc(($i * -0.015s) + 0.3345s) cubic-bezier(0.52, 0.16, 0.52, 0.84) calc(($i * -0.01714s) + 0.15s),
          transform
            calc(($i * -0.0064s) + 0.4669s)
            cubic-bezier(0.52, 0.16, 0.52, 0.84)
            calc(($i * -0.01114s) + 0.108s);
      }
    }
  }

  &:has(.screen-open) .nav-screen-menu {
    .nav-screen-menu__links .nav-menu-item {
      opacity: 0.88;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
    }

    .nav-screen-menu__toolbar {
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
      transition:
        opacity 0.32s cubic-bezier(0.32, 0.08, 0.24, 1) 0.12s,
        transform 0.34s cubic-bezier(0.32, 0.08, 0.24, 1) 0.1s;
    }
  }
}
</style>
