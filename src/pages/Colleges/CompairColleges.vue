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
        :disabled="loading"
        class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2 mx-auto"
      >
        <span v-if="loading" class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
        {{ loading ? "Comparing..." : "Compare" }}
      </button>
    </div>

    <!-- Comparison Table -->
    <div
      v-if="comparisonData"
      class="bg-white mt-8 rounded-xl shadow-md overflow-hidden"
    >
      <div class="px-6 py-4 bg-blue-50 border-b border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-gray-800">
        <div>Metric</div>
        <div class="text-blue-700">{{ comparisonData.college1.name }}</div>
        <div class="text-blue-700">{{ comparisonData.college2.name }}</div>
      </div>
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

const College_by_name =
  import.meta.env.VITE_SEARCH_COLLEGE_COURSE ||
  import.meta.env.VITE_FETCH_COLLEGE_BY_NAME ||
  "https://api.collegeenroll.in/common/college/read/name/";

const College_all =
  import.meta.env.VITE_FETCH_COLLEGES_MEDIA ||
  "https://api.collegeenroll.in/common/college/read";

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
    name: raw.name || "N/A",
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

const clean = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const fetchCollege = async (name) => {
  if (!name || !name.trim()) return null;

  try {
    const rawName = name.trim();
    const slugName = rawName.toLowerCase().replace(/\s+/g, "-");
    const spaceName = rawName.replace(/-/g, " ");

    const variants = [...new Set([slugName, rawName, spaceName])];

    // 1. Try direct API calls with variants
    for (const v of variants) {
      try {
        const url = `${College_by_name}${encodeURIComponent(v)}`;
        const res = await axios.get(url);
        if (res.data?.data) {
          const item = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
          if (item && item.name) {
            return normalizeCollege(item);
          }
        }
      } catch (err) {
        // continue
      }
    }

    // 2. Fallback to list search
    try {
      const listRes = await axios.get(College_all);
      const allColleges = Array.isArray(listRes.data)
        ? listRes.data
        : listRes.data?.data || [];

      const target = clean(rawName);
      const matched = allColleges.find((c) => {
        if (!c?.name) return false;
        const cName = clean(c.name);
        const cShort = clean(c.shortName);
        return (
          cName === target ||
          cShort === target ||
          cName.includes(target) ||
          target.includes(cName)
        );
      });

      if (matched?.name) {
        try {
          const detailRes = await axios.get(
            `${College_by_name}${encodeURIComponent(matched.name.trim())}`
          );
          if (detailRes.data?.data) {
            const item = Array.isArray(detailRes.data.data)
              ? detailRes.data.data[0]
              : detailRes.data.data;
            if (item) return normalizeCollege(item);
          }
        } catch (e) {}

        return normalizeCollege(matched);
      }
    } catch (err) {
      console.error("Fallback list search error:", err);
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

  try {
    const [c1, c2] = await Promise.all([
      fetchCollege(selectedCollege1.value),
      fetchCollege(selectedCollege2.value),
    ]);

    if (!c1 || !c2) {
      toast.error("One or both colleges not found!");
      return;
    }

    comparisonData.value = { college1: c1, college2: c2 };
    openSection.value = 0; // open first section by default
  } catch (err) {
    toast.error("An error occurred while comparing colleges.");
  } finally {
    loading.value = false;
  }
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
