<script setup>
import { ref } from "vue";

// Scholarship categories data
const scholarships = [
  {
    title: "State Wise Scholarships",
    icon: "fa-solid fa-map-location-dot",
  },
  {
    title: "Class Wise Scholarships",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    title: "Discipline Wise Scholarships",
    icon: "fa-solid fa-brain",
  },
  {
    title: "Course Wise Scholarships",
    icon: "fa-solid fa-flask",
  },
  {
    title: "Category Wise Scholarships",
    icon: "fa-solid fa-hands-praying",
  },
  {
    title: "Type Wise Scholarships",
    icon: "fa-solid fa-coins",
  },
  {
    title: "Gender Wise Scholarships",
    icon: "fa-solid fa-people-line",
  },
  {
    title: "Country Wise Scholarships",
    icon: "fa-solid fa-flag",
  },
];

// Optional: handle click
const handleClick = (item) => {
  alert(`You clicked: ${item.title}`);
};
</script>

<template>
  <section class="py-16 bg-[#f8f7f4]">
    <div class="max-w-7xl mx-auto px-5 text-center">

      <!-- Title -->
      <h2 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
        Explore Scholarships
      </h2>
      <p class="text-gray-600 mb-12 text-base md:text-lg">
        Search among 500+ government and competitive entrance exams
      </p>

      <!-- Scholarships Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
      >
        <div
          v-for="item in scholarships"
          :key="item.title"
          @click="handleClick(item)"
          class="group w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center justify-center cursor-pointer"
        >
          <!-- Icon -->
          <div
            class="text-red-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
          >
            <i :class="item.icon"></i>
          </div>
          <!-- Title -->
          <h3
            class="text-gray-800 font-medium text-lg leading-snug group-hover:text-blue-700 transition-colors"
          >
            {{ item.title }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth Fade Animation */
section {
  animation: fadeIn 0.7s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
