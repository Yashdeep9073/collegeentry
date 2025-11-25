<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("colleges");
const FETCH_ALL_STREAM_COUNT = import.meta.env.VITE_FETCH_ALL_STREAM_COUNT;

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
const examCategories = [
  { name: "JEE Main", level: "National", icon: "fa-book-open" },
  { name: "NEET", level: "National", icon: "fa-heart-pulse" },
  { name: "CAT", level: "MBA", icon: "fa-chart-simple" },
  { name: "CLAT", level: "Law", icon: "fa-scale-balanced" },
  { name: "GATE", level: "PG Engineering", icon: "fa-network-wired" },
  { name: "CUET", level: "UG Entrance", icon: "fa-university" },
];

/* ✅ DATA FOR COURSES */
const courseCategories = [
  { name: "BTech", duration: "4 Years", icon: "fa-gears" },
  { name: "BSc", duration: "3 Years", icon: "fa-flask" },
  { name: "BBA", duration: "3 Years", icon: "fa-chart-line" },
  { name: "MBA", duration: "2 Years", icon: "fa-briefcase" },
  { name: "MBBS", duration: "5.5 Years", icon: "fa-stethoscope" },
  { name: "BCA", duration: "3 Years", icon: "fa-laptop-code" },
];

const fetchCollegeCounts = async () => {
  try {
    const res = await axios.get(FETCH_ALL_STREAM_COUNT);
    const streamData = res.data.data; // [{ name: 'Pharmacy', collegeCount: 12 }, ...]

    collegeCategories.value = collegeCategories.value.map((cat) => {
      const match = streamData.find(
        (s) => s.name.toLowerCase() === cat.name.toLowerCase()
      );
      return {
        ...cat,
        count: match ? match.collegeCount : 0,
      };
    });
  } catch (err) {
    console.error("Error fetching college counts:", err);
  }
};

onMounted(() => {
  fetchCollegeCounts();
});

/* ✅ NAVIGATION HANDLERS */
const goToCollege = (name) =>
  router.push(`/colleges?category=${encodeURIComponent(name)}`);
const goToExam = (name) => router.push(`/exams/${encodeURIComponent(name)}`);
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
          <i :class="`fa-solid ${item.icon} text-3xl text-red-600 mb-2`"></i>
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
          <i :class="`fa-solid ${item.icon} text-3xl text-green-600 mb-3`"></i>
          <p class="font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-gray-500 text-sm">{{ item.level }}</p>
        </div>
      </div>

      <!-- ✅ COURSES GRID -->
      <div
        v-if="activeTab === 'courses'"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10"
      >
        <div
          v-for="item in courseCategories"
          :key="item.name"
          @click="goToCourse(item.name)"
          class="cursor-pointer bg-white shadow hover:shadow-md transition rounded-xl p-6 text-center hover:-translate-y-1 border"
        >
          <i :class="`fa-solid ${item.icon} text-3xl text-purple-600 mb-3`"></i>
          <p class="font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-gray-500 text-sm">{{ item.duration }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
