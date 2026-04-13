<script setup lang="ts">
import type { FmLocaleString } from '../types'
import { useMediaQuery } from '@vueuse/core'
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import { useFmLocaleString, useThemeConfig } from '../composables'
import NovaHeroParticles from './NovaHeroParticles.vue'
import NovaHeroPrismCanvas from './NovaHeroPrismCanvas.vue'

const appStore = useAppStore()
const themeConfig = useThemeConfig()
const { fmT } = useFmLocaleString()

const heroTitle = computed(() => fmT(themeConfig.value.hero?.title as FmLocaleString | undefined))
const heroMotto = computed(() => fmT(themeConfig.value.hero?.motto as FmLocaleString | undefined))

const heroImg = computed(() => {
  const img = themeConfig.value.hero.img
  if (typeof img === 'string')
    return img
  else if (typeof img === 'object')
    return appStore.isDark ? img.dark : img.light

  console.error('Invalid favicon type, check ThemeConfig.hero.img config')
  return ''
})

const showPrism = computed(() => {
  if (themeConfig.value.hero.prismBackground === false)
    return false
  return !heroImg.value
})

const showPrismDark = computed(() => showPrism.value && appStore.isDark)

const showLightStripes = computed(() => !appStore.isDark && !heroImg.value)

const lightHeroTitle = computed(() => heroTitle.value)

const heroBgStyle = computed(() =>
  heroImg.value ? { backgroundImage: `url(${heroImg.value})` } : undefined,
)

const heroClass = computed(() => ({
  'has-img': !!heroImg.value,
  'has-prism': showPrismDark.value,
  'has-lightstripes': showLightStripes.value,
}))

const isMobileHero = useMediaQuery('(max-width: 767px)', { ssrWidth: 1024 })
const showHeroHeavyLayers = computed(() => !isMobileHero.value)
</script>

