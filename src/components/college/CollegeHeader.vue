<script setup>
import { ref } from "vue";
// Simulate props or local data for the university details
const university = ref({
  name: "Lovely Professional University (LPU)",
  location: "Phagwara, Punjab",
  rating: "4.2",
  reviews: "32k",
  author: "Mayank Goyal",
  lastUpdated: "Oct 28, 2025",
});
</script>

<template>
  <section class="bg-white border-b border-gray-100 py-6 sm:py-8 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 lg:px-6">
      <div class="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
        <a href="/" class="hover:text-blue-600 transition duration-150">Home</a>
        <span class="text-gray-400">/</span>
        <a href="#" class="hover:text-blue-600 transition duration-150">Colleges</a>
        <span class="text-gray-400">/</span>
        <span class="text-gray-800 font-medium truncate">{{ university.name }}</span>
      </div>

      <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
        <div class="flex-1">
          <h1
            class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug"
          >
            {{ university.name }}: Admission 2025, Courses, Fees, Cutoff, Placement, Ranking
          </h1>

          <div class="mt-4 space-y-3">
            <div
              class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-600"
            >
              <span class="flex items-center gap-1.5 font-medium">
                <i class="fas fa-map-marker-alt text-red-500"></i>
                {{ university.location }}
              </span>

              <span
                class="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                <i class="fas fa-star"></i>
                {{ university.rating }} ({{ university.reviews }} Reviews)
              </span>
            </div>

            <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <i class="fas fa-user-circle"></i>
                Authored by {{ university.author }}
              </span>
              <span class="flex items-center gap-1">
                <i class="fas fa-clock"></i>
                Updated {{ university.lastUpdated }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-3 items-start lg:items-end flex-shrink-0"
        >
          <button
            class="w-full sm:w-auto px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <i class="fas fa-balance-scale"></i>
            Compare Colleges
          </button>
          <button
            class="w-full sm:w-auto px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm font-semibold shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <i class="fas fa-paper-plane"></i>
            🚀 Apply Now
          </button>
          <button
            class="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <i class="fas fa-download"></i>
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Assuming you have Font Awesome for icons (fas fa-...) or use similar icons */
</style>