<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCourseStore } from "../../store/courseStore";

import CourseHeader from "../../components/courses/courseHeader.vue";
import CourseTabs from "../../components/courses/CourseTab.vue";
import CourseList from "../../components/courses/CourseList.vue";

const route = useRoute();
const store = useCourseStore();

const slug = route.params.slug;
const courseName = slug.replace(/-/g, " ");

onMounted(() => {
  store.fetchStreamCourses(courseName);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <CourseHeader />
    <CourseTabs />
    <CourseList />
  </div>
</template>
