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
          <!-- <button
            @click="applyFilters"
            class="flex-1 bg-[#ff4d4f] text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/50 hover:bg-[#ff575a] transition duration-300"
          >
            <span class="flex items-center justify-center gap-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Apply Filters
            </span>
          </button> -->
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

        <div class="space-y-6">
          <div
            v-for="college in paged"
            :key="college.id"
            class="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div class="w-full md:w-64 flex-shrink-0">
              <img
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
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition shadow-lg shadow-red-500/50"
                >
                  Apply Now 🔥
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
</template>

<script setup>
import { ref, computed } from "vue";

/* ------------ Sample Colleges Data ------------ */
const allColleges = ref([
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    state: "Delhi",
    city: "New Delhi",
    stream: "Engineering",
    type: "Government",
    degree: "UG",
    exam: "JEE Advanced",
    programMode: "Offline",
    fees: 210000,
    rating: 4.8,
    placement: 92,
    image:
      "https://images.shiksha.com/mediadata/images/1639126992phpIbmG6H.jpeg",
    description:
      "IIT Delhi is a top-tier engineering institute offering undergraduate and postgraduate programs with strong research and placement records. It is consistently ranked among the best in India and globally.",
  },
  {
    id: 2,
    name: "Indian Institute of Technology Bombay",
    state: "Maharashtra",
    city: "Mumbai",
    stream: "Engineering",
    type: "Government",
    degree: "UG",
    exam: "JEE Advanced",
    programMode: "Offline",
    fees: 215000,
    rating: 4.7,
    placement: 94,
    image:
      "https://images.shiksha.com/mediadata/images/1639122003php9QnE6Z.jpeg",
    description:
      "IIT Bombay is globally recognized for engineering, design and entrepreneurship, with strong industry ties and placements. The campus provides a vibrant academic and cultural experience.",
  },
  {
    id: 3,
    name: "IIM Ahmedabad",
    state: "Gujarat",
    city: "Ahmedabad",
    stream: "Management",
    type: "Government",
    degree: "PG",
    exam: "CAT",
    programMode: "Offline",
    fees: 2300000, // Increased for a higher fee range option
    rating: 4.9,
    placement: 98,
    image:
      "https://images.shiksha.com/mediadata/images/articles/1693564201phpMtpJkA.jpeg",
    description:
      "IIM Ahmedabad is a leading management institute with exceptional placements and a strong academic reputation. It is the gold standard for business education in India.",
  },
  {
    id: 4,
    name: "BITS Pilani",
    state: "Rajasthan",
    city: "Pilani",
    stream: "Engineering",
    type: "Private",
    degree: "UG",
    exam: "BITSAT",
    programMode: "Offline",
    fees: 430000,
    rating: 4.6,
    placement: 89,
    image:
      "https://images.shiksha.com/mediadata/images/1551330208php0FpjXu.jpeg",
    description:
      "BITS Pilani is a premier private university known for high-quality engineering and science programs with active campus life and an excellent peer group.",
  },
  {
    id: 5,
    name: "University of Delhi (DU)",
    state: "Delhi",
    city: "New Delhi",
    stream: "Arts & Commerce",
    type: "Government",
    degree: "UG",
    exam: "CUET",
    programMode: "Offline",
    fees: 35000,
    rating: 4.3,
    placement: 65,
    image:
      "https://images.shiksha.com/mediadata/images/1532590222phpDQGOPe.jpeg",
    description:
      "University of Delhi offers a wide array of colleges and courses across arts, commerce and sciences with a diverse student community and rich history.",
  },
  {
    id: 6,
    name: "Manipal Institute of Technology",
    state: "Karnataka",
    city: "Manipal",
    stream: "Engineering",
    type: "Private",
    degree: "UG",
    exam: "MET",
    programMode: "Offline",
    fees: 270000,
    rating: 4.2,
    placement: 78,
    image:
      "https://www.manipal.edu/content/dam/manipal/mu/assets/images/Faculty/engineeringcollege.jpg",
    description:
      "MIT Manipal offers strong campus facilities and good placement opportunities in engineering and allied fields. It is a highly reputed private institution.",
  },
  {
    id: 7,
    name: "SRM University, Chennai",
    state: "Tamil Nadu",
    city: "Chennai",
    stream: "Engineering",
    type: "Private",
    degree: "UG",
    exam: "SRMJEE",
    programMode: "Offline",
    fees: 190000,
    rating: 4.0,
    placement: 75,
    image:
      "https://images.shiksha.com/mediadata/images/1672395562phpVvT4tL.jpeg",
    description:
      "SRM University offers diverse engineering programs with strong industry collaborations and modern infrastructure.",
  },
  {
    id: 8,
    name: "Narsee Monjee Institute of Management Studies (NMIMS)",
    state: "Maharashtra",
    city: "Mumbai",
    stream: "Management",
    type: "Private",
    degree: "PG",
    exam: "NMAT",
    programMode: "Offline",
    fees: 1150000,
    rating: 4.5,
    placement: 90,
    image:
      "https://images.shiksha.com/mediadata/images/1684307507php1l3e7A.jpeg",
    description:
      "NMIMS is a renowned private institution for management and other professional courses, offering excellent career prospects.",
  },
  {
    id: 9,
    name: "IGNOU",
    state: "Delhi",
    city: "New Delhi",
    stream: "Arts & Commerce",
    type: "Government",
    degree: "UG",
    exam: "None",
    programMode: "Distance",
    fees: 10000,
    rating: 3.5,
    placement: 50,
    image:
      "https://images.shiksha.com/mediadata/images/articles/1690967000php8r4VqP.jpeg",
    description:
      "Indira Gandhi National Open University (IGNOU) is a central university providing distance education across various streams.",
  },
  {
    id: 10,
    name: "Amity University Online",
    state: "Uttar Pradesh",
    city: "Noida",
    stream: "Management",
    type: "Private",
    degree: "PG",
    exam: "None",
    programMode: "Online",
    fees: 150000,
    rating: 3.9,
    placement: 60,
    image:
      "https://images.shiksha.com/mediadata/images/1683884878php4N0A7V.jpeg",
    description:
      "Amity University Online offers flexible and accredited online degree programs for working professionals and students.",
  },
]);

