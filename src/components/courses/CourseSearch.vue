<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/store/courseStore";

const router = useRouter();
const store = useCourseStore();

const input = ref("");

const onSearch = () => {
  store.searchCourses(input.value);
};

const goToCourse = (course) => {
  const slug = course.name.toLowerCase().replace(/\s+/g, "-");
  router.push(`/course/${slug}`);
  store.clearSearch();
  input.value = "";
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
    <input
      v-model="input"
      @input="onSearch"
      type="text"
      placeholder="Search for a Course"
      class="w-full px-5 py-3 border border-gray-300 rounded-lg"
    />

    <!-- SEARCH RESULTS -->
    <div
      v-if="store.searchResults.length"
      class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto"
    >
      <ul class="divide-y">
        <li
          v-for="course in store.searchResults"
          :key="course.id"
          @click="goToCourse(course)"
          class="px-4 py-2 cursor-pointer hover:bg-red-50"
        >
          <i class="fa-solid fa-magnifying-glass text-red-500 text-xs mr-2"></i>
          <span class="text-sm font-medium">
            {{ course.name }}
          </span>
          <span class="text-xs text-gray-500 ml-2">
            ({{ course.degreeType }})
          </span>
        </li>
      </ul>
    </div>

    <!-- NO RESULTS -->
    <div
      v-if="input && !store.searchResults.length"
      class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow p-3 text-sm text-gray-600"
    >
      <i class="fa-solid fa-circle-exclamation mr-2 text-red-500"></i>
      No courses found matching "{{ input }}"
    </div>
  </div>
</template>
