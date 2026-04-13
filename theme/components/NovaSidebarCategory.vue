<script lang="ts" setup>
import type { Post } from 'valaxy'
import { isLocaleKey, stripLocalePrefix, tObject } from 'valaxy'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  name: string
  pages: Post[]
  level?: number
}>(), {
  level: 0,
})

const collapsed = ref(false)
const { t, locale } = useI18n()

function getTitle(post: Post | any) {
  let resolved = tObject(post.title ?? '', locale.value)
  if (typeof resolved === 'string' && isLocaleKey(resolved))
    resolved = t(stripLocalePrefix(resolved))
  return typeof resolved === 'string' ? resolved : String(resolved)
}

function formatGroupName(name: string): string {
  const key = `nova.sidebar.${name}`
  const translated = t(key)
  if (translated !== key)
    return translated
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
</script>

<template>
  <ol v-if="pages.length" class="nova-sidebar-group">
    <li
      w="full" p="x-4px" tabindex="0"
      class="nova-sidebar-category inline-flex items-center justify-between"
      :class="level === 0 ? 'nova-sidebar-category--top' : ''"
    >
      <span m="l-1">
        {{ formatGroupName(name) }}
      </span>
      <button
        tabindex="0" role="button" aria-label="toggle section"
        class="folder-action caret inline-flex cursor-pointer"
        @click="collapsed = !collapsed"
      >
        <div class="i-tabler-chevron-down h-5 w-5" :class="collapsed ? 'angle-right' : 'angle-down'" />
      </button>
    </li>

    <ul v-show="!collapsed" class="nova-sidebar-section">
      <li v-for="page in pages" :key="page.path" class="nova-sidebar-item">
        <RouterLink
          v-if="page.title"
          :to="page.path || ''"
          class="nova-text nova-sidebar-item-link"
          active-class="active"
          :title="getTitle(page)"
        >
          <span i-tabler-file-description class="nova-list-symbol mr-2 inline-block" />
          <span class="truncate">{{ getTitle(page) }}</span>
        </RouterLink>
      </li>
    </ul>
  </ol>
</template>

<style lang="scss">
.angle-right {
  transform: rotate(0deg);
}

.angle-down {
  transform: rotate(-90deg);
}

.angle-right,
.angle-down {
  transition: transform 0.15s cubic-bezier(0.9, 0, 0.2, 0);
}

.nova-sidebar-item {
  font-size: 0.875rem;

  &-link {
    padding-left: var(--nova-list-link-buffer);
    display: inline-flex;
    align-items: center;
    width: 100%;

    &:hover {
      background-color: var(--nova-c-list-hover-bg);
    }

    &.router-link-exact-active {
      background: var(--nova-c-list-active-bg);
    }
  }
}

.nova-sidebar-category--top {
  margin-top: 1.25rem;

  &:first-child {
    margin-top: 0;
  }

  > span {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--nova-c-text-muted);
  }
}

.nova-list-symbol {
  color: hsla(0, 0%, 40%, 1);
}
</style>
