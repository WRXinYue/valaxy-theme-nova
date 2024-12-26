<script lang="ts" setup>
import type { CategoryList } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  categories: CategoryList
  item: string
}>()

const category = computed(() => {
  return props.categories.children.get(props.item)
})
</script>

<template>
  <OceanusSidebarCategory v-if="category" :category :collapsable="false" />
</template>
