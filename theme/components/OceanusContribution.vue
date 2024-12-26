<script setup lang="ts">
import { isEmptyAddon, useFrontmatter } from 'valaxy'
import * as addonGitLogVirtual from 'valaxy-addon-git-log'
// import { useAddonGitLog } from 'valaxy-addon-git-log'
import contributors from 'virtual:git-log/contributors'

if (isEmptyAddon(addonGitLogVirtual))
  console.warn('valaxy-addon-git-log is not installed. For more details, see: https://github.com/valaxyjs/valaxy-addon-git-log')

// const contributors = addonGitLogVirtual.useAddonGitLogAllContributor()
const fm = useFrontmatter()
</script>

<template>
  <section v-if="fm?.contributors" class="oceanus-contribution oceanus-section">
    <div class="oceanus-home-container">
      <span class="oceanus-frame" />

      <div class="items-start justify-between rd-62px bg-$oceanus-c-card-bg lg:items-center" flex="~ col lg:row" p="x-40px y-50px">
        <div class="flex-shrink-0">
          <h3 class="subtitle">
            {{ fm.contributors?.subtitle }}
          </h3>
          <h2 class="title">
            {{ fm.contributors?.title }}
          </h2>
          <div class="text">
            <p>
              {{ fm.contributors?.text }}
              Free & open source
              Vite is MIT Licensed and will always be free and open source. This is made possible by our contributors and these companies:
              Brought to you by

              上面这是一个免费软件之类，在挂上主要贡献者信息
              Vite 已获得 MIT 许可，并且将始终免费且开源。这是我们的贡献者和这些公司使之成为可能的。感谢 GitHub上的所有贡献者！
            </p>
          </div>
        </div>
        <div class="trusted-logos <lg:mt-5">
          <div class="grid grid-cols-6 gap-4 lg:grid-cols-5 md:grid-cols-10 sm:grid-cols-5 lg:gap-8 sm:gap-5">
            <div v-for="(contributor, i) in contributors" :key="i" class="relative flex pt-[100%]">
              <a class="absolute inset-0 flex transition-all">
                <div class="relative w-full inline-flex" style="transition-delay: 0ms;">
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
  padding: 70px 0;

  .title {
    margin-top: 50px;

    @media screen and (max-width: 640px) {
      margin-top: 35px;
    }
  }

  .text {
    position: relative;
    margin-top: 60px;
    max-width: 575px;

    @media screen and (max-width: 1600px) {
      margin-top: 45px;
      max-width: 400px;
    }

    @media screen and (max-width: 565px) {
      margin-top: 45px;
      max-width: 314px;
    }
  }

  .trusted-logos {
    max-height: 662px;
    // padding-block: 100px;
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    flex-basis: 35%;

    opacity: 1;

    @media screen and (max-width: 768px) {
      max-height: 720px;
    }

    @media screen and (max-width: 565px) {
      max-height: 580px;
    }
  }
}
</style>
