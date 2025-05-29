<template>
  <v-container v-if="isLoading" class="fill-height">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          color="primary"
          indeterminate
          size="32"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else-if="page">
    <v-row>
      <v-col cols="12">
        <div v-html="page.content" class="html-content"></div>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12">
        <div class="html-content">There are no pages found</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '#imports'
import { useHead, useRouter } from '#imports'
import { usePagesStore } from '~/stores/pages'

const router = useRouter()
const pagesStore = usePagesStore()
const isLoading = ref(true)

if (!pagesStore.pages) {
  pagesStore.$patch({ pages: [] })
}

const page = computed(() => {
  return pagesStore?.pages?.find(p => !p.slug || p.slug === '')
})

onMounted(async () => {
  isLoading.value = true
  try {
    await pagesStore.fetchPages()
    
    if (pagesStore.pages && pagesStore.pages?.length > 0) {
      const emptySlugPage = pagesStore.pages.find(p => !p.slug || p.slug === '')
      
      if (!emptySlugPage) {
        const firstPage = pagesStore.pages[0]
        if (firstPage?.slug) {
          router.push(`/${firstPage.slug}`)
        }
      }
    }
  } finally {
    isLoading.value = false
  }
})

useHead({
  title: computed(() => page.value?.title || 'Home'),
  meta: computed(() => [
    { name: 'title', content: page.value?.title || 'Home' },
    { name: 'description', content: page.value?.content?.substring(0, 160) || '' },
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
.fill-height {
  height: 100vh;
}
</style> 