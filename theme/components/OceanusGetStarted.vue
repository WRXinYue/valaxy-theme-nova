<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter<{ getStarted: GetStarted }>()

export type GetStarted = Partial<{
  title: string
  text: string
  actions: {
    theme?: 'brand'
    text?: string
    link?: string
  }[]

  cards: {
    img: string
    alt: string
    color?: string
  }[]
}>
</script>

<template>
  <section v-if="fm?.getStarted" class="get-started-section relative overflow-hidden" p="t-260px b-220px" flex="~ col center">
    <div class="framework-row">
      <div v-for="(card, i) in fm.getStarted?.cards" :key="i" class="framework-card" :style="card?.color && `--glow-color: ${card?.color}`">
        <img :src="card?.img" :alt="card?.alt || ''" class="chip-logo">
      </div>
    </div>

    <div class="text-center" flex="~ col center">
      <h2 class="text-center <2xl:font-size-36px <md:font-size-24px <xl:font-size-30px" m="t-75px <2xl:t-60px" max-w="26.8em" style="font: 500 44px / 1.3 var(--oceanus-font);">
        {{ fm.getStarted?.title }}
      </h2>
      <h3 max-w="80%" class="text-$oceanus-c-text-muted <2xl:font-size-18px <md:font-size-15px <xl:font-size-16px" m="t-32px" style="font: 400 22px / 1.335 var(--oceanus-font);">
        {{ fm.getStarted?.text }}
      </h3>
      <div v-if="fm.getStarted?.actions" class="actions mt-40px" flex="~">
        <AppLink v-for="(action, i) in fm.getStarted?.actions" :key="i" :to="action?.link" class="action" m="2">
          <OceanusButton :text="action.text" />
        </AppLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.get-started-section {
  .vite-chip {
    filter: drop-shadow(0px 18px 33px rgba(0, 0, 0, 0.5));

    // &::before {
    //   content: '';
    //   position: absolute;
    //   bottom: -30px;
    //   left: -20px;
    //   width: 80px;
    //   height: 80px;
    //   background: linear-gradient(180deg, #61d9ff, #0000);
    //   z-index: -1;
    //   filter: blur(30px);
    // }

    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: -20px;
    //   right: -20px;
    //   width: 80px;
    //   height: 80px;
    //   background: linear-gradient(270deg, #7a23a1, #715ebde6 60%, #715ebde6, #bd34fe00);
    //   z-index: -1;
    //   filter: blur(30px);
    // }

    .chip-logo {
      opacity: 0.8;
      filter: drop-shadow(0 0 0.6rem color-mix(in srgb, #ffffad 50%, transparent));
    }
  }

  .framework-card {
    width: 96px;
    height: 96px;
    border-radius: 12px;
    background: #fbfbfd;
    border: 1px solid rgba(217, 217, 217, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    --glow-color: rgba(0, 0, 0, 0);
    // --glow-color: #40b782;
    // opacity: 0;
    transition: opacity 0.4s ease;
    -webkit-user-select: none;
    user-select: none;

    @at-root html.dark & {
      border: 1px solid rgba(38, 38, 38, 0.7);
      background: #181818;
    }

    img {
      user-select: none;
      filter: drop-shadow(0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent));
    }

    &.active {
      opacity: 1;
    }

    &:has(img) {
      cursor: pointer;
      position: relative;

      img {
        transition:
          transform 1200ms cubic-bezier(0.25, 0.8, 0.25, 1),
          filter 3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        right: 10%;
        bottom: 10%;
        background-color: var(--glow-color);
        filter: blur(18px);
        z-index: -1;
        opacity: 0;
        transition: opacity 3s ease;
        will-change: opacity;
      }

      &:hover {
        img {
          transform: scale(1.12);
          filter: brightness(1.25);
        }

        &::before {
          opacity: 1;
          transition: opacity 0.2s ease;
        }
      }
    }
  }

  .framework-row {
    display: grid;
    grid-auto-columns: 96px;
    grid-gap: 24px;
    justify-content: flex-start;
    margin-bottom: 24px;
    position: relative;
    white-space: nowrap;
    grid-auto-flow: column;
  }
}
</style>
