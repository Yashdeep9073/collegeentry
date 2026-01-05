<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("colleges");
const FETCH_ALL_STREAM_COUNT = import.meta.env.VITE_STREAM_COUNT;
const FETCH_ALL_COURSE_STREAM_COUNT = import.meta.env.VITE_COURSE_STREAM_COUNT;

const FETCH_ALL_EXAM_CATEGORY = import.meta.env.VITE_FETCH_ALL_EXAM_CATEGORY;

const tabs = ["colleges", "exams", "courses"];

/* ✅ DATA FOR COLLEGES */
const collegeCategories = ref([
  { name: "Agriculture", count: 0, icon: "fa-tractor" },
  { name: "Computer Science", count: 0, icon: "fa-computer" },
  { name: "Engineering", count: 0, icon: "fa-gears" },
  { name: "Hotel Management", count: 0, icon: "fa-hotel" },
  { name: "Management", count: 0, icon: "fa-chart-line" },
  { name: "Medical", count: 0, icon: "fa-stethoscope" },
  { name: "Pharmacy", count: 0, icon: "fa-prescription-bottle-medical" },
  { name: "Science", count: 0, icon: "fa-flask" },
]);

/* ✅ DATA FOR EXAMS */
const examCategories = ref([]);

/* ✅ DATA FOR COURSES */
const courseCategories = ref([]);


const fetchCollegeCounts = async () => {
  try {
    const res = await axios.get(FETCH_ALL_STREAM_COUNT);

    collegeCategories.value = res.data.data.map((stream) => ({
      name: stream.name,
      count: stream.collegeCount,
      icon: stream.icon || "fa-graduation-cap", // fallback icon
    }));
  } catch (err) {
    console.error("Error fetching college counts:", err);
  }
};
const fetchCourseCounts = async () => {
  try {
    const res = await axios.get(FETCH_ALL_COURSE_STREAM_COUNT);

    courseCategories.value = res.data.data.map((stream) => ({
      name: stream.name,
      count: stream.courseCount,
      icon: stream.icon || "fa-graduation-cap", // fallback icon
    }));
  } catch (err) {
    console.error("Error fetching college counts:", err);
  }
};

const fetchExamCategories = async () => {
  try {
    const res = await axios.get(FETCH_ALL_EXAM_CATEGORY);
    const categories = res.data.data;

    examCategories.value = categories.map((cat) => ({
      name: cat.name,
      icon: cat.icon, // icon is URL
    }));
  } catch (err) {
    console.error("Error fetching exam categories:", err);
  }
};


onMounted(() => {
  fetchCollegeCounts();
  fetchExamCategories();
  fetchCourseCounts();
});

/* ✅ NAVIGATION HANDLERS */
const goToCollege = (name) =>
  router.push(`/colleges?category=${encodeURIComponent(name)}`);
const goToExam = () => router.push(`/exams`);
const goToCourse = (name) =>
  router.push(`/courses/${encodeURIComponent(name)}`);
</script>

<template>
  <section class="py-14 bg-[#f5f4f1]">
    <div class="max-w-7xl mx-auto text-center px-4">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800">
        Explore Colleges, Exams & Courses Curated For You
      </h2>

      <!-- ✅ TABS -->
      <div class="flex justify-center mt-6 gap-3">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-6 py-2 rounded-md border transition capitalize"
          :class="
            activeTab === tab
              ? 'bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
          "
        >
          {{ tab }}
        </button>
      </div>

      <!-- ✅ COLLEGES GRID -->
      <div
        v-if="activeTab === 'colleges'"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10"
      >
        <div
          v-for="item in collegeCategories"
          :key="item.name"
          @click="goToCollege(item.name)"
          class="cursor-pointer bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-1 border"
        >
          <!-- ICON -->
          <img
            v-if="item.icon"
            :src="item.icon"
            class="w-10 h-10 mb-2 object-contain"
          />

          <i
            v-else
            :class="`fa-solid ${item.icon} text-3xl text-red-600 mb-2`"
          ></i>

          <p class="font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-gray-500 text-sm">{{ item.count }} Colleges</p>
        </div>
      </div>

      <!-- ✅ EXAMS GRID -->
      <div
        v-if="activeTab === 'exams'"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10"
      >
        <div
          v-for="item in examCategories"
          :key="item.name"
          @click="goToExam(item.name)"
          class="cursor-pointer bg-white shadow hover:shadow-md transition rounded-xl p-6 text-center hover:-translate-y-1 border"
        >
          <img :src="item.icon" class="w-12 h-12 mx-auto mb-3 object-contain" />

          <p class="font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-gray-500 text-sm">{{ item.count }}</p>
        </div>
      </div>

      <!-- ✅ COURSES GRID -->
  <!-- ✅ COURSES GRID -->
<div
  v-if="activeTab === 'courses'"
  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10"
>
  <div
    v-for="item in courseCategories"
    :key="item.name"
    @click="goToCourse(item.name)"
    class="cursor-pointer bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-1 border"
  >
    <!-- ICON -->
    <img
      v-if="item.icon"
      :src="item.icon"
      class="w-10 h-10 mb-2 object-contain"
    />

    <i
      v-else
      class="fa-solid fa-graduation-cap text-3xl text-purple-600 mb-2"
    ></i>

    <p class="font-medium text-gray-800">{{ item.name }}</p>
    <p class="text-gray-500 text-sm">{{ item.count }} Courses</p>
  </div>
</div>

    </div>
  </section>
</template>
