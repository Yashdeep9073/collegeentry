<template>
  <div class="bg-blue-50 min-h-screen">
    <div
      class="max-w-[1400px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10"
    >
      <aside
        class="w-full lg:w-80 bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-8 h-fit transition-all duration-300"
      >
        <h3
          class="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between"
        >
          <span class="flex items-center gap-2">
            <svg
              class="w-6 h-6 text-[#ff4d4f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0011 15.586V21h-2v-5.414a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            Filter Options
          </span>
        </h3>

        <div class="text-sm text-gray-500 mb-4">
          Showing
          <span class="font-semibold text-[#ff4d4f]">{{ paged.length }}</span>
          of
          <span class="font-semibold text-[#ff4d4f]">{{
            filtered.length
          }}</span>
          results
        </div>

        <div class="mb-6">
          <div class="relative">
            <input
              v-model="filters.search"
              @keyup.enter="applyFilters"
              placeholder="Search colleges, courses..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="space-y-6">
          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Stream / Course Type
              <button
                v-if="filters.stream.length > 0"
                @click="filters.stream = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="(s, i) in streams"
                :key="i"
                class="flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition"
                :class="
                  filters.stream.includes(s)
                    ? 'bg-[#ff4d4f] text-white border-[#ff4d4f] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-[#ffebeb] hover:text-[#ff4d4f]'
                "
              >
                <input
                  type="checkbox"
                  v-model="filters.stream"
                  :value="s"
                  class="hidden"
                />
                <span class="text-sm font-medium">{{ s }}</span>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="filter-group">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">State</h4>
              <select
                v-model="filters.state"
                @change="filters.city = ''"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All States</option>
                <option v-for="(s, i) in states" :key="i" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">City</h4>
              <select
                v-model="filters.city"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                <option v-for="(c, i) in cities" :key="i" :value="c">
                  {{ c }}
                </option>
              </select>
            </div>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              College Type
              <button
                v-if="filters.collegeType.length > 0"
                @click="filters.collegeType = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in ['Government', 'Private']"
                :key="type"
                @click="toggleValue('collegeType', type)"
                :class="btnClass(filters.collegeType, type)"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">
              Minimum Rating
            </h4>
            <div class="flex gap-2 flex-wrap items-center">
              <button
                v-for="r in [5, 4, 3, 2, 1]"
                :key="r"
                @click="filters.rating = r"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition',
                  filters.rating === r
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100',
                ]"
              >
                {{ r }}
                <svg
                  class="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71a1 1 0 01.558-.337l6.574-.955L10 1.5l2.381 4.918 6.574.955a1 1 0 01.558.337l-4.758 4.635 1.123 6.545L10 15z"
                  />
                </svg>
              </button>
              <button
                @click="filters.rating = 0"
                class="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-200 transition"
              >
                All
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">
              Total Fee Range
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="range in feeRanges"
                :key="range.label"
                @click="filters.feeRange = range"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium border transition duration-200',
                  filters.feeRange.label === range.label
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-white hover:border-red-50',
                ]"
              >
                {{ range.label }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Entrance Exam
              <button
                v-if="filters.exams.length > 0"
                @click="filters.exams = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div
              class="space-y-2 max-h-40 overflow-y-auto pr-3 custom-scrollbar"
            >
              <label
                v-for="(e, i) in exams"
                :key="i"
                class="flex items-center gap-3 text-sm cursor-pointer py-1 hover:bg-blue-50 rounded-md px-2 transition"
              >
                <input
                  type="checkbox"
                  :value="e"
                  v-model="filters.exams"
                  class="form-checkbox text-[#ff4d4f] rounded h-4 w-4 border-gray-300 focus:ring-[#ff4d4f]"
                />
                <span class="text-gray-700">{{ e }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Degree Type
              <button
                v-if="filters.degree"
                @click="filters.degree = ''"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="deg in ['UG', 'PG', 'Diploma']"
                :key="deg"
                @click="toggleValue('degree', deg)"
                :class="btnClass(filters.degree, deg, 'blue')"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ deg }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Program Mode
              <button
                v-if="filters.programMode"
                @click="filters.programMode = ''"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mode in ['Online', 'Offline', 'Distance']"
                :key="mode"
                @click="toggleValue('programMode', mode)"
                :class="btnClass(filters.programMode, mode, 'blue')"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ mode }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            @click="clearFilters"
            class="flex-1 border border-gray-300 text-gray-700 rounded-xl px-4 py-3 hover:bg-gray-100 transition duration-300"
          >
            Reset All
          </button>
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <div
          class="flex flex-wrap items-center justify-between mb-8 gap-4 pb-4 border-b-2 border-blue-200"
        >
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-extrabold text-gray-900">
              🎓 Top Colleges
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-base text-gray-700 font-medium">Sort By:</label>
            <select
              v-model="sortBy"
              @change="page = 1"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="relevance">Relevance</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="fees_asc">Fees: Low to High</option>
              <option value="fees_desc">Fees: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-10">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d4f]"
          ></div>
          <p class="mt-4 text-gray-600">Loading colleges...</p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="text-center py-10 bg-white rounded-xl shadow-lg text-gray-600"
        >
          <p class="text-xl font-semibold mb-3">Error Loading Colleges 😞</p>
          <p>{{ error }}</p>
          <button
            @click="fetchColleges"
            class="mt-4 bg-[#ff4d4f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#ff575a] transition duration-300"
          >
            Try Again
          </button>
        </div>

        <!-- Success State -->
        <div v-else class="space-y-6">
          <div
            v-for="college in paged"
            :key="college.id"
            class="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div class="w-full md:w-64 flex-shrink-0">
              <img
                @click="goToCollege(college)"
                :src="college.image"
                :alt="college.name"
                class="w-full h-48 object-cover rounded-xl shadow-md"
              />
              <div class="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                <div class="text-xs text-gray-600 font-medium">
                  Annual Fee (Avg.)
                </div>
                <div class="text-xl font-bold text-red-600">
                  {{ formatFee(college.fees) }}
                </div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="flex flex-col sm:flex-row items-start justify-between gap-3"
              >
                <div>
                  <h2
                    @click="goToCollege(college)"
                    class="text-xl font-bold text-gray-900 hover:text-blue-600 transition cursor-pointer"
                  >
                    {{ college.name }}
                  </h2>
                  <p class="text-sm text-gray-500 mt-1">
                    📍 {{ college.city }}, {{ college.state }}
                    <span class="mx-2">•</span>
                    <span
                      :class="{
                        'text-green-600 font-medium':
                          college.type === 'Government',
                        'text-amber-600 font-medium':
                          college.type === 'Private',
                      }"
                      >{{ college.type }}</span
                    >
                  </p>
                </div>

                <div
                  class="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-full text-lg font-bold shadow-md"
                >
                  {{ college.rating }}
                  <svg
                    class="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71a1 1 0 01.558-.337l6.574-.955L10 1.5l2.381 4.918 6.574.955a1 1 0 01.558.337l-4.758 4.635 1.123 6.545L10 15z"
                    />
                  </svg>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2 items-center">
                <span class="tag-badge bg-blue-100 text-blue-800">
                  <span class="font-semibold">{{ college.stream }}</span>
                </span>
                <span class="tag-badge bg-gray-100 text-gray-700">
                  Degree: {{ college.degree }}
                </span>
                <span class="tag-badge bg-gray-100 text-gray-700">
                  Exam: {{ college.exam }}
                </span>
                <span class="tag-badge bg-gray-100 text-gray-700">
                  Mode: {{ college.programMode }}
                </span>
              </div>

              <p class="mt-4 text-sm text-gray-600 line-clamp-3">
                {{ college.description }}
              </p>

              <div class="mt-6 flex items-center gap-4 flex-wrap">
                <button
                @click="openApplyModal"
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition shadow-lg shadow-red-500/50"
                >
                  Apply Now
                </button>
                <button
                  class="border border-[#ff4d4f] text-[#ff4d4f] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
                >
                  View Details
                </button>
                <div class="ml-auto text-sm text-gray-500">
                  Est. Placement Rate:
                  <span class="font-bold text-green-600 text-lg"
                    >{{ college.placement }}%</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="filtered.length === 0"
            class="text-center py-10 bg-white rounded-xl shadow-lg text-gray-600"
          >
            <p class="text-xl font-semibold mb-3">No Colleges Found 😞</p>
            <p>Try adjusting your filters or clearing your selections.</p>
          </div>
        </div>

        <div
          v-if="totalPages > 1"
          class="mt-10 flex flex-col sm:flex-row items-center justify-between flex-wrap gap-4"
        >
          <div class="text-base text-gray-700 font-medium">
            Showing Page
            <span class="font-bold text-[#ff4d4f]">{{ page }}</span> of
            <span class="font-bold text-[#ff4d4f]">{{ totalPages }}</span>
          </div>
          <div class="flex gap-2 flex-wrap justify-center">
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              ← Previous
            </button>
            <button
              v-for="p in paginationRange"
              :key="p"
              @click="page = p"
              :class="[
                'w-10 h-10 rounded-full font-semibold transition duration-200',
                page === p
                  ? 'bg-[#ff4d4f] text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50',
              ]"
            >
              {{ p }}
            </button>
            <button
              @click="nextPage"
              :disabled="page === totalPages"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div
    v-if="isApplyModalOpen"
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    @click.self="closeApplyModal"
  >
    <div
      class="modal-scroll bg-white rounded-xl shadow-2xl w-[95%] max-w-md relative transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto"
    >
      <div
        class="sticky top-0 bg-white z-10 flex justify-between items-center p-5 border-b border-gray-100"
      >
        <h2 class="text-xl font-extrabold text-gray-800">
          <i class="fas fa-user-graduate mr-2 text-orange-500"></i>
          Admission Enquiry
        </h2>

        <button
          @click="closeApplyModal"
          class="text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-6">
        <div
          v-if="submitMessage"
          :class="[
            'p-3 mb-4 rounded-lg font-medium',
            submitMessage.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700',
          ]"
        >
          {{ submitMessage.text }}
        </div>

        <p class="text-sm text-gray-600 mb-2">
          Get instant callback and free counseling from our experts. .
        </p>

        <form @submit.prevent="submitLead" class="space-y-4">
          <div class="space-y-2">
            <div class="relative">
              <input
                type="text"
                v-model="formState.name"
                placeholder="Full Name *"
                required
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="tel"
                v-model="formState.phone"
                placeholder="Phone Number *"
                required
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="email"
                v-model="formState.email"
                placeholder="Email Address"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative">
              <input
                type="text"
                v-model="formState.city"
                placeholder="City"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-city absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.state"
                placeholder="State"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.country"
                placeholder="Country"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.degree_type"
                placeholder="Degree Type "
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-graduation-cap absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>

          <div class="relative">
            <textarea
              v-model="formState.message"
              placeholder="Your Specific Query/Message"
              rows="3"
              class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150 resize-none"
            ></textarea>
            <i
              class="fas fa-comment-dots absolute left-3 top-4 text-gray-400"
            ></i>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i> Submitting...
            </span>
            <span v-else> Request Free Counseling </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const FETCH_ALL_COLLEGES_URL = import.meta.env.VITE_FETCH_COLLEGES_FILTER;
