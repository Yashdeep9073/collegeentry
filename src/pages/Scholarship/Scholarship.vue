<script setup>
import { ref } from 'vue';

// --- Data for Scholarship Categories (Based on image_1dddc2.png) ---
const scholarshipCategories = ref([
    'Undergraduate Scholarships', 
    'PhD Scholarships', 
    'Post Graduate Scholarships', 
    'High School Scholarships', 
    'Higher Secondary Scholarships'
]);

// State for the active category tab
const activeCategory = ref('Undergraduate Scholarships');

// --- Data for Scholarship Cards (Placeholder content matching the UI structure) ---
const scholarships = ref([
    {
        name: 'UCC Ireland Meritorious Scholarship for Indian Students',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-UCC',
        link: '#',
    },
    {
        name: 'Swami Vivekananda Merit-cum-Means Scholarship (SVMCM) 2024',
        status: 'Last Date, Eligibility, Apply',
        imagePlaceholder: 'SCH-SVMCM',
        link: '#',
    },
    {
        name: 'Lila Poonawalla Foundation Scholarship',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-LPF',
        link: '#',
    },
    {
        name: 'Assam Scholarship',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-ASSAM',
        link: '#',
    },
    {
        name: 'Kotak Kanya Scholarship',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-KOTAK',
        link: '#',
    },
    {
        name: 'Prime Money Scholarship 2023',
        status: 'Last Date, Status, Amount, Eligibility',
        imagePlaceholder: 'SCH-PRIME',
        link: '#',
    },
    {
        name: 'Samantor Scholarship',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-SAM',
        link: '#',
    },
    {
        name: 'Merit Cum Means Scholarship for Professional and Technical Courses',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-MCM',
        link: '#',
    },
    {
        name: 'Aikyashree Scholarship',
        status: 'Details, Context, Team',
        imagePlaceholder: 'SCH-AIKYA',
        link: '#',
    },
    {
        name: 'Aghaz Islam Scholarship 2023',
        status: 'Last Date, Eligibility, Amounts, Apply',
        imagePlaceholder: 'SCH-AGHAZ',
        link: '#',
    },
]);

// Search input state
const searchInput = ref('');

// Function to handle category tab clicks
const selectCategory = (category) => {
    activeCategory.value = category;
    // In a real application, this would trigger a data fetch/filter
};

</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
        Top Scholarships in India and Abroad
      </h1>
      
      <div class="bg-white p-5 rounded-lg shadow-lg border border-gray-200">
        <input
          v-model="searchInput"
          type="text"
          placeholder=" Search for Scholarship Details"
          class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-700 shadow-sm transition duration-150"
        />
      </div>
    </div>

    <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 class="text-xl font-bold text-gray-800 mb-4">SCHOLARSHIPS IN INDIA</h2>

      <p class="text-gray-700 text-sm leading-relaxed mb-4">
        Various scholarships in India offer financial assistance to aspiring students who want to pursue higher studies. It also brings an awareness of education amongst the students. The government and various public and private organizations offer various scholarships in India to deserving students. On the contrary, scholarships are available to all students, and it is easy to apply. Listed below are some of the scholarships which are available in India.
      </p>
      
      <div class="text-center mb-6">
        <button class="text-red-600 hover:text-red-800 font-medium py-1 px-4 text-sm">
          Show More
        </button>
      </div>

      <div class="overflow-x-auto mb-6">
        <div class="flex space-x-4 border-b border-gray-200">
          <button
            v-for="category in scholarshipCategories"
            :key="category"
            @click="selectCategory(category)"
            :class="{
              'text-red-600 border-red-600 font-semibold': activeCategory === category,
              'text-gray-600 border-transparent hover:text-red-600': activeCategory !== category
            }"
            class="whitespace-nowrap px-4 py-2 text-sm border-b-2 transition duration-150"
          >
            {{ category }}
          </button>
          <div class="flex items-center text-gray-400">
             <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a 
          v-for="(scholarship, index) in scholarships" 
          :key="index" 
          :href="scholarship.link"
          class="block bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden transition duration-300 hover:shadow-xl group"
        >
          <div class="bg-gray-100 h-32 flex items-center justify-center border-b border-gray-200">
            <span class="text-gray-400 text-lg font-semibold">{{ scholarship.imagePlaceholder }}</span>
            </div>

          <div class="p-4">
            <h4 class="text-base font-semibold text-gray-800 group-hover:text-red-600 transition duration-150 line-clamp-2 mb-1">
              {{ scholarship.name }}
            </h4>
            <p class="text-xs text-gray-500">College Entry Context Team</p>
            <p class="text-xs font-medium text-red-500 mt-2">{{ scholarship.status }}</p>
          </div>
        </a>
      </div>

      <div class="mt-8 text-center">
        <button class="bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white font-bold py-3 px-8 rounded-lg  transition duration-150 uppercase tracking-wide text-sm">
          VIEW ALL UNDERGRADUATE SCHOLARSHIPS
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Assuming Font Awesome is imported for icons. */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>