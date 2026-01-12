<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCollegeStore } from "../../../store/collegeNameStore";
import axios from "axios";

const collegeStore = useCollegeStore();
const router = useRouter();

// For easy usage in template
const university = computed(() => collegeStore.college);

// --- Data for Latest Updates Section ---
const allUpdates = ref([
  {
    id: 1,
    date: "2025-10-30",
    title: "CLAT 2026 Registration Ends Tomorrow",
    description:
      "The CLAT 2026 registration window will close on October 31, 2025, at consortiumofnlus.ac.in...",
  },
  {
    id: 2,
    date: "2025-10-29",
    title: "GATE 2026 Application Form Correction Window Open",
    description:
      "The GATE 2026 application form correction window has been opened at gate2026.iitg.ac.in...",
  },
  {
    id: 3,
    date: "2025-10-25",
    title: "JEE Main 2026 Session 1 Dates Announced",
    description: "NTA has announced the dates for JEE Main 2026 Session 1...",
  },
]);

const ADS_API = import.meta.env.VITE_FETCH_ADVERTISMENT_API;

const adBanners = ref([]);

// Fetch Advertisement Banners
const getAdvertisementBanners = async () => {
  try {
    const response = await axios.get(ADS_API);
    adBanners.value = response.data?.data || [];
  } catch (error) {
    console.error("Error fetching advertisement banners:", error);
  }
};

onMounted(() => {
  getAdvertisementBanners();
});

const showAllUpdates = ref(false);
const initialUpdatesToShow = 2;

const displayedUpdates = computed(() => {
  return showAllUpdates.value
    ? allUpdates.value
    : allUpdates.value.slice(0, initialUpdatesToShow);
});

const hasMoreUpdates = computed(() => {
  return allUpdates.value.length > initialUpdatesToShow;
});

const toggleShowMore = () => {
  showAllUpdates.value = !showAllUpdates.value;
};

// --- Data for About Text ---
const aboutText = ref(university?.description);
const showFullAbout = ref(false);

// --- Data for Highlights Table ---
const dynamicHighlights = computed(() => {
  if (!university.value) return [];
  const u = university.value;
  return [
    { label: "Institution Name", value: u.name, icon: "fa-university" },
    { label: "Location", value: u.location, icon: "fa-map-marker-alt" },
    { label: "Ownership", value: u.ownership, icon: "fa-landmark" },
    {
      label: "Year of Establishment",
      value: u.establishedYear,
      icon: "fa-calendar-alt",
    },
    { label: "Affiliation", value: u.affiliation, icon: "fa-scroll" },
    { label: "Accredited by", value: u.accreditation, icon: "fa-certificate" },
    {
      label: "Approved By",
      value: u.isApproved ? "Yes" : "No",
      icon: "fa-check-circle",
    },
    {
      label: "Average Fees",
      value: `₹${Math.round(u.details.averageFees)}`,
      icon: "fa-wallet",
    },
    // { label: "Ranking (India)", value: `#${u.ranking}`, icon: "fa-trophy" },
    { label: "Contact", value: u.contactNumber, icon: "fa-phone-alt" },
    { label: "Website", value: u.website, icon: "fa-link" },
  ];
});

const goToContactPage = () => {
  router.push("/contact-us");
};
// Function to clean up URLs
const cleanUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const rankings = computed(() => {
  return university.value?.rankings?.filter((r) => r.toBeDisplayed) || [];
});

const showAllRankings = ref(false);
const initialRankingsToShow = 2;

const displayedRankings = computed(() => {
  return showAllRankings.value
    ? rankings.value
    : rankings.value.slice(0, initialRankingsToShow);
});

// --- Data for Courses & Fees Table ---
const allCourses = computed(() => {
  return university.value?.courses || [];
});

// --- Navigation Function ---
const goToCoursesTab = () => {
  router.push({ path: "/colleges/LPU-Phagwara/courses-fees" });
};

