<script setup>
import ArticleByCategory from "./ArticleByCategory.vue";
import ArticleHeader from "./ArticleHeader.vue";

// If you want to fetch college data by ID/slug later:
// import { useRoute } from "vue-router";
// const route = useRoute();
// const collegeId = route.params.id;
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- Top College Banner / Header -->
    <ArticleHeader />

    <!-- Tabs (Info | Courses | Admission | ...) -->
    <ArticleByCategory />

    <!-- Dynamic Tab Content -->
    <div class="max-w-6xl mx-auto px-4 py-6">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* optional smooth scroll between tabs */
html {
  scroll-behavior: smooth;
}
</style>
