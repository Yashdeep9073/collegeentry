<script setup>
import { ref } from 'vue';

// --- Data for Admission Highlights (Based on the general UI style) ---
const admissionHighlights = ref([
    {
        icon: 'fas fa-graduation-cap',
        title: 'Courses Offered',
        value: 'UG, PG, PhD, Dual Degree, Doctoral'
    },
    {
        icon: 'fas fa-school',
        title: 'Institute Type',
        value: 'Public/Government Institute'
    },
    {
        icon: 'fas fa-calendar-alt',
        title: 'Admission Status',
        value: 'Ongoing for 2025'
    },
    {
        icon: 'fas fa-envelope-open-text',
        title: 'Application Mode',
        value: 'Online'
    },
]);

// --- Data for Important Dates (Placeholder/Sample) ---
const importantDates = ref([
    { course: 'B.Tech', event: 'JEE Advanced Exam Date', date: 'May 2025 (Tentative)' },
    { course: 'M.Tech', event: 'GATE Registration Window', date: 'Aug - Oct 2025 (Tentative)' },
    { course: 'MBA', event: 'CAT Exam Date', date: 'Nov 2025 (Tentative)' },
    { course: 'M.Sc', event: 'IIT JAM Exam Date', date: 'Feb 2026 (Tentative)' },
]);

