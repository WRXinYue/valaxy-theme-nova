<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="flex items-center justify-between overflow-hidden border-1 border-black rounded-xl" style="box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);">
    <span class="px-2">
      WRXinYue
    </span>
    <img
      class="inline-block"
      style="width: 40px; height: 40px"
      alt="logo"
      :src="siteConfig.author.avatar"
    >
  </div>
</template>
