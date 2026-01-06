<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCourseStore } from "../../store/CourseDetailsStore";

import CourseHeader from "../../components/courseDetails/CourseDetailsHeader.vue";
import CourseTabs from "../../components/courseDetails/CourseDetailsTab.vue";

const route = useRoute();
const courseStore = useCourseStore();

const slug = route.params.slug;
const courseName = slug.replace(/-/g, " ");
onMounted(() => {
  courseStore.fetchCourseBySlug(courseName);
});

// if user navigates to another course without reload
watch(
  () => route.params.slug,
  (newSlug) => {
    courseStore.clearCourse();
    courseStore.fetchCourseBySlug(newSlug);
  }
);
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <CourseHeader />
    <CourseTabs />

    <div class="max-w-6xl mx-auto px-4 py-6">
      <router-view />
    </div>
  </div>
</template>
