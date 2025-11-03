<script setup>
import { ref } from "vue";

const activeExam = ref("CLAT"); // default selected

const exams = [
  "CLAT",
  "CAT",
  "NEET",
  "JEE Main",
  "JEE Advanced",
  "WBJEE",
  "CUET",
  "AP EAMCET",
  "TS EAMCET",
  "TS LAWCET"
];

const examContent = {
  CLAT: [
    "CLAT 2026",
    "CLAT Mock Test 2026",
    "CLAT Exam Pattern 2026",
    "CLAT Syllabus 2026",
    "CLAT Exam Dates 2026",
    "CLAT Previous Years Papers",
  ],
  CAT: ["CAT 2026", "CAT Mock Test", "CAT Exam Pattern", "CAT Colleges"],
  NEET: ["NEET 2026", "NEET Syllabus", "NEET Mock Tests", "NEET Top Colleges"],
  "JEE Main": ["JEE Main 2026", "JEE Main Syllabus", "JEE Main Papers", "Top Engineering Colleges"],
  "JEE Advanced": ["JEE Advanced Prep", "Syllabus", "Top IIT Colleges"],
  WBJEE: ["WBJEE 2026 Guide", "Colleges", "Syllabus"],
  CUET: ["CUET 2026", "CUET Preparation", "CUET Pattern"],
  "AP EAMCET": ["AP EAMCET 2026", "Engineering Colleges", "Counselling Info"],
  "TS EAMCET": ["TS EAMCET Details", "Mock Tests", "Eligibility"],
  "TS LAWCET": ["TS LAWCET Overview", "Colleges", "Important Dates"],
};

const setExam = (exam) => {
  activeExam.value = exam;
};
</script>

<template>
  <section class="py-14 bg-[#f5f4f1]">
    <div class="max-w-7xl mx-auto px-4 text-center">

      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
Top School Exams in India

      </h2>

      <!-- ✅ Exam Chips -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="exam in exams"
          :key="exam"
          @click="setExam(exam)"
          class="px-5 py-2 rounded-full border text-sm transition"
          :class="activeExam === exam 
            ? 'bg-red-500 text-white border-red-500 shadow-md' 
            : 'bg-white text-gray-600 border-red-400 hover:bg-red-50'"
        >
          {{ exam }}
        </button>
      </div>

      <!-- ✅ Cards Under Selected Exam -->
      <transition name="fade" mode="out-in">
        <div
          :key="activeExam"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          <div
            v-for="item in examContent[activeExam]"
            :key="item"
            class="bg-white rounded-lg shadow-sm hover:shadow-md p-5 text-center transition hover:-translate-y-1 cursor-pointer border"
          >
            <p class="text-gray-800 font-medium text-sm">{{ item }}</p>
          </div>
        </div>
      </transition>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>





