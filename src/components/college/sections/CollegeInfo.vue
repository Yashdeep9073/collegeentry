<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

const router = useRouter();

// --- Data for Latest Updates Section ---
const allUpdates = ref([
  {
    id: 1,
    date: '2025-10-30',
    title: 'CLAT 2026 Registration Ends Tomorrow',
    description: 'The CLAT 2026 registration window will close on October 31, 2025, at consortiumofnlus.ac.in...',
  },
  {
    id: 2,
    date: '2025-10-29',
    title: 'GATE 2026 Application Form Correction Window Open',
    description: 'The GATE 2026 application form correction window has been opened at gate2026.iitg.ac.in...',
  },
  {
    id: 3,
    date: '2025-10-25',
    title: 'JEE Main 2026 Session 1 Dates Announced',
    description: 'NTA has announced the dates for JEE Main 2026 Session 1...',
  },
]);

const showAllUpdates = ref(false);
const initialUpdatesToShow = 2;

const displayedUpdates = computed(() => {
  return showAllUpdates.value ? allUpdates.value : allUpdates.value.slice(0, initialUpdatesToShow);
});

const hasMoreUpdates = computed(() => {
  return allUpdates.value.length > initialUpdatesToShow;
});

const toggleShowMore = () => {
  showAllUpdates.value = !showAllUpdates.value;
};

// --- Data for About Text ---
const aboutText = ref(
  "Lovely Professional University (LPU) was established in 2005. It has been consistently ranked as one of the top universities in the country. With its **600-acre campus**, LPU is one of the oldest private universities in the country. Lovely Professional University (LPU), Jalandhar, accredited with the highest **NAAC grade A++ (3.68/4)** and approved by **UGC, NCTE, PCI, COA, and BCI**, continues to achieve excellence in national and global rankings. In the **NIRF 2025**, LPU is ranked **31st overall**, with notable positions including **13th in Pharmacy, 17th in Architecture, 24th in Agriculture, 28th in Law, 44th in Research, 46th in Management, and 48th in Engineering**. LPU is placed with the **11–15th band among Indian universities** in the prestigious **Times Higher Education World University Rankings 2025** and in the **band 48th globally in Impact Rankings 2025**, and within the **251–300 band globally in THE Young University Rankings**. LPU also stands **6th in India in THE overall rankings, 4th in India and 109th globally in Innovation**, and **31st in India**, **661–668 globally in QS World Rankings 2026**. With over **200 programs** across diverse streams (agriculture, sciences, engineering, law, management, arts, and humanities), LPU offers a comprehensive academic environment. The university is also renowned for its **global placement records** and extensive corporate ties, making it a preferred choice for students nationwide."
);
const showFullAbout = ref(false);


// --- Data for Highlights Table ---
const highlights = ref([
  { label: 'Institution Type', value: 'Private', icon: 'fa-building' },
  { label: 'Total Faculty', value: '500', icon: 'fa-user-tie' },
  { label: 'Year of Establishment', value: '2005', icon: 'fa-calendar-alt' },
  { label: 'Genders Accepted', value: 'Co-Ed', icon: 'fa-venus-mars' },
  { label: 'Student Enrollment', value: '30,000', icon: 'fa-users' },
  { label: 'Total Area (in Acre)', value: '100', icon: 'fa-map' },
  { label: 'Construction Area (Sq. M)', value: '297727', icon: 'fa-ruler-combined' },
  { label: 'Website', value: 'www.lpu.in', icon: 'fa-link' },
  { label: 'Accredited by', value: 'NIRF, COA', icon: 'fa-certificate' },
  { label: 'Recognised by', value: 'DEB, NCTE, +3', icon: 'fa-gavel' },
]);


// --- Data for Rankings Table ---
const allRankings = ref([
    { id: 1, publisher: 'NIRF', year: '2025', rank: '#13', criteria: 'Pharmacy' },
    { id: 2, publisher: 'NIRF', year: '2025', rank: '#26', criteria: 'Dental' },
    { id: 3, publisher: 'THE', year: '2024', rank: '#48', criteria: 'Engineering' },
    { id: 4, publisher: 'NIRF', year: '2025', rank: '#38', criteria: 'Management' },
]);
const showAllRankings = ref(false);
const initialRankingsToShow = 2; // Show only 2 rows by default
const displayedRankings = computed(() => {
  return showAllRankings.value ? allRankings.value : allRankings.value.slice(0, initialRankingsToShow);
});

