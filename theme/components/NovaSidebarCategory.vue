<script lang="ts" setup>
import type { Category, Post } from 'valaxy'
import { isCategoryList } from 'valaxy'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  // to eliminate the warning
  category: Category
  level?: number
  displayCategory?: (category: string) => void

  /**
   * collapse children
   */
  collapsable?: boolean
}>(), {
  collapsable: true,
})

const collapsable = ref(props.collapsable)
const { t, locale } = useI18n()

function getTitle(post: Post | any) {
  const lang = locale.value
  const localeTitle = post[`title_${lang}`] || post[`title_${lang.split('-')[0]}`]
  return localeTitle || post.title
}
</script>

<template>
  <li v-if="category.total" w="full" p="x-4px" class="nova-sidebar-category inline-flex items-center justify-between" tabindex="0">
    <span font="bold" m="l-1" @click="displayCategory ? displayCategory(category.name) : null">
      {{ category.name === 'Uncategorized' ? t('category.uncategorized') : t(`category.${category.name}`) }}
    </span>
    <button
      tabindex="0" role="button" aria-label="toggle section"
      class="folder-action caret inline-flex cursor-pointer"
      @click="collapsable = !collapsable"
    >
      <div class="i-tabler-chevron-down h-5 w-5" :class="collapsable ? 'angle-down' : 'angle-right'" />
    </button>
  </li>

  <ul v-show="!collapsable" class="nova-sidebar-section">
    <li v-for="categoryItem, i in category.children.values()" :key="i" class="nova-sidebar-item">
      <template v-if="!isCategoryList(categoryItem)">
        <RouterLink v-if="categoryItem.title" :to="categoryItem.path || ''" class="nova-text nova-sidebar-item-link" active-class="active" :title="getTitle(categoryItem)">
          <span i-tabler-file-description class="nova-list-symbol mr-2 inline-block" />
          <span class="truncate">{{ getTitle(categoryItem) }}</span>
        </RouterLink>
      </template>

      <NovaSidebarCategory v-else :category="categoryItem" :display-category="displayCategory" :collapsable="collapsable" />
    </li>
  </ul>
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

.nova-list-symbol {
  color: hsla(0, 0%, 40%, 1);
}
</style>
