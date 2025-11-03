<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const courseLevels = [
  { label: "ALL", path: "" },
  { label: "DIPLOMA", path: "diploma" },
  { label: "BACHELORS", path: "bachelors" },
  { label: "MASTERS", path: "masters" },
  { label: "DOCTORATE", path: "doctorate" },
  { label: "CERTIFICATE", path: "certificate" },
  { label: "INTEGRATED DEGREE", path: "integrated-degree" },
];

const activeLevel = computed(() => {
  let lastSegment = route.path.split("/").pop();

  if (!lastSegment || lastSegment === route.params.slug) {
    return "ALL";
  }

  return lastSegment.replace(/-/g, " ").toUpperCase();
});

const navigateTo = (levelPath) => {
  router.push(`/courses/${route.params.slug}/${levelPath}`);
};
</script>



<template>
  <div class="w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      
      <h2 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Browse Engineering Courses
      </h2>

      <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 sticky top-[70px] z-40">
        <nav class="flex space-x-6 overflow-x-auto whitespace-nowrap">
          <button
            v-for="item in courseLevels"
            :key="item.label"
            @click="navigateTo(item.path)"
            :class="[
              activeLevel === item.label
                ? 'border-red-600 text-red-600 font-bold'
                : 'border-transparent text-gray-700 hover:text-red-500',
              'inline-flex items-center px-1 py-2 border-b-2 text-sm uppercase tracking-wider transition duration-150'
            ]"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>

     

    </div>
  </div>
</template>


<style scoped>
/* Scoped styles remain here */
</style>