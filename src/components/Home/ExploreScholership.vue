<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import CountryWiseScholarships from "/CountryWiseScholarships.png";
import GenderWiseScholarships from "/GenderWiseScholarships.png";
import TypeWiseScholarships from "/TypeWiseScholarships.png";
import CourseWiseScholarships from "/CourseWiseScholarships.png";
import StateeWiseScholarships from "/StateWiseScholarships.png";
import ClasseWiseScholarships from "/ClassWiseScholarships.png";
import DisciplineWiseScholarships from "/DisciplineWiseScholarships.png";
import CategoryWiseScholarships from "/CategoryWiseScholarships.png";

// Scholarship categories data
const scholarships = [
  {
    title: "State Wise Scholarships",
    image: StateeWiseScholarships,
  },
  {
    title: "Class Wise Scholarships",
    image: ClasseWiseScholarships,
  },
  {
    title: "Discipline Wise Scholarships",
    image: DisciplineWiseScholarships,
  },
  {
    title: "Course Wise Scholarships",
    image: CourseWiseScholarships,
  },
  {
    title: "Category Wise Scholarships",
    image: CategoryWiseScholarships,
  },
  {
    title: "Type Wise Scholarships",
    image: TypeWiseScholarships,
  },
  {
    title: "Gender Wise Scholarships",
    image: GenderWiseScholarships,
  },
  {
    title: "Country Wise Scholarships",
    image: CountryWiseScholarships,
  },
];

// Optional: handle click
function goToScholarship() {
  router.push(`/scholarships`);
}
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
          @click="goToScholarship(item)"
          class="group w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center justify-center cursor-pointer"
        >
          <!-- Icon -->
          <div class="mb-4">
            <img
              :src="item.image"
              alt=""
              class="w-16 h-16 object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
            />
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