/* ------------ Filter Options ------------ */
const streams = [
  "Engineering",
  "Management",
  "Medical",
  "Arts & Commerce",
  "Design",
];
// Added more states/cities to make filters more useful
const states = [
  "Delhi",
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
];
const cities = [
  "New Delhi",
  "Mumbai",
  "Ahmedabad",
  "Pilani",
  "Manipal",
  "Chennai",
  "Noida",
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
// Changed default fee range to be more inclusive
const filters = ref({
  search: "",
  stream: [],
  state: "",
  city: "",
  collegeType: [],
  degree: "",
  programMode: "", // Single select for mode
  exams: [],
  feeRange: { label: "All", min: 0, max: 9999999 }, // Default to "All" range
  rating: 0,
});

const sortBy = ref("relevance");
const page = ref(1);
const perPage = ref(5);
const MAX_PAGES_TO_SHOW = 5; // For cleaner pagination component

/* ------------ Helpers ------------ */
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
    // If not an array, it's a single selection toggle
    filters.value[key] = filters.value[key] === val ? "" : val;
  }
  // Auto-apply on toggle of simple buttons/checkboxes
  applyFilters();
}

/* ------------ Computed Filter Logic (Optimized) ------------ */
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
  if (f.collegeType.length)
    list = list.filter((c) => f.collegeType.includes(c.type));
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
  // 'relevance' sort is implied by not sorting, maintaining the original order or search engine's ranking

  return list;
});

/* ------------ Pagination Computed ------------ */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / perPage.value))
);

const paged = computed(() => {
  // Ensure the current page is valid after filtering/sorting
  if (page.value > totalPages.value) page.value = totalPages.value;
  if (page.value < 1) page.value = 1;

  const start = (page.value - 1) * perPage.value;
  return filtered.value.slice(start, start + perPage.value);
});

// Advanced pagination range logic (to only show a few pages at a time)
const paginationRange = computed(() => {
  const range = [];
  const total = totalPages.value;
  const current = page.value;
  const max = MAX_PAGES_TO_SHOW;

  // Always show first page
  if (total > 0) range.push(1);

  let start = Math.max(
    2,
    current - Math.floor(max / 2) + (max % 2 === 0 ? 0 : 1)
  );
  let end = Math.min(total - 1, current + Math.floor(max / 2));

  // Adjust start/end if they hit the bounds
  if (current < Math.floor(max / 2) + 2) {
    end = Math.min(total - 1, max - 1);
  }
  if (current > total - Math.floor(max / 2) - (max % 2 === 0 ? 1 : 0)) {
    start = Math.max(2, total - max + 2);
  }

  // Add ellipses and pages
  if (start > 2) range.push("...");
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) range.push(i);
  }
  if (end < total - 1) range.push("...");

  // Always show last page if it's not the first page
  if (total > 1 && !range.includes(total)) range.push(total);

  return range
    .filter((p) => p !== "...")
    .map((p) => (typeof p === "number" ? p : "..."));
});

/* ------------ Controls ------------ */
function applyFilters() {
  page.value = 1; // Always reset to page 1 on filter change
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
    // Set feeRange back to the new default 'All'
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
</script>

<style scoped>
/* Custom Scrollbar for better UX */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* gray-300 */
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9; /* gray-100 */
}
</style>
