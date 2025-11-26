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
  class="relative w-full bg-center bg-cover bg-no-repeat"
  :style="{
    backgroundImage: `url(${university?.details?.thumbnail})`,
  }"
>
  <!-- Dark overlay for text readability -->
  <div class="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

  <div class="relative max-w-6xl mx-auto px-4 lg:px-6 py-12 text-white">
    <!-- Breadcrumb -->
    <div class="text-xs flex items-center gap-1.5 mb-4 opacity-90">
      <a href="/" class="hover:text-yellow-300">Home</a>
      <span>/</span>
      <a href="#" class="hover:text-yellow-300">Colleges</a>
      <span>/</span>
      <span class="font-semibold truncate">{{ university?.name }}</span>
    </div>

    <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
      <!-- Left Info -->
      <div class="flex-1">
        <h1 class="text-3xl md:text-4xl font-extrabold leading-snug drop-shadow-lg">
          {{ university?.name }} – Admission 2025, Courses, Fees, Cutoff,
          Placement, Ranking
        </h1>

        <div class="mt-4 space-y-4">
          <!-- Location + Rating -->
          <div class="flex flex-wrap items-center gap-6 text-sm">
            <span class="flex items-center gap-2 font-medium">
              <i class="fas fa-map-marker-alt text-red-400"></i>
              {{ university?.location }}
            </span>

            <span
              class="flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
            >
              <i class="fas fa-star"></i>
              {{ university?.details?.rating || "N/A" }} ({{
                university?.totalReviews || 0
              }} Reviews)
            </span>
          </div>

          <!-- Author + Date -->
          <div class="flex flex-wrap gap-6 text-xs opacity-90">
            <span class="flex items-center gap-2">
              <img
                :src="university?.admin?.image"
                alt="Admin Image"
                class="w-6 h-6 rounded-full object-cover border border-white/30"
              />
              Authored by {{ university?.admin?.name }}
            </span>

            <span class="flex items-center gap-2">
              <i class="fas fa-clock"></i>
              Updated {{ new Date(university?.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Buttons -->
      <div class="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">

        <router-link
          to="/college-compare"
          class="px-5 py-2.5 w-full sm:w-auto text-sm font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
        >
          <i class="fas fa-balance-scale mr-1"></i>
          Compare Colleges
        </router-link>

        <button
          class="px-5 py-2.5 w-full sm:w-auto rounded-lg bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
        >
          <i class="fas fa-paper-plane mr-1"></i>
          Apply Now
        </button>

        <button
          class="px-5 py-2.5 w-full sm:w-auto border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
        >
          <i class="fas fa-download mr-1"></i>
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
