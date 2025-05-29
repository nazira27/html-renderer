<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'HTML Renderer',
  meta: [
    { name: 'title', content: 'HTML Renderer' },
    { name: 'description', content: 'HTML Renderer App' }
  ]
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