<template>
  <div class="nova-hero" :class="heroClass" :style="heroBgStyle">
    <div v-if="showLightStripes" class="nova-hero-stripes" aria-hidden="true">
      <div class="nova-hero-stripes__bg" />
    </div>

    <template v-if="showPrismDark">
      <div class="nova-hero-ambient" aria-hidden="true">
        <div class="nova-hero-spotlight">
          <div />
          <div />
          <div />
        </div>
        <div class="nova-hero-accent-lines">
          <div>
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div v-if="showHeroHeavyLayers" class="nova-hero-prism-wrap">
        <ClientOnly>
          <NovaHeroPrismCanvas />
        </ClientOnly>
      </div>
      <ClientOnly v-if="showHeroHeavyLayers">
        <NovaHeroParticles />
      </ClientOnly>
    </template>

    <div class="hero-content" :class="{ 'hero-content--lightmix': showLightStripes }">
      <div v-if="showPrismDark" class="hero-title-dual">
        <p
          v-for="(layer, i) in ['main', 'echo']"
          :key="layer"
          class="hero-title"
          :class="i === 0 ? 'hero-title--main' : 'hero-title--echo'"
          :aria-hidden="i === 1 ? true : undefined"
        >
          <slot name="intro-text">
            {{ heroTitle }}
          </slot>
        </p>
      </div>
      <p
        v-else-if="showLightStripes"
        class="hero-title hero-title--lightglass"
        :data-text="lightHeroTitle"
      >
        <slot name="intro-text">
          {{ heroTitle }}
        </slot>
      </p>
      <p v-else class="hero-title">
        <slot name="intro-text">
          {{ heroTitle }}
        </slot>
      </p>

      <p class="hero-motto">
        <slot name="muted-text">
          {{ heroMotto }}
        </slot>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@property --nova-hero-p {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.nova-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--nova-nav-height));
  padding: 0 2rem;
  position: relative;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &.has-prism {
    background-attachment: scroll;
    background-color: hsla(230, 45%, 5%, 1);
    background-image: linear-gradient(0deg, hsla(200, 60%, 92%, 0.06), hsla(210, 70%, 78%, 0.06));
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(0px);
    transition: backdrop-filter 0.5s ease;
  }

  &:hover::before {
    backdrop-filter: blur(2px);
  }

  &.has-prism::before {
    backdrop-filter: none;
    pointer-events: none;
  }

  &.has-lightstripes::before,
  &.has-lightstripes:hover::before {
    backdrop-filter: none;
  }

  .nova-hero-stripes {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .nova-hero-stripes__bg {
    --stripe-color: hsla(0, 0%, 100%, 1);
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    --nova-stripes: repeating-linear-gradient(
      100deg,
      var(--stripe-color) 0%,
      var(--stripe-color) 7%,
      transparent 10%,
      transparent 12%,
      var(--stripe-color) 16%
    );
    --nova-rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #e879f9 15%, #60a5fa 20%, #5eead4 25%, #60a5fa 30%);
    background-image: var(--nova-stripes), var(--nova-rainbow);
    background-size: 300%, 200%;
    background-position:
      50% 50%,
      50% 50%;
    filter: blur(10px) invert(100%);
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  }

  .nova-hero-stripes__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--nova-stripes), var(--nova-rainbow);
    background-size: 200%, 100%;
    animation: nova-smooth-bg 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
  }

  .nova-hero-ambient {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .nova-hero-spotlight {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: 0 auto;
    height: min(42em, 120vh);
    width: 100%;
    overflow: hidden;
    transition: filter 1s ease-in-out;

    > div {
      border-radius: 0 0 50% 50%;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 3em;
      width: min(30em, 85vw);
      height: max(42em, 86vh);
      background-image: conic-gradient(
        from 0deg at 50% -5%,
        transparent 45%,
        hsla(220, 18%, 60%, 0.3) 49%,
        hsla(220, 18%, 60%, 0.5) 50%,
        hsla(220, 18%, 60%, 0.3) 51%,
        transparent 55%
      );
      transform-origin: 50% 0;
      filter: blur(15px) opacity(0.5);
      z-index: -1;
      animation:
        nova-hero-load 2s ease-in-out forwards,
        nova-hero-loadrot 2s ease-in-out forwards,
        nova-hero-spotlight 21s ease-in-out infinite reverse;
    }

    > div:nth-child(1) {
      rotate: 20deg;
      animation:
        nova-hero-load 2s ease-in-out forwards,
        nova-hero-loadrot 2s ease-in-out forwards,
        nova-hero-spotlight 17s ease-in-out infinite;
    }

    > div:nth-child(2) {
      rotate: -20deg;
      animation:
        nova-hero-load 2s ease-in-out forwards,
        nova-hero-loadrot 2s ease-in-out forwards,
        nova-hero-spotlight 14s ease-in-out infinite;
    }
  }

  .nova-hero-accent-lines {
    --nova-accent-line: hsla(210, 75%, 82%, 0.18);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: min(42em, 100vh);
    z-index: -2;

    > div:nth-child(1) > div {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--nova-accent-line), transparent);
      opacity: 0;
      scale: 0;
      animation: nova-hero-accentload 2s ease-out 0.4s forwards;
    }

    > div:nth-child(1) > div:nth-child(1) {
      top: 6em;
    }
    > div:nth-child(1) > div:nth-child(2) {
      top: 11em;
    }
    > div:nth-child(1) > div:nth-child(3) {
      top: 16em;
    }
    > div:nth-child(1) > div:nth-child(4) {
      top: 24em;
    }
    > div:nth-child(1) > div:nth-child(5) {
      top: 29em;
    }

    > div:nth-child(2) > div {
      position: absolute;
      top: 0;
      width: 1px;
      height: 100%;
      background: var(--nova-accent-line);
      opacity: 0;
      scale: 0;
      animation: nova-hero-accentload 2s ease-out 0.2s forwards;
    }

    > div:nth-child(2) > div:nth-child(1) {
      left: min(24em, 22vw);
    }
    > div:nth-child(2) > div:nth-child(2) {
      left: min(34em, 32vw);
    }
    > div:nth-child(2) > div:nth-child(3) {
      left: auto;
      right: min(24em, 22vw);
    }
    > div:nth-child(2) > div:nth-child(4) {
      left: auto;
      right: min(34em, 32vw);
    }
  }

  .nova-hero-prism-wrap {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 4;
    max-width: 1000px;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--nova-c-text-deeper);
    animation: fade-in 1.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.has-img .hero-content,
  &.has-prism .hero-content {
    color: hsla(0, 0%, 100%, 1);
    text-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.15);
  }

  &.has-prism .hero-title-dual {
    position: relative;
    margin-bottom: 1.5rem;
    min-height: 1.15em;
  }

  &.has-prism .hero-title--main {
    position: relative;
    z-index: 1;
    margin: 0;
    background:
      radial-gradient(
        2em 2em at 50% 50%,
        transparent calc(var(--nova-hero-p) - 2em),
        hsla(0, 0%, 100%, 1) calc(var(--nova-hero-p) - 1em),
        hsla(0, 0%, 100%, 1) calc(var(--nova-hero-p) - 0.4em),
        transparent calc(var(--nova-hero-p))
      ),
      linear-gradient(0deg, hsla(210, 75%, 82%, 1) 30%, hsla(210, 65%, 72%, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 16px hsla(210, 70%, 78%, 0.24);
    animation: nova-hero-pulse 10s linear 1.2s infinite;
  }

  &.has-prism .hero-title--echo {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    background: radial-gradient(
      2em 2em at 50% 50%,
      transparent calc(var(--nova-hero-p) - 2em),
      transparent calc(var(--nova-hero-p) - 1em),
      hsla(0, 0%, 100%, 1) calc(var(--nova-hero-p) - 1em),
      hsla(0, 0%, 100%, 1) calc(var(--nova-hero-p) - 0.4em),
      transparent calc(var(--nova-hero-p) - 0.4em),
      transparent calc(var(--nova-hero-p))
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: blur(16px) opacity(0.4);
    animation: nova-hero-pulse 10s linear 1.2s infinite;
    pointer-events: none;
  }

  &.has-prism .hero-motto {
    opacity: 0.95;
    color: hsla(200, 85%, 92%, 0.92);
    text-shadow:
      0 0 20px hsla(210, 80%, 85%, 0.35),
      0 2px 12px hsla(0, 0%, 0%, 0.35);
    background: linear-gradient(0deg, hsla(200, 85%, 92%, 1) 0%, hsla(210, 70%, 78%, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  html:not(.dark) &:not(.has-img) {
    background: transparent;
  }

  html:not(.dark) &:not(.has-img) .hero-content--lightmix {
    color: var(--nova-c-text-deep);
    text-shadow: none;
    mix-blend-mode: difference;
    filter: invert(1);
  }

  html:not(.dark) &:not(.has-img) .hero-title--lightglass {
    position: relative;
    margin-bottom: 1.5rem;
    background: none;
    -webkit-text-fill-color: unset;
    filter: none;
  }

  html:not(.dark) &:not(.has-img) .hero-title--lightglass::before {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: hsla(0, 0%, 100%, 1);
    text-shadow: 0 0 1px hsla(0, 0%, 100%, 1);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-color: hsla(0, 0%, 100%, 1);
    -webkit-mask: linear-gradient(#000 0 0) luminance;
    mask:
      linear-gradient(#000 0 0) luminance,
      alpha;
    backdrop-filter: blur(19px) brightness(12.5);
    -webkit-text-stroke: 1px hsla(0, 0%, 100%, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    z-index: 1;
    pointer-events: none;
  }

  html:not(.dark) &:not(.has-img) .hero-content--lightmix .hero-motto {
    color: var(--nova-c-text-muted);
    text-shadow: none;
    background: none;
    -webkit-text-fill-color: unset;
    opacity: 0.95;
  }

  .hero-title {
    font-size: clamp(2rem, calc(1rem + 5vw), 5rem);
    letter-spacing: -0.02em;
    font-weight: 600;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  .hero-motto {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 400;
    letter-spacing: 0.01em;
    opacity: 0.85;
    margin-bottom: 2.5rem;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.4;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }

  @media (max-width: 767px), (prefers-reduced-motion: reduce) {
    background-attachment: scroll !important;

    &::before,
    &:hover::before {
      backdrop-filter: none !important;
    }

    .nova-hero-stripes__bg {
      filter: blur(6px) invert(100%);
    }

    .nova-hero-stripes__bg::after {
      animation: none;
      background-attachment: scroll;
    }

    .nova-hero-ambient {
      display: none;
    }

    .hero-content {
      animation: none;
      opacity: 1;
      transform: none;
    }

    &.has-prism .hero-title--echo {
      display: none;
    }

    &.has-prism .hero-title--main {
      animation: none;
      --nova-hero-p: 260%;
    }

    html:not(.dark) &:not(.has-img) .hero-title--lightglass::before {
      backdrop-filter: none;
      -webkit-text-stroke: 0;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes nova-hero-pulse {
    0% {
      --nova-hero-p: 0%;
    }
    50% {
      --nova-hero-p: 300%;
    }
    100% {
      --nova-hero-p: 300%;
    }
  }

  @keyframes nova-hero-load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes nova-hero-loadrot {
    0% {
      rotate: 0deg;
      scale: 0;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes nova-hero-spotlight {
    0% {
      transform: rotateZ(0deg) scale(1);
      filter: blur(15px) opacity(0.5);
    }
    20% {
      transform: rotateZ(-1deg) scale(1.2);
      filter: blur(16px) opacity(0.6);
    }
    40% {
      transform: rotateZ(2deg) scale(1.3);
      filter: blur(14px) opacity(0.4);
    }
    60% {
      transform: rotateZ(-2deg) scale(1.2);
      filter: blur(15px) opacity(0.6);
    }
    80% {
      transform: rotateZ(1deg) scale(1.1);
      filter: blur(13px) opacity(0.4);
    }
    100% {
      transform: rotateZ(0deg) scale(1);
      filter: blur(15px) opacity(0.5);
    }
  }

  @keyframes nova-hero-accentload {
    0% {
      opacity: 0;
      scale: 0;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes nova-smooth-bg {
    from {
      background-position:
        50% 50%,
        50% 50%;
    }
    to {
      background-position:
        350% 50%,
        350% 50%;
    }
  }
}
</style>
