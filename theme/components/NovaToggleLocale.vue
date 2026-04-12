<script lang="ts" setup>
import type { DropdownItem } from '../components/NovaDropdownItem.vue'
import { useLocale } from '../composables'

const { toggleLocales } = useLocale()

const locales: DropdownItem[] = [
  { label: '简体中文', onClick: () => toggleLocales('zh-CN') },
  { label: 'English', onClick: () => toggleLocales('en') },
]
</script>

<template>
  <NovaDropdownItem icon="i-ri-translate-2" class="text-icon nova-nav-toolbar-select-lang inherit" :items="locales" />
</template>
