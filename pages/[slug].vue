<template>
  <v-container v-if="page">
    <v-row>
      <v-col cols="12">
        <div v-html="page.content" class="html-content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from '#imports'
import { useRoute, useHead } from '#imports'
import { usePagesStore } from '~/stores/pages'

const route = useRoute()
const pagesStore = usePagesStore()

const page = computed(() => {
  const currentSlug = route.params.slug
  const foundPage = pagesStore.pages?.find(p => p.slug.replace(/^\//, '') === currentSlug)
  return foundPage
})

onMounted(async () => {
  await pagesStore.fetchPages()
})

useHead({
  title: computed(() => page.value?.title || 'Page Not Found'),
  meta: computed(() => [
    { name: 'title', content: page.value?.title || 'Page Not Found' },
    { name: 'keywords', content: page.value?.keywords || '' },
  ])
})
</script>

<style>
.html-content {
  max-width: 100%;
}
.html-content img {
  max-width: 100%;
  height: auto;
}
</style> 