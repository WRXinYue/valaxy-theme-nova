<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter<{features: Features}>()

export type Features = Partial<{
  title: string
  subtitle: string
  text: string

  cards: Partial<{
    num: string
    title: string
    icon: string
    details: string
  }[]>
}>
</script>

<template>
  <section v-if="fm?.features" class="oceanus-section" p="b-100px">
    <div class="oceanus-home-container">
      <span class="oceanus-frame" />

      <div p="t-50px" flex="~ justify-between">
        <div>
          <h3 class="subtitle">
            {{ fm.features?.subtitle }}
          </h3>
          <h2 class="title">
            <span>{{ fm.features?.title }}</span>
          </h2>
          <div class="text">
            <p>
              {{ fm.features?.text }}
            </p>
          </div>
        </div>
      </div>

      <div m="t-65px">
        <ul class="flex-wrap md:flex">
          <li v-for="(card, i) in fm.features?.cards" :key="i" class="overflow-hidden" flex="~ [0_0_33%] items-center justify-center">
            <div h="full" flex="~ col grow-1">
              <div class="overflow-hidden transition-padding-400 <md:hover:cursor-pointer <md:hover:p-14px" flex="~ col grow-1">
                <div h="full" w="full" p="41px" m="2 md:3" class="rounded-41px bg-$oceanus-c-card-bg transition-padding-400">
                  <div v-if="card?.icon || card?.num" class="transition-margin-400" m="b-85px md:b-75px" flex="~ items-center justify-between">
                    <span class="inline-block" w="41px" h="41px" :class="card?.icon" />
                    <span class="text-$oceanus-c-text-muted" style="font: 600 18px / 1 var(--oceanus-font)">
                      {{ card?.num }}
                    </span>
                  </div>
                  <h3 class="text-$oceanus-c-text-deep <md:font-size-[18px]" style="font: 700 28px / 1.2 var(--oceanus-font)">
                    {{ card?.title }}
                  </h3>
                  <p class="text-$oceanus-c-text-muted" m="t-20px" style="font: 500 20.5px / 1.2 var(--oceanus-font)">
                    {{ card?.details }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
