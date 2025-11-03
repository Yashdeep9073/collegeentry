<script setup>
import { ref } from 'vue';

// --- Dynamic Props/Data Simulation for the focused course ---
const courseName = ref('BSc');
const courseFullName = ref('Full Form, Course Details, Eligibility, Courses List, Fees, Duration');
const courseDuration = ref('3 Years');
const averageFees = ref('INR 1,500 to 4,40,000 per year.');

// --- Icon data (Using Font Awesome for the flask/beaker icon) ---
// We will use a larger, styled icon to represent the course category (Science)
const courseIconClass = ref('fas fa-flask text-4xl'); 

</script>

<template>
  <div class="w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Main Header Container Card -->
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
        
        <!-- Top Section: Icon and Title -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <!-- Icon and Main Title -->
          <div class="flex items-start sm:items-center space-x-4 flex-grow">
            <!-- Styled Icon Container -->
            <div class="p-3 rounded-xl bg-blue-100 border-2 border-blue-300 flex-shrink-0">
              <!-- Using the Science icon to match the theme -->
              <i :class="courseIconClass" class="text-blue-600"></i>
            </div>
            
            <!-- Title Block -->
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">
                <span class="text-blue-700">{{ courseName }}:</span> {{ courseFullName }}
              </h1>
            </div>
          </div>
          
          <!-- Action Buttons (Stacked on small screens, inline on large) -->
          <div class="flex space-x-3 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
            
            <!-- Apply Now Button (Light Red Border) -->
            <button class="flex items-center justify-center space-x-2 py-2.5 px-4 sm:px-6 
                           border border-red-400 text-red-600 font-semibold 
                           rounded-lg shadow-sm hover:bg-red-50 transition duration-150 flex-grow sm:flex-grow-0">
              <span>Apply Now</span>
              <i class="fas fa-file-alt"></i>
            </button>
            
            <!-- Detailed Guide Button (Solid Red) -->
            <button class="flex items-center justify-center space-x-2 py-2.5 px-4 sm:px-6 
                           bg-red-600 text-white font-semibold 
                           rounded-lg shadow-lg hover:bg-red-700 transition duration-150 flex-grow sm:flex-grow-0">
              <span>Detailed Guide</span>
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>

        <!-- Bottom Section: Key Course Metrics -->
        <div class="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4 sm:gap-8">
            
            <!-- Duration Badge -->
            <div class="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full shadow-inner">
                <i class="fas fa-clock text-pink-600 mr-2"></i>
                Duration: {{ courseDuration }}
            </div>
            
            <!-- Fees Badge -->
            <div class="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full shadow-inner">
                <i class="fas fa-rupee-sign text-yellow-600 mr-2"></i>
                Avg Fees: {{ averageFees }}
            </div>
            
        </div>
        
      </div>
      <!-- End of Main Header Container Card -->
      
    </div>
  </div>
</template>

<style scoped>
/* Custom background gradient for the icon container for a subtle effect, although Tailwind is preferred */
.bg-blue-100 {
    background-color: #e6f0ff;
}
</style>