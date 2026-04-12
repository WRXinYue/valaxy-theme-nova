<template>
  <Layout>
    <NovaArticle>
      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-nav>
            <NovaArticleNav />
          </template>
        </component>
      </RouterView>
    </NovaArticle>
  </Layout>
</template>