import { onMounted, computed, ref, watch, reactive } from "vue";
/* ------------ Reactive Data ------------ */
const allColleges = ref([]);
const loading = ref(false);
const error = ref(null);

/* ------------ Filter Options ------------ */
const streams = [
  "Engineering",
  "Management",
  "Medical",
  "Arts & Commerce",
  "Design",
];
const states = [
  "Delhi",
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Uttarakhand",
  "Haryana",
];
const cities = [
  "New Delhi",
  "Mumbai",
  "Ahmedabad",
  "Pilani",
  "Manipal",
  "Chennai",
  "Noida",
  "Roorkee",
  "Kurukshetra",
  "Gurugram",
];
const exams = [
  "JEE Advanced",
  "JEE Main",
  "CAT",
  "BITSAT",
  "CUET",
  "MET",
  "NMAT",
  "SRMJEE",
  "None",
];
const feeRanges = [
  { label: "Under ₹50K", min: 0, max: 50000 },
  { label: "₹50K – ₹3L", min: 50000, max: 300000 },
  { label: "₹3L – ₹10L", min: 300000, max: 1000000 },
  { label: "Above ₹10L", min: 1000000, max: 9999999 },
];

/* ------------ Reactive Filters ------------ */
const filters = ref({
  search: "",
  stream: [],
  state: "",
  city: "",
  collegeType: [],
  degree: "",
  programMode: "",
  exams: [],
  feeRange: { label: "All", min: 0, max: 9999999 },
  rating: 0,
});

