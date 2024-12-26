<script setup lang="ts">
import type { MenuItem } from 'valaxy'
import { useI18n } from 'vue-i18n'

defineProps<{
  headers: MenuItem[]
  onClick: (e: MouseEvent) => void
  root?: boolean
}>()

const { locale } = useI18n()
</script>

<template>
  <ul :class="root ? 'root' : 'nested'" class="va-toc css-i18n-toc">
    <li v-for="{ children, link, title, lang } in headers" :key="link" class="va-toc-item" :lang="lang || locale">
      <RouterLink :to="link" class="outline-link" :href="link" @click="onClick">
        {{ title }}
      </RouterLink>
      <template v-if="children?.length">
        <OceanusOutlineItem :headers="children" :on-click="onClick" />
      </template>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--oceanus-c-text-deep);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 400;
  opacity: 0.8;
  transition:
    color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

  &.active {
    color: var(--va-c-primary);
    opacity: 1;
    font-weight: 500;
  }

  &:hover {
    opacity: 1;
    color: var(--oceanus-c-text-deeper);
  }

  .nested {
    padding-left: 13px;
  }
}
</style>
