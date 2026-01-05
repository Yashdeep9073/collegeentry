<script setup>
import { useCourseStore } from "../../store/courseStore";

const store = useCourseStore();
</script>

<template>
  <div class="bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        {{ store.stream?.name }} Courses
      </h1>

      <p class="text-gray-700 text-base leading-relaxed">
        {{ store.stream?.description }}
      </p>
    </div>
  </div>
</template>
