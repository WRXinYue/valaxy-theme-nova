<script setup lang="ts">
import { useActiveAnchor, useOutline } from 'valaxy'
import { ref } from 'vue'

const container = ref()
const marker = ref()

useActiveAnchor(container, marker)

const { headers } = useOutline()

function handleClick(event: Event) {
  const el = event.target as HTMLAnchorElement
  const id = el.href.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id)) as HTMLElement

  heading?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div v-show="headers.length" ref="container" class="oceanus-outline">
    <div class="content">
      <div ref="marker" class="outline-marker" />

      <nav aria-labelledby="doc-outline-aria-label">
        <span id="doc-outline-aria-label" class="oceanus-visually-hidden">
          Table of Contents for current page
        </span>

        <OceanusOutlineItem class="va-toc css-i18n-toc" :headers :on-click="handleClick" root />
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-toc {
  text-align: left;
}

.content {
  position: relative;
  // padding-left: 16px;
  font-size: 14px;
  text-align: left;
}

// .outline-marker {
//   position: absolute;
//   top: 32px;
//   left: -2px;
//   z-index: 0;
//   opacity: 0;
//   width: 4px;
//   height: 18px;
//   background-color: var(--va-c-primary);
//   transition:
//     top 0.25s cubic-bezier(0, 1, 0.5, 1),
//     background-color 0.5s,
//     opacity 0.25s;
//   border-top-right-radius: 2px;
//   border-bottom-right-radius: 2px;
// }
</style>