// --- Data for Admission Helpline ---
const admissionHelpline = ref([
    { type: 'Phone', contact: '+91-44-2257 8280' },
    { type: 'Email', contact: 'admissions@iitm.ac.in' },
    { type: 'Address', contact: 'Indian Institute of Technology Madras, Chennai - 600036' },
]);
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
        📢 Latest Update for IIT Madras
      </h3>
      <div class="space-y-4">
        <div class="flex items-start">
          <i class="fas fa-calendar-alt text-red-500 mr-3 mt-1 flex-shrink-0"></i>
          <div>
            <p class="font-medium text-gray-800">2025-10-30 GATE 2026 Application Form Correction Window Open</p>
            <p class="text-sm text-gray-700">The GATE 2026 application form correction window has been opened at gate2026.iitg.ac.in.</p>
          </div>
        </div>
        <div class="flex items-start">
          <i class="fas fa-calendar-alt text-red-500 mr-3 mt-1 flex-shrink-0"></i>
          <div>
            <p class="font-medium text-gray-800">2025-10-31 Last Date for M.Tech/PhD Applications</p>
            <p class="text-sm text-gray-700">The application deadline for various M.Tech and PhD programs for the January 2026 session is tomorrow.</p>
          </div>
        </div>
        <div class="text-center pt-2">
            <button class="text-red-600 hover:text-red-800 font-semibold py-1 px-4 text-sm">Show More</button>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
        📚 IIT Madras Admission Overview
      </h3>
      <p class="text-gray-700 text-base leading-relaxed mb-4">
        **IIT Madras admission 2025 is ongoing**. The institute offers courses like **B.Tech, M.Tech, M.Sc, MBA, MA, EMBA, PhD, and dual degree programs**.
      </p>
      <p class="text-gray-700 text-base leading-relaxed mb-4">
        IIT Madras has a separate management school called the **Department of Management Studies or DoMS IIT Madras**. The DoMS IIT Madras is dedicated to management education and offers courses like **MBA, EMBA**, etc..
      </p>
      <p class="text-gray-700 text-base leading-relaxed">
        Various other entrance exams are accepted for Indian Institute of Technology Madras admission including **GATE/IIT JAM/GMAT/JEE Advanced/CSIR NET/UGC NET**, etc.
        IIT Madras admission to M.Tech and M.Sc programs are based on **GATE and IIT JAM scores**, respectively. The institute accepts **JEE Advanced scores** for admission to its B.Tech program.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-bold text-lg text-gray-800 mb-3 border-b pb-2">Table of Contents</h4>
        <ul class="space-y-2 text-blue-600 font-medium text-sm">
          <li><a href="#admission-dates" class="hover:underline">IIT Madras Admission: Important Dates 2025</a></li>
          <li><a href="#btech-admission" class="hover:underline">IIT Madras B.Tech Admission</a></li>
          <li><a href="#pg-admission" class="hover:underline">IIT Madras PG Admission 2025</a></li>
          <li><a href="#integrated-admission" class="hover:underline">IIT Madras Integrated Admission 2025</a></li>
          <li><a href="#application-process" class="hover:underline">IIT Madras Application Process</a></li>
          <li><a href="#entrance-exams" class="hover:underline">IIT Madras Entrance Exams 2025</a></li>
          <li><a href="#admission-helpline" class="hover:underline">IIT Madras Admission Helpline 2025</a></li>
          <li><a href="#admission-highlights" class="hover:underline">IIT Madras Admission Highlights</a></li>
        </ul>
      </div>

      <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200" id="admission-highlights">
        <h4 class="font-bold text-lg text-gray-800 mb-4 border-b pb-2">✨ IIT Madras Admission Highlights</h4>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="item in admissionHighlights" :key="item.title" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
            <i :class="item.icon" class="text-blue-600 w-5 h-5 flex-shrink-0"></i>
            <div>
              <p class="text-xs font-semibold text-gray-500">{{ item.title }}</p>
              <p class="text-sm text-gray-900 font-medium">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="border-gray-200">

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200" id="admission-dates">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📅 IIT Madras Admission: Important Dates 2025
      </h3>
      <p class="text-sm text-gray-600 mb-4">Dates are tentative and subject to change by the conducting body.</p>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead class="bg-blue-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Course</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Event</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in importantDates" :key="item.course">
              <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{{ item.course }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{{ item.event }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <hr class="border-gray-200">

    <h2 class="text-2xl font-bold text-gray-800 pt-4" id="btech-admission">IIT Madras B.Tech Admission</h2>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p class="text-gray-700">Admission is based on **JEE Advanced** scores followed by JoSAA Counselling.</p>
      <button class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">View Detailed Eligibility</button>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 pt-4" id="pg-admission">IIT Madras PG Admission 2025</h2>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p class="text-gray-700">M.Tech admissions require a valid **GATE** score, and M.Sc admissions require **IIT JAM** scores.</p>
      <button class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">View All PG Courses</button>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 pt-4" id="integrated-admission">IIT Madras Integrated Admission 2025</h2>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p class="text-gray-700">Integrated/Dual Degree programs are also available, with admission primarily through **JEE Main** and **JEE Advanced**.</p>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 pt-4" id="entrance-exams">IIT Madras Entrance Exams 2025</h2>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p class="text-gray-700">The institute accepts **GATE, IIT JAM, GMAT, JEE Advanced, CSIR NET, UGC NET**, etc., for various programs.</p>
    </div>
    
    <h2 class="text-2xl font-bold text-gray-800 pt-4" id="application-process">IIT Madras Application Process</h2>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p class="text-gray-700">The application process is typically **online**. For B.Tech, it is handled via JoSAA, and for PG programs, it is often via the respective exam portals (GATE/JAM) or the IITM research portal.</p>
      <button class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Go to Application Portal</button>
    </div>

    <hr class="border-gray-200">

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200" id="admission-helpline">
      <h3 class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
        📞 IIT Madras Admission Helpline 2025
      </h3>
      <div class="space-y-4">
        <div v-for="contact in admissionHelpline" :key="contact.type" class="flex items-center space-x-4">
          <i :class="{'fas fa-phone-alt': contact.type === 'Phone', 'fas fa-envelope': contact.type === 'Email', 'fas fa-map-marker-alt': contact.type === 'Address'}" class="text-red-600 text-lg w-5"></i>
          <div>
            <p class="text-sm font-semibold text-gray-500">{{ contact.type }}</p>
            <p class="text-base text-gray-800">{{ contact.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>