<script setup>
import { ref } from 'vue';

// --- Data for Diploma Course Listings (Based on image_bd0b8f.png) ---
const diplomaCourses = ref([
    {
        id: 1,
        title: 'Diploma in Civil Engineering',
        averageFee: '₹3 - 10 LPA',
        duration: '3 Years',
        isNew: false
    },
    {
        id: 2,
        title: 'Diploma in Electrical Engineering',
        averageFee: '₹10K - 1 LPA',
        duration: '3 Years',
        isNew: true
    },
    {
        id: 3,
        title: 'Diploma in Fire & Safety Management',
        averageFee: '₹10K - 1 LPA',
        duration: '1 Year',
        isNew: false
    },
    {
        id: 4,
        title: 'Diploma in Computer Science',
        averageFee: 'INR 6,000 - 40,000 Per Year',
        duration: '3 Years',
        isNew: false
    },
]);
</script>

<template>
  <div class="space-y-6 p-4 sm:p-6 lg:p-8">

    <h3 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
        Browse Diploma Courses
    </h3>

    <div v-for="course in diplomaCourses" :key="course.id" 
         class="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center transition duration-300 hover:shadow-lg hover:border-red-400">
      
      <div class="flex-grow space-y-2 mb-4 md:mb-0">
        <h4 class="text-xl font-semibold text-gray-800 flex items-center">
            {{ course.title }}
            <span v-if="course.isNew" class="ml-3 px-2 py-0.5 text-xs font-bold text-green-700 bg-green-100 rounded-full">New</span>
        </h4>
        
        <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            <div class="flex items-center">
                <i class="fas fa-money-bill-wave text-blue-500 mr-1.5"></i>
                <span class="font-medium">Average fee:</span> {{ course.averageFee }}
            </div>
            
            <div class="flex items-center">
                <i class="fas fa-clock text-blue-500 mr-1.5"></i>
                <span class="font-medium">Duration:</span> {{ course.duration }}
            </div>
        </div>

        <div class="flex flex-wrap gap-4 pt-2 text-sm">
            <a href="#" class="text-blue-600 hover:underline font-medium">Syllabus & Subjects</a>
            <span class="text-gray-400">|</span>
            <a href="#" class="text-blue-600 hover:underline font-medium">Job, Scope & Salary</a>
        </div>
      </div>
      
      <div class="flex-shrink-0">
        <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-md shadow-lg transition duration-150 transform hover:scale-105">
          Apply Now
        </button>
      </div>
    </div>
    
    <div class="text-center pt-6">
        <button class="text-red-600 hover:text-red-800 font-bold py-2 px-4 text-base border border-red-400 rounded-md hover:bg-red-50 transition duration-150">
            Load More Diploma Courses
        </button>
    </div>

  </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>