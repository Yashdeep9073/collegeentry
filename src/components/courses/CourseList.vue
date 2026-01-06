<script setup>
import { useCourseStore } from "../../store/courseStore";
import { useRouter } from "vue-router";

const router = useRouter();
function goToCourse(course) {
  if (!course?.name) return;

  const slug = course.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  router.push(`/${slug}`);
}
const store = useCourseStore();
</script>

<template>
  <div class="space-y-6 p-4 sm:p-6 lg:p-8">
    <div
      v-for="course in store.filteredCourses"
      :key="course.id"
      class="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center transition duration-300 hover:shadow-lg hover:border-red-400"
    >
      <!-- LEFT CONTENT -->
      <div class="flex-grow space-y-2 mb-4 md:mb-0">
        <h4 class="text-xl font-semibold text-gray-800">
          {{ course.name }}
        </h4>

        <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <div class="flex items-center">
            <i class="fas fa-money-bill-wave text-blue-500 mr-1.5"></i>
            <span class="font-medium">Average fee:</span>
            ₹{{ course.averageFees }}
          </div>

          <div class="flex items-center">
            <i class="fas fa-clock text-blue-500 mr-1.5"></i>
            <span class="font-medium">Duration:</span>
            {{ course.duration }}
          </div>

          <div class="flex items-center">
            <i class="fas fa-graduation-cap text-blue-500 mr-1.5"></i>
            <span class="font-medium">Degree:</span>
            {{ course.degreeType }}
          </div>
        </div>

        <div class="flex flex-wrap gap-4 pt-2 text-sm">
          <button class="text-blue-600 hover:underline font-medium">
            Syllabus & Subjects
          </button>
          <span class="text-gray-400">|</span>
          <button class="text-blue-600 hover:underline font-medium">
            Job, Scope & Salary
          </button>
        </div>
      </div>

      <!-- RIGHT ACTION -->
      <div class="flex-shrink-0">
        <button
          @click="goToCourse(course)"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-md shadow-lg transition duration-150 transform hover:scale-105"
        >
          Apply Now
        </button>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <p
      v-if="
        (!store.filteredCourses || !store.filteredCourses.length) &&
        !store.loading
      "
      class="text-center text-gray-500 text-sm"
    >
      No courses available for this category.
    </p>
  </div>
</template>
