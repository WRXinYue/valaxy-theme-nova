<script setup lang="ts">
import type { NavTools } from '../types'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    navTools: NavTools
    /** 全屏菜单等场景：顶部已有搜索框时不再渲染 search 占位 */
    hideSearch?: boolean
    /** `screen`：全屏菜单底部工具条（大触摸目标、语言用内联切换） */
    variant?: 'toolbar' | 'screen'
  }>(),
  {
    hideSearch: false,
    variant: 'toolbar',
  },
)

const rows = computed(() => {
  const raw = props.navTools
  if (!props.hideSearch)
    return raw
  return raw
    .map(row => row.filter(t => t !== 'search'))
    .filter(row => row.length > 0)
})
</script>

<template>
  <div v-for="(tools, i) in rows" :key="i" flex="~ center" :class="variant === 'screen' && 'nova-nav-tools--screen'">
    <template v-for="(tool, j) in tools" :key="j">
      <NovaToggleLocale v-if="tool === 'toggleLocale'" :variant="variant === 'screen' ? 'inline' : 'dropdown'" />
      <NovaToggleTheme v-if="tool === 'toggleTheme'" :large-touch="variant === 'screen'" />
      <div v-if="tool === 'search'" class="text-icon cursor-not-allowed">
        <div i-tabler-search items-center />
      </div>

      <template v-if="typeof tool === 'object'">
        <AppLink class="text-icon nova-nav-toolbar-text" :class="variant === 'screen' && 'nova-nav-tools__link-screen'" :to="tool?.link">
          <div :class="tool.icon" />
        </AppLink>
      </template>
    </template>
    <div v-if="i !== rows.length - 1" class="text-icon text-b" />
  </div>
</template>

<style scoped>
.nova-nav-tools--screen {
  gap: 4px;
}

.nova-nav-tools__link-screen {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
