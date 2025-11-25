<script setup>
import { ref } from "vue";

const activeCourse = ref("B.Ed"); // default selected

const courses = [
  "B.Ed",
  "BBA",
  "BCA",
  "BCom",
  "MBA in Finance",
  "MCA",
  "BSc Nursing",
  "MBA",
  "BTech",
  "BSc",
];

const courseContent = {
  "B.Ed": ["B.Ed Admission", "B.Ed Syllabus", "B.Ed Colleges", "B.Ed Jobs"],
  BBA: ["BBA Admission", "BBA Fees", "BBA Syllabus", "BBA Jobs"],
  BCA: ["BCA Admission", "BCA Syllabus", "BCA Jobs", "BCA Subjects"],
  BCom: [
    "BCom Admission",
    "BCom Specialization",
    "BCom Jobs",
    "BCom Fees",
    "BCom Syllabus",
  ],
  "MBA in Finance": [
    "MBA in Finance Course",
    "MBA in Finance Syllabus",
    "MBA in Finance Jobs",
    "Top MBA Finance Colleges",
  ],
  MCA: ["MCA Course", "MCA Colleges", "MCA Jobs", "MCA Syllabus"],
  "BSc Nursing": [
    "BSc Nursing Course",
    "BSc Nursing Syllabus",
    "BSc Nursing Jobs",
  ],
  MBA: ["MBA Admission", "MBA Specializations", "MBA Jobs", "MBA Colleges"],
  BTech: [
    "BTech Admission",
    "BTech Branches",
    "Top Engineering Colleges",
    "BTech Fees",
  ],
  BSc: [
    "BSc Admission",
    "BSc Syllabus",
    "BSc Jobs",
    "BSc Fees",
    "BSc Specialization",
  ],
};

const setCourse = (course) => {
  activeCourse.value = course;
};
</script>

<template>
  <section class="py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Trending Courses
      </h2>

      <!-- ✅ Course Chips -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="course in courses"
          :key="course"
          @click="setCourse(course)"
          class="px-5 py-2 rounded-full border text-sm transition"
          :class="
            activeCourse === course
              ? 'bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white'
              : 'bg-white text-gray-600 border-red-400 hover:bg-red-50'
          "
        >
          {{ course }}
        </button>
      </div>

      <!-- ✅ Cards Under Selected Course -->
      <transition name="fade" mode="out-in">
        <div
          :key="activeCourse"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          <div
            v-for="item in courseContent[activeCourse]"
            :key="item"
            class="bg-white rounded-lg shadow-sm hover:shadow-md p-5 text-center transition hover:-translate-y-1 border cursor-pointer"
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
