<script setup>
import { ref } from "vue";

// --- Data for Upcoming Exams ---
const upcomingExams = ref([
  // {
  //     id: 1,
  //     date: '22 Oct',
  //     name: 'JEE Mains',
  //     statusIcon: 'fas fa-exclamation-circle text-orange-500',
  // },
  // {
  //     id: 2,
  //     date: '15 Nov',
  //     name: 'NEET UG',
  //     statusIcon: 'fas fa-arrow-circle-right text-green-500',
  // },
]);

// --- Data for Entrance Exam Streams/Categories and Exams ---
const examCategories = ref([
  {
    name: "Engineering",
    icon: "fas fa-cogs",
    color: "text-blue-600",
    exams: ["JEE Main", "BITSAT", "VITEEE", "MHCET"],
  },
  {
    name: "Management",
    icon: "fas fa-briefcase",
    color: "text-green-600",
    exams: ["CAT", "XAT", "NMAT", "SNAP"],
  },
  {
    name: "Science",
    icon: "fas fa-flask",
    color: "text-red-600",
    exams: ["NEST", "CUET UG", "IIT JAM", "ICAR AIEEA"],
  },
  {
    name: "Pharmacy",
    icon: "fas fa-pills",
    color: "text-purple-600",
    exams: ["GPAT", "NIPER JEE", "AP EAMCET", "TS EAMCET"],
  },
  {
    name: "Law",
    icon: "fas fa-balance-scale",
    color: "text-yellow-600",
    exams: ["CLAT", "LSAT India", "AILET", "MH CET Law"],
  },
  {
    name: "Design",
    icon: "fas fa-palette",
    color: "text-pink-600",
    exams: ["NID DAT", "UCEED", "CEED", "FDDI AIST"],
  },
  {
    name: "Medical",
    icon: "fas fa-heartbeat",
    color: "text-red-700",
    exams: ["NEET UG", "AIIMS", "JIPMER", "KCET"],
  },
  {
    name: "Dental",
    icon: "fas fa-tooth",
    color: "text-teal-600",
    exams: ["NEET UG", "AIIMS", "JIPMER", "KCET"],
  },
  {
    name: "Architecture",
    icon: "fas fa-building",
    color: "text-orange-600",
    exams: ["NATA", "JEE Main Paper 2", "COMEDK", "UPSEE"],
  },
  {
    name: "Arts",
    icon: "fas fa-paint-brush",
    color: "text-indigo-600",
    exams: ["CUET UG", "DUET", "JNU CEE", "BHU PET"],
  },
  {
    name: "Agriculture",
    icon: "fas fa-leaf",
    color: "text-lime-600",
    exams: ["ICAR AIEEA", "UPCATET", "MP PAT", "CG PAT"],
  },
  {
    name: "Paramedical",
    icon: "fas fa-hand-holding-medical",
    color: "text-blue-700",
    exams: ["NEET UG", "AIIMS Paramedical", "JIPMER Paramedical", "CET"],
  },
  {
    name: "Education",
    icon: "fas fa-graduation-cap",
    color: "text-purple-700",
    exams: ["CTET", "UPTET", "NET JRF", "SET"],
  },
  {
    name: "Computer",
    icon: "fas fa-desktop",
    color: "text-gray-600",
    exams: ["BITSAT", "VITEEE", "JEE Main", "COMEDK"],
  },
]);

// State for the search input
const searchInput = ref("");
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6">
        Entrance Exams in India
      </h1>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        class="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      >
        <div
          class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            v-model="searchInput"
            type="text"
            placeholder="🔍 Search for an Entrance Exam"
            class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
            style="height: 50px"
          />
          <button
            class="sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-150 shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      <div
        class="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      >
        <h3
          class="font-bold text-lg text-gray-800 mb-4 border-b pb-3 border-gray-200"
        >
          Upcoming Exams
        </h3>
        <div class="space-y-4">
          <div
            v-for="exam in upcomingExams"
            :key="exam.id"
            class="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div class="flex items-center space-x-3">
              <div
                class="flex-shrink-0 text-center text-red-600 font-bold text-lg p-2 rounded-md bg-red-50 border border-red-200"
              >
                {{ exam.date.split(" ")[0] }}<br /><span class="text-xs">{{
                  exam.date.split(" ")[1]
                }}</span>
              </div>
              <p class="text-lg font-medium text-gray-800">{{ exam.name }}</p>
            </div>
            <i :class="exam.statusIcon" class="text-xl"></i>
          </div>
        </div>
        <div class="text-center mt-6">
          <button
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-md shadow-lg transition duration-150"
          >
            View All Exams
          </button>
        </div>
      </div>
    </div>

    <hr class="border-gray-200 max-w-7xl mx-auto" />

    <div
      class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <h3
        class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200"
      >
        Browse By Category
      </h3>

      <p class="text-gray-700 text-sm leading-relaxed mb-6">
        The importance of entrance exams in India is a well-established fact. An
        advanced level of competition, the objective of these entrance exams is
        to test the student's ability to handle academic challenges and perform
        under pressure. Every year, millions of students take various entrance
        exams across different streams to secure admission to their desired
        colleges and universities.
      </p>

      <div class="text-center mb-6">
        <button
          class="text-blue-600 hover:text-blue-800 font-medium py-1 px-4 text-sm"
        >
          Show More Description
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in examCategories"
          :key="category.name"
          class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition duration-300 hover:shadow-lg hover:border-blue-300"
        >
          <div class="flex items-center space-x-3 mb-4 border-b pb-3">
            <i :class="[category.icon, category.color]" class="text-3xl"></i>
            <h4 class="text-lg font-semibold text-gray-800">
              {{ category.name }} Exams
            </h4>
          </div>

          <div class="flex flex-wrap gap-2 mb-3">
            <button
              v-for="exam in category.exams"
              :key="exam"
              class="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 transition duration-150"
            >
              {{ exam }}
            </button>
          </div>

          <div class="mt-3 text-center">
            <button
              :class="[category.color]"
              class="text-sm font-medium hover:underline"
            >
              View All {{ category.name }} Exams
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <button
          class="bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white  font-bold py-3 px-8 rounded-lg shadow-lg transition duration-150"
        >
          <i class="fas fa-caret-down mr-2"></i> View All Categories
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Assuming Font Awesome is imported for icons. */
</style>
