<script setup>
import { ref } from 'vue';

// --- Data for Course Streams and Sub-Courses ---
const courseStreams = ref([
    {
        name: 'Engineering',
        icon: 'fas fa-cogs',
        color: 'text-blue-600',
        courses: ['B.Tech', 'B.E', 'M.Tech', 'M.E'],
    },
    {
        name: 'Management',
        icon: 'fas fa-briefcase',
        color: 'text-green-600',
        courses: ['BBA', 'MBA', 'BBM', 'MMS'],
    },
    {
        name: 'Science',
        icon: 'fas fa-flask',
        color: 'text-red-600',
        courses: ['B.Sc', 'M.Sc', 'B.F.Sc', 'M.F.Sc'],
    },
    {
        name: 'Pharmacy',
        icon: 'fas fa-pills',
        color: 'text-purple-600',
        courses: ['B.Pharma', 'M.Pharma', 'D.Pharma', 'Pharma D'],
    },
    {
        name: 'Law',
        icon: 'fas fa-balance-scale',
        color: 'text-yellow-600',
        courses: ['LL.B', 'LL.M', 'DTL', 'Diploma in Labor Law'],
    },
    {
        name: 'Design',
        icon: 'fas fa-palette',
        color: 'text-pink-600',
        courses: ['B.Des', 'M.Des', 'Diploma in Interior Design', 'Diploma in Fashion'],
    },
    {
        name: 'Commerce',
        icon: 'fas fa-chart-line',
        color: 'text-cyan-600',
        courses: ['B.Com', 'M.Com', 'CFA', 'MFC'],
    },
    {
        name: 'Medical',
        icon: 'fas fa-heartbeat',
        color: 'text-red-700',
        courses: ['MBBS', 'BAMS', 'BUMS', 'BHMS'],
    },
    {
        name: 'Dental',
        icon: 'fas fa-tooth',
        color: 'text-teal-600',
        courses: ['BDS', 'MDS', 'MDS Orthodontics', 'MDS Periodontics'],
    },
]);

// --- Data for Trending Courses ---
const trendingCourses = ref(['BBA', 'BCA', 'M.Des', 'BDes', 'BSc']);

// State for the search input
const searchInput = ref('');

</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          v-model="searchInput"
          type="text"
          placeholder="🔍 Search for Courses, Degree or Certification"
          class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
        />
        <button
          class="sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
        >
          Search
        </button>
      </div>

      <div class="mt-4">
        <span class="text-sm font-semibold text-gray-700 mr-3">Trending Courses:</span>
        <div class="inline-flex flex-wrap gap-2 mt-2">
          <span 
            v-for="course in trendingCourses" 
            :key="course"
            class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition duration-150"
          >
            {{ course }}
          </span>
        </div>
      </div>
    </div>
    
    <hr class="border-gray-200">

    <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
        🧭 Explore course by stream
      </h3>

      <p class="text-gray-700 text-sm leading-relaxed mb-6">
        Deciding what course students want to pursue in India is a very important and difficult decision in every student's life. Courses in India are available in students in many streams and subjects, making it possible for the aspirants to pursue their dream careers.
      </p>
      
      <div class="text-center mb-6">
        <button class="text-blue-600 hover:text-blue-800 font-medium py-1 px-4 text-sm">
          Show More
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="stream in courseStreams" 
          :key="stream.name"
          class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition duration-300 hover:shadow-lg hover:border-blue-300"
        >
          
          <div class="flex items-center space-x-3 mb-4 border-b pb-3">
            <i :class="[stream.icon, stream.color]" class="text-3xl"></i>
            <h4 class="text-lg font-semibold text-gray-800">{{ stream.name }}</h4>
          </div>

          <div class="flex flex-wrap gap-2 mb-3">
            <button
              v-for="course in stream.courses"
              :key="course"
              class="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 transition duration-150"
            >
              {{ course }}
            </button>
          </div>
          
          <div class="mt-3 text-center">
            <button :class="[stream.color]" class="text-sm font-medium hover:underline">
              View All {{ stream.name }} Courses
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-150">
          <i class="fas fa-caret-down mr-2"></i> View All Streams
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles here, or rely on global Tailwind imports */
</style>