// --- ADVERTISEMENT / BANNER DATA ---
// You can replace this later with data from your API
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-8">
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          About {{ university?.name }}
        </h3>
        <div
          class="text-gray-700 leading-relaxed transition-max-height duration-500 ease-in-out overflow-hidden"
          :class="{
            'max-h-36 sm:max-h-28': !showFullAbout,
            'max-h-full': showFullAbout,
          }"
        >
          <p>{{ university?.description }}</p>
          <div
            v-if="!showFullAbout"
            class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"
          ></div>
        </div>
        <div class="text-center pt-2 relative">
          <button
            @click="showFullAbout = !showFullAbout"
            class="text-blue-600 hover:text-blue-800 font-semibold py-1 px-4 rounded-md transition duration-200 ease-in-out text-sm"
          >
            Show {{ showFullAbout ? "Less" : "More" }}
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3
          class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200"
        >
          📋 {{ university?.shortName || university?.name }} Highlights
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          <div
            v-for="item in dynamicHighlights"
            :key="item.label"
            class="flex items-center justify-between border-b border-gray-100 pb-2"
          >
            <div class="flex items-center text-gray-600 font-medium text-sm">
              <i
                :class="[
                  'fas mr-3 text-blue-600 text-lg w-4 text-center',
                  item.icon,
                ]"
              ></i>
              {{ item.label }}
            </div>
            <div
              class="text-gray-900 font-semibold text-sm sm:text-base truncate text-right"
            >
              <template v-if="item.label === 'Website'">
                <a
                  :href="item.value"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  {{ cleanUrl(item.value) }}
                </a>
              </template>
              <template v-else>
                {{ item.value || "N/A" }}
              </template>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-gray-200" />

      <div>
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-4">🏆 Rankings</h3>
          <div class="overflow-x-auto">
            <table
              class="min-w-full divide-y divide-gray-200 border border-gray-200"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Publisher
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Year
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Criteria
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ranking in displayedRankings" :key="ranking.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div class="flex items-center">
                      <img
                        v-if="ranking.publisherLogo"
                        :src="ranking.publisherLogo"
                        alt="logo"
                        class="w-6 h-6 mr-2"
                      />
                      {{ ranking.publisher.toUpperCase() }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    #{{ ranking.ranking }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {{ ranking.year }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {{ ranking.criteria || "Overall" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="rankings.length > initialRankingsToShow"
            class="text-center pt-4"
          >
            <button
              @click="showAllRankings = !showAllRankings"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              {{ showAllRankings ? "Show Less" : "Show More" }}
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3
          class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200"
        >
          📚 {{ university?.shortName || university?.name }} Courses & Fees 2025
        </h3>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 border border-gray-200"
          >
            <thead class="bg-blue-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
                >
                  Average Fees
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="course in allCourses" :key="course.id">
                <td
                  class="px-6 py-3 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  {{ course.name }}
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ course.fees }}
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                  {{ course.duration }}
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <button
                    class="px-3 py-1 text-xs font-medium text-red-600 border border-red-400 rounded-md hover:bg-red-50 transition duration-150"
                  >
                    Apply Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center pt-6">
          <button
            @click="goToCoursesTab"
            class="px-6 py-2 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50 transition duration-200 flex items-center justify-center mx-auto text-sm"
          >
            More Courses <i class="fas fa-external-link-alt ml-2 text-xs"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="lg:col-span-1">
      <div class="sticky top-4 space-y-6">
        <div
          class="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center"
        >
          Sponsored
        </div>

        <div
          v-for="ad in adBanners"
          :key="ad.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
        >
          <a
            :href="ad.link || '#'"
            :target="ad.target === 'BLANK' ? '_blank' : '_self'"
            class="block relative"
          >
            <img
              :src="ad.imageUrl"
              :alt="ad.title"
              class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
            />
          </a>
        </div>

        <div
          class="bg-blue-50 border border-blue-100 p-5 rounded-lg text-center"
        >
          <h4 class="font-bold text-gray-800 mb-2">Need Counselling?</h4>
          <p class="text-sm text-gray-600 mb-4">
            Get expert guidance for admission 2025.
          </p>
          <button
            @click="goToContactPage"
            class="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles */
</style>
