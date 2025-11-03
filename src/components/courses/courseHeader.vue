<script setup>
import { ref, computed } from 'vue';

// --- Dynamic Props/Data Simulation ---
// In a real application, these values would be passed in as props (defineProps)
// Here, we simulate them to make the component runnable and demonstrate the dynamic content.

const pageTitle = ref('Engineering Courses: Eligibility, Admission, Syllabus, Placements');
const authorName = ref('Mandali Shukla');
const publishDate = ref('Dec 10, 2023');
const introText = ref(
    "Engineering is one of the most popular majors in the nation. The best engineering courses in India are offered by several prestigious institutions and colleges, and 80% of the nation's youth study engineering. The engineering programmes are concentrated on different facets of the nation's development and provide a wide range of employment opportunities in both the public and private sectors."
);
const fullText = ref(
    "Engineering is one of the most popular majors in the nation. The best engineering courses in India are offered by several prestigious institutions and colleges, and 80% of the nation's youth study engineering. The engineering programmes are concentrated on different facets of the nation's development and provide a wide range of employment opportunities in both the public and private sectors. With numerous specialisations like Information Technology, Mechanical and Computer engineering, Metallurgy, and Chemical, India has some of the best colleges offering top-tier engineering programs. This page provides a comprehensive guide to eligibility, admission procedures, detailed syllabus, and placement statistics for all major engineering courses."
);

// --- State for "Show More" functionality ---
const showFullText = ref(false);

const displayedText = computed(() => {
    return showFullText.value ? fullText.value : introText.value;
});

const toggleText = () => {
    showFullText.value = !showFullText.value;
};

// --- Dummy Author Image ---
// Using a placeholder avatar URL for demonstration
const authorImageUrl = 'https://placehold.co/40x40/003366/ffffff?text=MS';

</script>

<template>
  <!-- Header Container with clean, light background -->
  <div class="bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- 1. Dynamic Page Title -->
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 border-b pb-4">
        {{ pageTitle }}
      </h1>

      <!-- 2. Content Card (Replicating the box structure in the image) -->
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
        
        <!-- Author and Date Row -->
        <div class="flex items-center space-x-3 mb-4">
          <img 
            :src="authorImageUrl" 
            alt="Author Avatar" 
            class="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
          <div class="text-sm">
            <p class="font-semibold text-gray-900">{{ authorName }}</p>
            <p class="text-xs text-gray-500">{{ publishDate }}</p>
          </div>
        </div>

        <!-- Dynamic Content -->
        <p class="text-base text-gray-700 leading-relaxed transition-all duration-500 ease-in-out">
          {{ displayedText }}
        </p>

        <!-- Show More/Less Button -->
        <div v-if="fullText.length > introText.length" class="mt-4 text-center">
          <button 
            @click="toggleText"
            class="text-red-600 hover:text-red-800 font-semibold py-1 px-4 text-sm transition duration-150"
          >
            {{ showFullText ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        
      </div>
      <!-- End of Content Card -->
      
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles ensure only this component is affected */
/* Minimal custom CSS needed due to heavy Tailwind usage */
</style>