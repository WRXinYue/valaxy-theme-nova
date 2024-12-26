<script setup lang="ts">
import { useBack } from 'valaxy'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { back } = useBack()
</script>

<template>
  <Layout>
    <main class="va-main h-screen w-full" text="center" flex="~ col" justify="center" items="center">
      <div class="not-found" title="404" font="mono">
        404
      </div>

      <RouterView />

      <div>
        <button class="btn rounded-full" p="x-6 y-2" text="sm" m="3 t8" :title="t('button.back')" @click="back">
          {{ t('button.back') }}
        </button>
      </div>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
// inspired by https://codepen.io/pgalor/pen/OeRWJQ
.not-found {
  font-size: 10rem;
  text-shadow:
    0 5px 10px rgba(0, 0, 0, 0.25),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
