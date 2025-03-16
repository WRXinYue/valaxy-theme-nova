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
      <h2 class="heading text-center <2xl:font-size-36px <md:font-size-24px <xl:font-size-30px" m="t-75px <2xl:t-60px" max-w="26.8em">
        {{ fm.getStarted?.title }}
      </h2>
      <h3 class="subheading text-$oceanus-c-text-muted <2xl:font-size-18px <md:font-size-15px <xl:font-size-16px" m="t-32px" max-w="80%">
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
  .heading {
    font-weight: 500;
    font-size: 44px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--oceanus-c-text-deep);
  }

  .subheading {
    font-weight: 400;
    font-size: 22px;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  .vite-chip {
    filter: drop-shadow(0px 16px 30px rgba(0, 0, 0, 0.4));

    .chip-logo {
      opacity: 0.85;
      filter: drop-shadow(0 0 0.5rem color-mix(in srgb, #ffffad 45%, transparent));
    }
  }

  .framework-card {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    background: #fbfbfd;
    border: 1px solid rgba(217, 217, 217, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    --glow-color: rgba(0, 0, 0, 0);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    -webkit-user-select: none;
    user-select: none;
    backdrop-filter: blur(5px);

    @at-root html.dark & {
      border: 1px solid rgba(38, 38, 38, 0.6);
      background: rgba(24, 24, 24, 0.95);
    }

    img {
      user-select: none;
      filter: drop-shadow(0 0 0.7rem color-mix(in srgb, var(--glow-color) 35%, transparent));
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &.active {
      opacity: 1;
    }

    &:has(img) {
      cursor: pointer;
      position: relative;

      img {
        transition:
          transform 1000ms cubic-bezier(0.16, 1, 0.3, 1),
          filter 2s cubic-bezier(0.16, 1, 0.3, 1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        right: 10%;
        bottom: 10%;
        background-color: var(--glow-color);
        filter: blur(16px);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity;
      }

      &:hover {
        transform: translateY(-2px);
        border-color: rgba(var(--oceanus-c-brand-rgb, 74, 123, 255), 0.2);

        img {
          transform: scale(1.08);
          filter: brightness(1.2);
        }

        &::before {
          opacity: 0.8;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      }
    }
  }

  .framework-row {
    display: grid;
    grid-auto-columns: 96px;
    grid-gap: 28px;
    justify-content: flex-start;
    margin-bottom: 24px;
    position: relative;
    white-space: nowrap;
    grid-auto-flow: column;
  }

  .actions {
    .action {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}
</style>
