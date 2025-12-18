<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const FETCH_ALL_EXAM_CATEGORY = import.meta.env.VITE_FETCH_ALL_EXAM_CATEGORY;
const FETCH_ALL_EXAMS = import.meta.env.VITE_FETCH_ALL_EXAM;
const FETCH_SEARCH_EXAMS = import.meta.env.VITE_SEARCH_EXAM_BY_NAME;

const router = useRouter();

// Category Data
const examCategories = ref([]);

// Fetch all exams + categories
const fetchExamData = async () => {
  try {
    const [catRes, examRes] = await Promise.all([
      axios.get(FETCH_ALL_EXAM_CATEGORY),
      axios.get(FETCH_ALL_EXAMS),
    ]);

    const categories = catRes.data.data;
    const exams = examRes.data.data;

    examCategories.value = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || "fas fa-book",
      color: "text-blue-600",
      exams: exams
        .filter((e) => e.category?.id === cat.id)
        .map((e) => ({
          shortName: e.shortName,
          fullName: e.name,
        })),
    }));
  } catch (err) {
    console.error("Error fetching exam data:", err);
  }
};

onMounted(() => {
  fetchExamData();
});

// --- SEARCH LOGIC ---
const searchInput = ref("");
const searchResults = ref([]);
const isSearching = ref(false);

const searchExams = async () => {
  const query = searchInput.value.trim();

  if (!query) {
    searchResults.value = [];
    return;
  }

  try {
    isSearching.value = true;

    const res = await axios.get(
      `${FETCH_SEARCH_EXAMS}?query=${encodeURIComponent(query)}`
    );

    searchResults.value = res.data.data || [];
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    isSearching.value = false;
  }
};

function goToExam(exam) {
  const title = exam.fullName || exam.name || exam.shortName;

  if (!title) {
    console.error("Invalid exam object:", exam);
    return;
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  router.push(`/exam/${slug}`);

  searchResults.value = [];
  searchInput.value = "";
}
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6">
        Entrance Exams in India
      </h1>
    </div>

    <div class="w-full mx-auto grid grid-cols-1 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div class="flex w-full flex-col sm:flex-row sm:space-x-4 relative">
          <!-- SEARCH INPUT -->
          <div class="flex-grow relative mb-4 sm:mb-0">
            <input
              v-model="searchInput"
              @input="searchExams"
              type="text"
              placeholder="Search for an Entrance Exam"
              class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
              style="height: 50px"
            />

            <!-- SEARCH RESULTS -->
            <div
              v-if="searchResults.length > 0"
              class="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-full z-50 max-h-60 overflow-y-auto"
            >
              <ul class="divide-y divide-gray-100">
                <li
                  v-for="exam in searchResults"
                  :key="exam.id"
                  class="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center space-x-2 transition"
                  @click="goToExam(exam)"
                >
                  <i
                    class="fa-solid fa-magnifying-glass text-blue-500 text-xs"
                  ></i>

                  <span class="text-sm font-medium text-gray-700">
                    {{ exam.shortName }} - {{ exam.name }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- NO RESULTS FOUND -->
            <div
              v-if="searchInput && searchResults.length === 0 && !isSearching"
              class="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow p-3 text-gray-600 w-full z-50 text-sm"
            >
              <i class="fa-solid fa-circle-exclamation mr-2 text-red-500"></i>
              No exams found matching "{{ searchInput }}".
            </div>
          </div>

          <!-- SEARCH BUTTON -->
          <button
            class="sm:w-auto w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-150 shadow-md flex-shrink-0"
            style="height: 50px"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <hr class="border-gray-200 max-w-7xl mx-auto" />

    <div
      class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <h3
        class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200"
      >
        Browse By Category
      </h3>

      <p class="text-gray-700 text-sm leading-relaxed mb-6">
        The importance of entrance exams in India is a well-established fact. An
        advanced level of competition, the objective of these entrance exams is
        to test the student's ability to handle academic challenges and perform
        under pressure. Every year, millions of students take various entrance
        exams across different streams to secure admission to their desired
        colleges and universities.
      </p>

      <!-- <div class="text-center mb-6">
        <button
          class="text-blue-600 hover:text-blue-800 font-medium py-1 px-4 text-sm"
        >
          Show More Description
        </button>
      </div> -->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in examCategories"
          :key="category.name"
          class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition duration-300 hover:shadow-lg hover:border-blue-300"
        >
          <div class="flex items-center space-x-3 mb-4 border-b pb-3">
            <img
              v-if="category.icon.startsWith('http')"
              :src="category.icon"
              class="w-10 h-10 object-contain"
            />

            <i
              v-else
              :class="[category.icon, category.color]"
              class="text-3xl"
            ></i>

            <h4 class="text-lg font-semibold text-gray-800">
              {{ category.name }} Exams
            </h4>
          </div>

          <ul class="space-y-2 mb-3">
            <li
              v-for="exam in category.exams"
              :key="exam.shortName"
              class="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
              @click="goToExam(exam)"
            >
              <i class="fa-solid fa-caret-right text-red-500 text-sm"></i>

              <span class="text-gray-800 text-sm hover:underline">
                {{ exam.shortName }}
              </span>
            </li>
          </ul>

          <!-- <div class="mt-3 text-center">
            <button
              :class="[category.color]"
              class="text-sm font-medium hover:underline"
            >
              View All {{ category.name }} Exams
            </button>
          </div> -->
        </div>
      </div>

      <!-- <div class="mt-8 text-center">
        <button
          class="bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-150"
        >
          <i class="fas fa-caret-down mr-2"></i> View All Categories
        </button>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* Assuming Font Awesome is imported for icons. */
</style>
