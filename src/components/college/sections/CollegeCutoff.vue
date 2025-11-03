<script setup>
import { ref, computed } from 'vue';

// --- Data for IIT Madras B.Tech JEE Advanced Cutoff 2025 Table ---
const cutoffData = ref([
    { course: 'Computer Science and Engineering', rank: 171 },
    { course: 'Artificial Intelligence and Data Analytics', rank: 306 },
    { course: 'Electrical Engineering', rank: 849 },
    { course: 'Computational Engineering and Mechanics', rank: 1309 },
    { course: 'Engineering Physics', rank: 1441 },
    { course: 'Mechanical Engineering', rank: 2468 },
]);

// Since the image suggests more courses exist but are hidden by 'Show More',
// we will simulate the initial view and the 'Show More' functionality.
const initialCoursesToShow = 4;
const showAll = ref(false);

const displayedCutoffs = computed(() => {
    return showAll.value ? cutoffData.value : cutoffData.value.slice(0, initialCoursesToShow);
});

const toggleShowMore = () => {
    showAll.value = !showAll.value;
};

// --- Computed property for the 'Show More' button visibility ---
const hasMoreCutoffs = computed(() => {
    return cutoffData.value.length > initialCoursesToShow;
});

// --- Computed property for the overall cutoff summary ---
const overallCutoffSummary = 'The overall IIT Madras BTech cutoff 2025 Closing Rank for General category is **171** for Computer Science and Engineering and **7433** for Naval Architecture and Ocean Engineering.';

</script>

<template>
  <div class="space-y-6 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📈 IIT Madras BTech JEE Advanced Cutoff 2025 - General
      </h3>

      <p class="text-gray-700 text-sm leading-relaxed mb-4">
        IIT Madras BTech JEE Advanced cutoff 2025 has been released for Round 6. The overall IIT Madras BTech cutoff 2025 Closing Rank for General category is **171** for Computer Science and Engineering and 7433 for Naval Architecture and Ocean Engineering. IIT Madras JEE Advanced Cutoff 2025 for BTech admission is listed below.
      </p>

      <div class="overflow-x-auto mb-4">
        <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead class="bg-blue-900">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">B.Tech [Bachelor of Technology]</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Round 6 (Closing Rank)</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in displayedCutoffs" :key="item.course">
              <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.course }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">{{ item.rank }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="hasMoreCutoffs || showAll" class="text-center pt-2">
        <button 
          @click="toggleShowMore" 
          class="text-red-600 hover:text-red-800 font-semibold py-1 px-4 text-sm"
        >
          {{ showAll ? 'Show Less' : 'Show More' }}
        </button>
      </div>
      
      <div class="text-center pt-6">
        <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-150">
          <i class="fas fa-download mr-2"></i> Download Detailed Report
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling to match the dark blue header in the image */
.bg-blue-900 {
    background-color: #003366; /* Darker blue color similar to the image */
}
.text-white {
    color: white;
}
</style>