// --- Data for Courses & Fees Table ---
const allCourses = ref([
    { id: 1, course: 'BTech', fees: '₹10,04,242', duration: '4 Years' },
    { id: 2, course: 'MBA', fees: '₹8,48,000', duration: '2 Years' },
    { id: 3, course: 'MCA', fees: '₹4,00,000', duration: '3 Years' },
    { id: 4, course: 'B.P.Ed', fees: '₹2,00,000', duration: '3 Years' },
    { id: 5, course: 'BA', fees: '₹3,30,000', duration: '3 Years' },
    { id: 6, course: 'BBA', fees: '₹4,46,750', duration: '3 Years' },
    { id: 7, course: 'B.Pharmacy', fees: '₹9,60,000', duration: '4 Years' },
    { id: 8, course: 'BCA', fees: '₹5,80,000', duration: '3 Years' },
    { id: 9, course: 'BSc', fees: '₹4,44,800', duration: '3 Years' },
    { id: 10, course: 'B.Ed', fees: '₹1,20,000', duration: '2 Years' },
]);
const initialCoursesToShow = 10; // Show all 10 rows for now, but use v-for

// --- Navigation Function ---
const goToCoursesTab = () => {
    // Navigate to the dedicated 'Courses & Fees' tab
    // You'll need to adjust the path based on your Vue Router setup
    // Assuming the path is something like /college-details/LPU-Phagwara/courses-fees
    router.push({ path: '/colleges/LPU-Phagwara/courses-fees' });
};

</script>

<template>
  <div class="space-y-8">
    
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📢 Latest Update for LPU
      </h3>
      <div class="space-y-6">
        <div v-for="update in displayedUpdates" :key="update.id" class="border-b border-gray-100 pb-4 last:border-b-0">
          <div class="flex items-start text-red-600 font-medium mb-2">
            <i class="fas fa-calendar-alt text-lg mr-2 mt-1 flex-shrink-0"></i>
            <span class="text-base md:text-lg">
              {{ update.date }} - {{ update.title }}
            </span>
          </div>
          <p class="text-gray-700 leading-relaxed pl-8 pr-4 text-sm">
            {{ update.description }}
          </p>
        </div>
      </div>
      <div v-if="hasMoreUpdates" class="text-center pt-4">
        <button 
          @click="toggleShowMore" 
          class="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out text-sm"
        >
          {{ showAllUpdates ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
      <h3 class="text-xl font-bold text-gray-800 mb-4">📚 About Lovely Professional University</h3>
      <div 
        class="text-gray-700 leading-relaxed transition-max-height duration-500 ease-in-out overflow-hidden"
        :class="{'max-h-36 sm:max-h-28': !showFullAbout, 'max-h-full': showFullAbout}"
      >
        <p v-html="aboutText"></p>
        <div v-if="!showFullAbout" class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div class="text-center pt-2 relative">
        <button 
          @click="showFullAbout = !showFullAbout" 
          class="text-blue-600 hover:text-blue-800 font-semibold py-1 px-4 rounded-md transition duration-200 ease-in-out text-sm"
        >
          Show {{ showFullAbout ? 'Less' : 'More' }}
        </button>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📋 LPU Highlights
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
        <div 
          v-for="item in highlights" 
          :key="item.label" 
          class="flex items-center space-x-4 border-b border-gray-100 pb-2"
        >
          <div class="flex items-center text-gray-500 w-1/2 flex-shrink-0">
            <i :class="['fas mr-3 text-lg w-4 text-center', item.icon]"></i>
            <span class="font-medium text-sm">{{ item.label }}</span>
          </div>
          <div class="text-gray-900 font-semibold text-base w-1/2 truncate">
            <span v-if="item.label === 'Website'">
                <a :href="'https://' + item.value" target="_blank" class="text-blue-600 hover:underline">{{ item.value }}</a>
            </span>
            <span v-else>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="border-gray-200">

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        🏆 LPU Rankings
      </h3>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publisher</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ranking & Year</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Criteria</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="ranking in displayedRankings" :key="ranking.id">
              <!-- <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div v-if="ranking.publisher === 'NIRF'" class="flex items-center">
                    <img src="https://via.placeholder.com/30x30?text=NIRF" alt="NIRF Logo" class="w-6 h-6 mr-2">
                    {{ ranking.publisher }}
                </div>
                <span v-else>{{ ranking.publisher }}</span>
              </td> -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ ranking.rank }} in {{ ranking.year }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ ranking.criteria }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="allRankings.length > initialRankingsToShow" class="text-center pt-4">
        <button 
          @click="showAllRankings = !showAllRankings" 
          class="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out text-sm"
        >
          {{ showAllRankings ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📚 LPU Courses & Fees 2025
      </h3>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead class="bg-blue-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Course</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Average Fees</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Duration</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="course in allCourses" :key="course.id">
              <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer">{{ course.course }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{{ course.fees }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{{ course.duration }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-center">
                <button class="px-3 py-1 text-xs font-medium text-red-600 border border-red-400 rounded-md hover:bg-red-50 transition duration-150">
                    Apply Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center pt-6">
        <button 
          @click="goToCoursesTab" 
          class="px-6 py-2 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50 transition duration-200 flex items-center justify-center mx-auto text-sm"
        >
            More Courses <i class="fas fa-external-link-alt ml-2 text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>