<script setup lang="ts">
import { isEmptyAddon, useFrontmatter } from 'valaxy'
import * as addonGitLogVirtual from 'valaxy-addon-git-log'
// import { useAddonGitLog } from 'valaxy-addon-git-log'
import contributors from 'virtual:git-log/contributors'

if (isEmptyAddon(addonGitLogVirtual))
  console.warn('valaxy-addon-git-log is not installed. For more details, see: https://github.com/valaxyjs/valaxy-addon-git-log')

// const contributors = addonGitLogVirtual.useAddonGitLogAllContributor()
const fm = useFrontmatter<{ contributors: Contributors }>()

export type Contributors = Partial<{
  title: string
  subtitle: string
  text: string
}>
</script>

<template>
  <section v-if="fm?.contributors" class="oceanus-contribution oceanus-section">
    <div class="oceanus-home-container">
      <div class="contribution-container items-start justify-between rd-24px bg-$oceanus-c-card-bg lg:items-center" flex="~ col lg:row" p="x-50px y-60px">
        <div class="contribution-content flex-shrink-0">
          <h3 class="subtitle">
            {{ fm.contributors?.subtitle }}
          </h3>
          <h2 class="title">
            {{ fm.contributors?.title }}
          </h2>
          <div class="text">
            <p>
              {{ fm.contributors?.text }}
            </p>
          </div>
        </div>
        <div class="contributors-grid <lg:mt-6">
          <div class="grid grid-cols-6 gap-5 lg:grid-cols-5 md:grid-cols-10 sm:grid-cols-5 lg:gap-8 sm:gap-6">
            <div v-for="(contributor, i) in contributors" :key="i" class="contributor-item relative flex pt-[100%]">
              <a class="absolute inset-0 flex transition-all" :title="contributor.email" :href="contributor?.github || ''" :class="contributor?.github ? 'cursor-pointer' : 'cursor-default'">
                <div class="contributor-avatar relative w-full inline-flex">
                  <img width="80" height="80" class="h-full w-full rounded-xl transition lg:hover:scale-125" :src="contributor.avatar">
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.oceanus-contribution {
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 80px 0;
  }

  @media screen and (max-width: 480px) {
    padding: 60px 0;
  }

  .frame-container {
    max-width: 120px;
    margin: 0 auto 32px;
  }

  .contribution-container {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(var(--oceanus-c-card-bg-rgb, 255, 255, 255), 0.08);
    border-radius: 24px;

    &:hover {
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
      transform: translateY(-3px);
    }

    @media screen and (max-width: 768px) {
      padding: 40px 30px;
    }
  }

  .contribution-content {
    max-width: 550px;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover .title {
      color: var(--oceanus-c-brand);
      text-shadow: 0 0 1px rgba(var(--oceanus-c-brand-rgb, 74, 123, 255), 0.15);
    }
  }

  .subtitle {
    font-weight: 500;
    color: var(--oceanus-c-brand);
    font-size: 1.125rem;
    letter-spacing: -0.01em;

    @media screen and (max-width: 640px) {
      font-size: 1rem;
    }
  }

  .title {
    margin-top: 16px;
    font-size: 2.5rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    color: var(--oceanus-c-text-deep, #000);

    @media screen and (max-width: 640px) {
      margin-top: 12px;
      font-size: 2rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  .text {
    position: relative;
    margin-top: 24px;
    max-width: 575px;
    font-size: 1.125rem;
    line-height: 1.5;
    color: var(--oceanus-c-text-muted);
    letter-spacing: -0.01em;

    @media screen and (max-width: 1600px) {
      margin-top: 20px;
      max-width: 450px;
    }

    @media screen and (max-width: 565px) {
      margin-top: 16px;
      max-width: 100%;
      font-size: 1rem;
    }
  }

  .contributors-grid {
    max-height: 662px;
    width: 100%;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    flex-basis: 35%;
    opacity: 1;
    position: relative;

    @media screen and (max-width: 768px) {
      max-height: 720px;
    }

    @media screen and (max-width: 565px) {
      max-height: 580px;
    }
  }

  .contributor-item {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-3px) scale(1.01);
      z-index: 2;
    }
  }

  .contributor-avatar {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    img {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      object-fit: cover;
      border: 2px solid transparent;
      border-radius: 14px;

      &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        border-color: var(--oceanus-c-brand, #4a7bff);
      }
    }
  }
}
</style>
