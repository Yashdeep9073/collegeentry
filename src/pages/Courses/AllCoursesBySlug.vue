<script setup>
import CourseHeader from "../../components/courses/courseHeader.vue";
import CourseTabs from "../../components/courses/CourseTab.vue";
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">

    <!-- Top College Banner / Header -->
    <CourseHeader />

    <!-- Sticky Tabs Section -->
    <CourseTabs />

    <!-- Page Inner Content -->
    <div class="max-w-6xl mx-auto px-4 py-6">
      <router-view />
    </div>

  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
