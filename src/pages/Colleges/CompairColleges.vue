<template>
  <div class="min-h-screen bg-[#EFF6FF] p-6">
    <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">
      College Compare
    </h1>

    <!-- Comparison Input Section -->
    <div
      class="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-center gap-6"
    >
      <div class="flex-1">
        <label
          for="college1"
          class="block text-sm font-medium text-gray-600 mb-2"
          >Add a College</label
        >
        <div
          class="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
        >
          <span class="text-gray-500 mr-2">🏛️</span>
          <input
            id="college1"
            v-model="selectedCollege1"
            type="text"
            placeholder="Add a College"
            class="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>

      <div class="text-gray-500 font-semibold text-lg">VS</div>

      <div class="flex-1">
        <label
          for="college2"
          class="block text-sm font-medium text-gray-600 mb-2"
          >Add a College</label
        >
        <div
          class="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
        >
          <span class="text-gray-500 mr-2">🏛️</span>
          <input
            id="college2"
            v-model="selectedCollege2"
            type="text"
            placeholder="Add a College"
            class="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
    </div>

    <div class="text-center mt-6">
      <button
        @click="compareColleges"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
      >
        Compare
      </button>
    </div>

    <!-- Comparison Table -->
    <div
      v-if="comparisonData"
      class="bg-white mt-8 rounded-xl shadow-md overflow-hidden"
    >
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="border-b last:border-none"
      >
        <button
          @click="toggleSection(index)"
          class="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-700 text-lg">
            {{ section.title }}
          </span>
          <svg
            :class="[
              'w-5 h-5 transform transition-transform',
              openSection === index ? 'rotate-180' : '',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="openSection === index"
          class="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50"
        >
          <div class="font-semibold text-gray-700">{{ section.title }}</div>
          <div class="text-gray-600">
            {{ comparisonData.college1[section.key] }}
          </div>
          <div class="text-gray-600">
            {{ comparisonData.college2[section.key] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";

const selectedCollege1 = ref("");
const selectedCollege2 = ref("");

const comparisonData = ref(null);
const openSection = ref(null);
const loading = ref(false);

const College_by_name = import.meta.env.VITE_SEARCH_COLLEGE_COURSE;

const formatName = (name) => {
  return name.trim().toLowerCase().replace(/\s+/g, "");
};

const sections = [
  { title: "Location", key: "location" },
  { title: "Ranking", key: "ranking" },
  { title: "Placements", key: "placements" },
  { title: "Accreditation", key: "accreditation" },
  { title: "Ownership", key: "ownership" },
  { title: "Total Rating", key: "rating" },
  { title: "Total Courses", key: "totalCourses" },
  { title: "Fees Range", key: "feesRange" },
];

const toggleSection = (index) => {
  openSection.value = openSection.value === index ? null : index;
};

const normalizeCollege = (raw) => {
  return {
    location: raw.location || "N/A",
    ranking: raw.details?.ranking || "N/A",
    placements: raw.placements?.length
      ? `${raw.placements.length} records`
      : "N/A",
    accreditation: raw.accreditation || raw.affiliation || "N/A",
    ownership: raw.ownership || "N/A",
    rating: raw.totalRating || raw.details?.rating || "N/A",
    totalCourses: raw.totalCourses ?? "N/A",
    feesRange: raw.feesRange || "N/A",
  };
};

const fetchCollege = async (name) => {
  try {
    const formatted = formatName(name);
    const url = `${College_by_name}${formatted}`;

    console.log("Calling:", url);

    const res = await axios.get(url);

    if (res.data?.data?.length > 0) {
      return normalizeCollege(res.data.data[0]);
    }

    return null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const compareColleges = async () => {
  if (!selectedCollege1.value || !selectedCollege2.value) {
    toast.error("Please enter both college names!");
    return;
  }

  loading.value = true;

  const [c1, c2] = await Promise.all([
    fetchCollege(selectedCollege1.value),
    fetchCollege(selectedCollege2.value),
  ]);

  loading.value = false;

  if (!c1 || !c2) {
    toast.error("One or both colleges not found!");
    return;
  }

  comparisonData.value = { college1: c1, college2: c2 };
};
</script>

<style scoped>
/* Optional soft animations & styling */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
  transition: 0.2s ease;
}
</style>
