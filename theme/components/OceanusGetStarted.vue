<script setup lang="ts">
import { ref } from 'vue'
import { useFrontmatter } from 'valaxy'
import { useHomeSectionReveal } from '../composables'

const fm = useFrontmatter<{ getStarted: GetStarted }>()
const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useHomeSectionReveal(sectionRef)

function onGlassCtaMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  el.style.setProperty('--x', `${x}%`)
  el.style.setProperty('--y', `${y}%`)
}

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
  <section
    v-if="fm?.getStarted"
    ref="sectionRef"
    class="get-started-section oceanus-home-below-hero relative overflow-hidden"
    p="t-260px b-220px"
    flex="~ col center"
    :class="{ 'oceanus-home-below-hero--in-view': isRevealed }"
    style="--oceanus-home-section-i: 3"
  >
    <div class="framework-row">
      <div
        v-for="(card, i) in fm.getStarted?.cards"
        :key="i"
        class="oceanus-home-card-conic-shell framework-card-shell"
        style="--oceanus-home-card-br: 16px"
      >
        <div
          class="framework-card oceanus-home-card-hover oceanus-home-card-surface"
          :style="card?.color && `--glow-color: ${card?.color}`"
        >
          <img :src="card?.img" :alt="card?.alt || ''" class="chip-logo">
        </div>
      </div>
    </div>

    <div class="text-center" flex="~ col center">
      <h2 class="heading text-center <2xl:font-size-36px <md:font-size-24px <xl:font-size-30px" m="t-75px <2xl:t-60px" max-w="26.8em">
        <span>{{ fm.getStarted?.title }}</span>
      </h2>
      <h3 class="subheading text-$oceanus-c-text-muted <2xl:font-size-18px <md:font-size-15px <xl:font-size-16px" m="t-32px" max-w="80%">
        <span>{{ fm.getStarted?.text }}</span>
      </h3>
      <div v-if="fm.getStarted?.actions" class="actions mt-40px" flex="~ wrap justify-center gap-24px">
        <AppLink
          v-for="(action, i) in fm.getStarted?.actions"
          :key="i"
          :to="action?.link"
          class="oceanus-glass-cta"
          m="2"
          @mousemove="onGlassCtaMove"
        >
          <span class="oceanus-glass-cta__shimmer" aria-hidden="true" />
          <span class="oceanus-glass-cta__label">{{ action.text }}</span>
        </AppLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.framework-card-shell {
  display: flex;
}

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
    filter: drop-shadow(0px 16px 30px hsla(0, 0%, 0%, 0.4));

    .chip-logo {
      opacity: 0.85;
      filter: drop-shadow(0 0 0.5rem hsla(60, 100%, 84%, 0.45));
    }
  }

  .framework-card {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    --glow-color: hsla(0, 0%, 0%, 0);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    -webkit-user-select: none;
    user-select: none;

    img {
      user-select: none;
      filter: drop-shadow(0 0 0.7rem var(--glow-color));
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
        border-color: color-mix(in srgb, var(--va-c-primary) 20%, transparent);

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
    gap: 24px;
  }
}

.oceanus-glass-cta {
  --x: 50%;
  --y: 50%;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  color: hsla(240, 8%, 12%, 1);
  background: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.55) 0%,
    hsla(0, 0%, 100%, 0.2) 100%
  );
  border: 1.5px solid transparent;
  border-radius: 40px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow:
    0 8px 32px hsla(0, 0%, 0%, 0.08),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.65),
    inset 0 -1px 0 hsla(0, 0%, 0%, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition:
    background 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.35s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: 40px;
    padding: 1.5px;
    background: linear-gradient(
      135deg,
      hsla(0, 0%, 100%, 0.5) 0%,
      hsla(271, 60%, 55%, 0.45) 25%,
      hsla(195, 100%, 45%, 0.45) 50%,
      hsla(330, 80%, 60%, 0.45) 75%,
      hsla(0, 0%, 100%, 0.5) 100%
    );
    background-size: 200% 200%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: oceanus-glass-cta-border-flow 3s linear infinite;
    opacity: 0.55;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: 40px;
    background: radial-gradient(
      circle at var(--x) var(--y),
      hsla(0, 0%, 100%, 0.35) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    color: hsla(240, 8%, 10%, 1);
    background: linear-gradient(
      135deg,
      hsla(0, 0%, 100%, 0.85) 0%,
      hsla(0, 0%, 100%, 0.35) 100%
    );
    box-shadow:
      0 12px 48px hsla(271, 60%, 50%, 0.18),
      0 0 56px hsla(195, 100%, 45%, 0.12),
      inset 0 1px 0 hsla(0, 0%, 100%, 0.85),
      inset 0 -1px 0 hsla(0, 0%, 0%, 0.06);
    transform: translateY(-3px) scale(1.02);
  }

  &:hover::before {
    opacity: 1;
    animation-duration: 2s;
  }

  &:hover::after {
    opacity: 1;
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
    box-shadow:
      0 6px 24px hsla(271, 60%, 50%, 0.12),
      inset 0 1px 0 hsla(0, 0%, 100%, 0.5);
  }
}

html.dark .oceanus-glass-cta {
  color: hsla(0, 0%, 100%, 1);

  background: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.1) 0%,
    hsla(0, 0%, 100%, 0.03) 100%
  );
  box-shadow:
    0 8px 32px hsla(0, 0%, 0%, 0.35),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.18),
    inset 0 -1px 0 hsla(0, 0%, 100%, 0.05);

  &:hover {
    color: hsla(0, 0%, 100%, 1);
    transform: translateY(-3px) scale(1.02);
    background: linear-gradient(
      135deg,
      hsla(0, 0%, 100%, 0.18) 0%,
      hsla(0, 0%, 100%, 0.06) 100%
    );
    box-shadow:
      0 12px 48px hsla(271, 60%, 45%, 0.35),
      0 0 80px hsla(195, 100%, 50%, 0.2),
      inset 0 1px 0 hsla(0, 0%, 100%, 0.28),
      inset 0 -1px 0 hsla(0, 0%, 100%, 0.08);
  }

  &::after {
    background: radial-gradient(
      circle at var(--x) var(--y),
      hsla(0, 0%, 100%, 0.22) 0%,
      transparent 52%
    );
  }
}

.oceanus-glass-cta__shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: 1;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsla(0, 0%, 100%, 0.12) 45%,
    hsla(0, 0%, 100%, 0.28) 50%,
    hsla(0, 0%, 100%, 0.12) 55%,
    transparent 100%
  );
  transform: rotate(30deg);
  animation: oceanus-glass-cta-shimmer 3s linear infinite;
  pointer-events: none;
  z-index: 0;
}

.oceanus-glass-cta:hover .oceanus-glass-cta__shimmer {
  animation-duration: 1.5s;
}

.oceanus-glass-cta__label {
  position: relative;
  z-index: 3;
}

@keyframes oceanus-glass-cta-border-flow {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}

@keyframes oceanus-glass-cta-shimmer {
  0% {
    transform: translateX(-100%) rotate(30deg);
  }

  100% {
    transform: translateX(100%) rotate(30deg);
  }
}
</style>
