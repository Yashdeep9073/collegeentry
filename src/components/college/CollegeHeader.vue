<script setup>
import { useCollegeStore } from "../../store/collegeNameStore";
import { useRoute } from "vue-router";
import { onMounted, computed, ref, watch } from "vue";

const route = useRoute();
const collegeStore = useCollegeStore();

const slug = route.params.slug;

// Convert slug → Normal Name: "punjab-university" → "punjab university"
const collegeName = slug.replace(/-/g, " ");

// Fetch data on page load
onMounted(() => {
  collegeStore.fetchCollegeByName(collegeName);
});

// For easy usage in template
const university = computed(() => collegeStore.college);

watch(university, (val) => {
  if (val && val.name) {
    document.title = `${val.name} | Admission, Courses, Fees & More`;
  }
});
</script>

<template>
  <section
    v-if="university"
    class="bg-white border-b border-gray-100 py-6 sm:py-8 shadow-sm"
  >
    <div class="max-w-6xl applyBackground mx-auto px-4 lg:px-6">
      <div class="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
        <a href="/" class="hover:text-blue-600 transition duration-150">Home</a>
        <span class="text-gray-400">/</span>
        <a href="#" class="hover:text-blue-600 transition duration-150"
          >Colleges</a
        >
        <span class="text-gray-400">/</span>
        <span class="text-gray-800 font-medium truncate">{{
          university?.name
        }}</span>
      </div>

      <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
        <div class="flex-1">
          <h1
            class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug"
          >
            {{ university?.name }}: Admission 2025, Courses, Fees, Cutoff,
            Placement, Ranking
          </h1>

          <div class="mt-4 space-y-3">
            <div
              class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-600"
            >
              <span class="flex items-center gap-1.5 font-medium">
                <i class="fas fa-map-marker-alt text-red-500"></i>
                {{ university?.location }}
              </span>

              <span
                class="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                <i class="fas fa-star"></i>
                {{ university?.details?.rating || "N/A" }} ({{
                  university?.totalReviews || 0
                }}
                Reviews)
              </span>
            </div>

            <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <img
                  :src="university?.admin?.image"
                  alt="Admin Image"
                  class="w-6 h-6 rounded-full object-cover"
                />
                Authored by {{ university?.admin?.name }}
              </span>

              <span class="flex items-center gap-1">
                <i class="fas fa-clock"></i>
                Updated
                {{ new Date(university?.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-3 items-start lg:items-end flex-shrink-0"
        >
          <router-link
            to="/college-compare"
            class="w-full sm:w-auto px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <i class="fas fa-balance-scale"></i>
            Compare Colleges
          </router-link>
          <button
            class="w-full sm:w-auto px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm font-semibold shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <i class="fas fa-paper-plane"></i>
             Apply Now
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
  <section v-else class="text-center py-10 text-gray-500">
    Loading college data...
  </section>
</template>

<style scoped>
/* Scoped styles remain here */
</style>