const sortBy = ref("relevance");
const page = ref(1);
const perPage = ref(5);
const MAX_PAGES_TO_SHOW = 5;

/* ------------ API Integration ------------ */
async function fetchColleges() {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(FETCH_ALL_COLLEGES_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.status}`);
    }

    const data = await response.json();

    if (data.message === "Colleges fetched successfully" && data.data) {
      // Transform API data to match our component structure
      allColleges.value = data.data.map((college) => ({
        id: college.id,
        name: college.name,
        state: extractState(college.location),
        city: extractCity(college.location),
        stream: "Engineering", // Default value - you can update this based on actual data
        type: mapOwnershipToType(college.ownership), // This is the key fix
        degree: "UG", // Default value
        exam: "None", // Default value
        programMode: "Offline", // Default value
        fees: generateRandomFee(), // Generate random fee for now
        rating: generateRandomRating(), // Generate random rating for now
        placement: generateRandomPlacement(), // Generate random placement for now
        image:
          college.details?.image ||
          "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: generateDescription(college.name, college.ownership),
      }));
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (err) {
    console.error("Error fetching colleges:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

/* ------------ Helper Functions ------------ */
function extractState(location) {
  if (!location) return "Unknown";
  const parts = location.split(",");
  return parts[parts.length - 1].trim();
}

function extractCity(location) {
  if (!location) return "Unknown";
  const parts = location.split(",");
  return parts[0].trim();
}
function goToCollege(college) {
  const slug = college.name.toLowerCase().replace(/\s+/g, "-"); // convert name → slug
  router.push(`/colleges/${slug}`);
}
function mapOwnershipToType(ownership) {
  if (ownership === "GOVERNMENT") return "Government";
  if (ownership === "PRIVATE") return "Private";
  return ownership; // fallback
}

function generateRandomFee() {
  // Generate random fee between 50,000 and 20,00,000
  return Math.floor(Math.random() * 1950000) + 50000;
}

function generateRandomRating() {
  // Generate random rating between 3.0 and 5.0
  return (Math.random() * 2 + 3).toFixed(1);
}

function generateRandomPlacement() {
  // Generate random placement between 60% and 95%
  return Math.floor(Math.random() * 35) + 60;
}

function generateDescription(name, ownership) {
  const type = ownership === "PRIVATE" ? "private" : "government";
  return `${name} is a renowned ${type} institution offering quality education with modern facilities and experienced faculty. The college provides a conducive learning environment for students to excel in their chosen fields.`;
}

const formatFee = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "Cr / year";
  if (n >= 100000) return "₹" + (n / 100000).toLocaleString() + "L / year";
  return "₹" + n.toLocaleString() + " / year";
};

const btnClass = (arrOrVal, val) => {
  const isSelected = Array.isArray(arrOrVal)
    ? arrOrVal.includes(val)
    : arrOrVal === val;

  return isSelected
    ? "bg-[#ff4d4f] text-white shadow-md"
    : "bg-gray-100 text-gray-700 hover:bg-[#ffebeb] hover:text-[#ff4d4f]";
};

function toggleValue(key, val) {
  const arr = filters.value[key];
  if (Array.isArray(arr)) {
    const i = arr.indexOf(val);
    i === -1 ? arr.push(val) : arr.splice(i, 1);
  } else {
    filters.value[key] = filters.value[key] === val ? "" : val;
  }
  applyFilters();
}

/* ------------ Computed Filter Logic ------------ */
const filtered = computed(() => {
  let list = allColleges.value.slice();

  const f = filters.value;
  const q = f.search?.toLowerCase()?.trim();

  // 1. Search
  if (q) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }

  // 2. Multi-select filters
  if (f.stream.length) list = list.filter((c) => f.stream.includes(c.stream));
  if (f.collegeType.length) {
    list = list.filter((c) => f.collegeType.includes(c.type));
  }
  if (f.exams.length) list = list.filter((c) => f.exams.includes(c.exam));

  // 3. Single-select filters
  if (f.state) list = list.filter((c) => c.state === f.state);
  if (f.city) list = list.filter((c) => c.city === f.city);
  if (f.degree) list = list.filter((c) => c.degree === f.degree);
  if (f.programMode) list = list.filter((c) => c.programMode === f.programMode);

  // 4. Fee Range
  if (f.feeRange && f.feeRange.label !== "All") {
    list = list.filter(
      (c) => c.fees >= f.feeRange.min && c.fees <= f.feeRange.max
    );
  }

  // 5. Rating
  if (f.rating > 0) list = list.filter((c) => Math.floor(c.rating) >= f.rating);

  // 6. Sort
  if (sortBy.value === "rating_desc") list.sort((a, b) => b.rating - a.rating);
  else if (sortBy.value === "fees_asc") list.sort((a, b) => a.fees - b.fees);
  else if (sortBy.value === "fees_desc") list.sort((a, b) => b.fees - a.fees);

  return list;
});

/* ------------ Pagination Computed ------------ */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / perPage.value))
);

const paged = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value;
  if (page.value < 1) page.value = 1;

  const start = (page.value - 1) * perPage.value;
  return filtered.value.slice(start, start + perPage.value);
});

const paginationRange = computed(() => {
  const range = [];
  const total = totalPages.value;
  const current = page.value;
  const max = MAX_PAGES_TO_SHOW;

  if (total > 0) range.push(1);

  let start = Math.max(
    2,
    current - Math.floor(max / 2) + (max % 2 === 0 ? 0 : 1)
  );
  let end = Math.min(total - 1, current + Math.floor(max / 2));

  if (current < Math.floor(max / 2) + 2) {
    end = Math.min(total - 1, max - 1);
  }
  if (current > total - Math.floor(max / 2) - (max % 2 === 0 ? 1 : 0)) {
    start = Math.max(2, total - max + 2);
  }

  if (start > 2) range.push("...");
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) range.push(i);
  }
  if (end < total - 1) range.push("...");

  if (total > 1 && !range.includes(total)) range.push(total);

  return range
    .filter((p) => p !== "...")
    .map((p) => (typeof p === "number" ? p : "..."));
});

/* ------------ Controls ------------ */
function applyFilters() {
  page.value = 1;
}

function clearFilters() {
  filters.value = {
    search: "",
    stream: [],
    state: "",
    city: "",
    collegeType: [],
    degree: "",
    programMode: "",
    exams: [],
    feeRange: { label: "All", min: 0, max: 9999999 },
    rating: 0,
  };
  sortBy.value = "relevance";
  page.value = 1;
}

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

/* ------------ Lifecycle ------------ */
onMounted(() => {
  fetchColleges();
});

const isApplyModalOpen = ref(false);
const isSubmitting = ref(false); // Replaces 'loading' for clarity
const submitMessage = ref(null); // Stores success/error message for display

const formState = reactive({
  // Used 'reactive' for the form object
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  country: "",
  degree_type: "", // Harmonized with snake_case for potential API use
  message: "",
});

const openApplyModal = () => {
  isApplyModalOpen.value = true;
  document.body.style.overflow = "hidden"; // Prevents background scroll
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
  document.body.style.overflow = ""; // Re-enable background scroll

  // Reset form state and messages on close
  Object.assign(formState, {
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    degree_type: "",
    message: "",
  });
  submitMessage.value = null;
};

// --- LEAD SUBMISSION LOGIC ---

const submitLead = async () => {
  // Basic Validation
  if (!formState.name || !formState.phone) {
    toast.error("Full Name and Phone Number are required!", {
      autoClose: 2500,
    });

    submitMessage.value = {
      type: "error",
      text: "Full Name and Phone Number are required.",
    };

    return;
  }

  isSubmitting.value = true;
  submitMessage.value = null;

  try {
    const payload = {
      ...formState,
      degree_type: formState.degree_type || "N/A",
    };

    const response = await axios.post(VITE_ADD_LEAD, payload);

    if (response.status === 200 || response.status === 201) {
      toast.success("Lead submitted successfully!", {
        autoClose: 2000,
      });

      submitMessage.value = {
        type: "success",
        text: "✅ Your enquiry has been submitted successfully.",
      };

      setTimeout(() => closeApplyModal(), 2000);
    } else {
      toast.error(response.data.message || "Submission failed!", {
        autoClose: 2500,
      });

      submitMessage.value = {
        type: "error",
        text: "Submission failed. Try again!",
      };
    }
  } catch (error) {
    console.log("Submission Error:", error);

    toast.error("Network Error! Please check your connection.", {
      autoClose: 3000,
    });

    submitMessage.value = {
      type: "error",
      text: " Network error. Please try again.",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.modal-scroll::-webkit-scrollbar {
  display: none;
}

.modal-scroll {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
