<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface DropdownItem {
  label: string
  link?: string
  onClick?: () => void
}

defineProps<{
  text?: string
  icon?: string
  locale?: string | number
  items: DropdownItem[]
}>()

const open = ref(false)

const { t } = useI18n()

function closeMenu() {
  open.value = false
}

function activateItem(item: DropdownItem) {
  item.onClick?.()
  closeMenu()
}

function onRowClick(item: DropdownItem) {
  if (item.link)
    return
  activateItem(item)
}
</script>

<template>
  <div
    class="group relative flex"
    h="full"
    :aria-expanded="open"
    aria-haspopup="true"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="button flex items-center bg-transparent"
      h="full"
      @click="open = !open"
    >
      <div v-if="icon" :class="icon" />
      <div v-else>
        <span v-if="text" class="text">
          {{ text }}
        </span>
        <span v-if="locale" class="text">
          {{ t(locale) }}
        </span>
        <div i-ri-arrow-drop-down-line />
      </div>
    </button>

    <div class="menu grow" flex="~ col" items="start">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="menu-item"
        p="x-3"
        role="button"
        tabindex="0"
        @click="onRowClick(item)"
        @keydown.enter.prevent="onRowClick(item)"
        @keydown.space.prevent="onRowClick(item)"
      >
        <a v-if="item.link" :href="item.link" @click.stop="closeMenu">
          {{ item.label.includes('.') ? t(item.label) : item.label }}
        </a>
        <span v-else>
          {{ item.label.includes('.') ? t(item.label) : item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group .button {
  color: var(--pr-nav-text);
  font-weight: 500;
  font-size: 14px;
}

.group[aria-expanded='true'] .button {
  color: hsla(0, 0%, 24%, 0.7);
  transition: color 0.25s;

  .dark & {
    color: hsla(0, 0%, 92%, 0.6);
  }
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 128px;
  max-height: min(70vh, 22rem);
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.25s,
    visibility 0.25s,
    transform 0.25s;
  transform: translateX(-50%) translateY(calc(var(--pr-nav-height) / 2));
  border-radius: 12px;
  padding: 12px;
  border: 1px solid hsla(0, 0%, 24%, 0.12);
  background-color: hsla(0, 0%, 100%, 1);
  box-shadow:
    0 12px 32px hsla(0, 0%, 0%, 0.1),
    0 2px 6px hsla(0, 0%, 0%, 0.08);

  .dark & {
    background-color: hsla(0, 0%, 14%, 1);
  }

  &-item {
    display: flex;
    width: 100%;
    cursor: pointer;
    border-radius: 6px;
    color: var(--pr-nav-text);
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    transition:
      background-color 0.25s,
      color 0.25s;

    &:hover {
      background-color: hsla(0, 0%, 95%, 1);
      color: var(--va-c-brand);

      .dark & {
        background-color: hsla(0, 0%, 18%, 1);
      }
    }
  }
}

.group[aria-expanded='true'] > .menu {
  opacity: 1;
  visibility: visible;
}
</style>
