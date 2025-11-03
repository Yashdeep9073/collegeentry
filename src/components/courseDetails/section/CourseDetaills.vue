<script setup>
import { ref } from 'vue';

// --- Data for Table of Contents (Based on image_11a6c2.png) ---
const tableOfContents = ref([
    { title: 'What is BSc Course?', anchor: '#what-is-bsc' },
    { title: 'BSc Eligibility Criteria', anchor: '#bsc-eligibility' },
    { title: 'Why Choose a BSc Course?', anchor: '#why-bsc' },
    { title: 'BSc Admission 2024', anchor: '#bsc-admission' },
    { title: 'BSc Entrance Exam', anchor: '#bsc-entrance-exam' },
    // Add more sections as needed
]);

// --- Data for About/Overview Content (Based on image_11a6c2.png) ---
const authorName = ref('Shristi T');
const aboutText = ref({
    p1: "BSc or Bachelor of Science is a **three-year** course that deals with a variety of research-oriented studies of science under several streams and also focuses on the application of science concepts in real-life scenarios. BSc core subjects include mathematics, physics, chemistry, biology, computer science, etc.",
    p2: "BSc Admission 2024 requires students to have a **minimum of 50%** in their high school degree (10+2) with a science stream and qualify with the required cut-off marks in BSc entrance exams such as **CUET-UG, NPAT, LPU NEST**, etc.",
    p3: "The **BSc course fees is between INR 1,500-4,40,000** per year, which varies according to location and college. The BSc Colleges in Bangalore have fees ranging between **INR 50,000-3,00,000** per year, whereas, the colleges in Delhi have fees between **INR 17,000-50,500** per year while the top Colleges in Hyderabad have fees ranging from **INR 1,00,000-2,00,000** per year.",
});

</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:sticky lg:top-20">
          <h4 class="font-bold text-lg text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
            Table of Contents
            <i class="fas fa-chevron-down text-gray-500 text-sm"></i>
          </h4>
          <ul class="space-y-2 text-gray-700 font-medium text-sm">
            <li v-for="item in tableOfContents" :key="item.anchor">
              <a :href="item.anchor" class="flex items-center hover:text-red-600 transition duration-150">
                <i class="fas fa-caret-right text-red-600 mr-2 flex-shrink-0"></i>
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-8">
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-start space-x-3 mb-4">
                <img 
                    src="https://placehold.co/40x40/003366/ffffff?text=ST" 
                    alt="Author Avatar" 
                    class="w-10 h-10 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
                />
                <div class="text-sm pt-1">
                    <p class="font-semibold text-gray-900">{{ authorName }}</p>
                    <p class="text-xs text-blue-600 font-medium">Verified Expert</p>
                </div>
            </div>

            <div class="space-y-4 text-gray-700 leading-relaxed">
                <p v-html="aboutText.p1" id="what-is-bsc"></p>
                <p v-html="aboutText.p2" id="bsc-eligibility"></p>
                <p v-html="aboutText.p3" id="why-bsc"></p>
            </div>
            
            <div class="mt-8 pt-4 border-t border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-3" id="bsc-admission">BSc Admission 2024</h3>
                <p class="text-gray-600">Detailed admission steps, application deadlines, and counselling process for the BSc course would be placed here.</p>
            </div>
            <div class="mt-8 pt-4 border-t border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-3" id="bsc-entrance-exam">BSc Entrance Exam</h3>
                <p class="text-gray-600">Information about CUET-UG, NPAT, LPU NEST, and other relevant entrance exams and their schedules.</p>
            </div>
        </div>
        
      </div>
    </div>

    <hr class="border-gray-300">

    </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>