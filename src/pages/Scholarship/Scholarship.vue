<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// ENV APIs
const FETCH_ALL_SCHOLARSHIP = import.meta.env.VITE_FETCH_ALL_SCHOLARSHIP;
const FETCH_ALL_SCHOLARSHIP_CATEGORY = import.meta.env
  .VITE_FETCH_ALL_SCHOLARSHIP_CATEGORY;
const FETCH_SCHOLARSHIP_BY_CATEGORY_ID = import.meta.env
  .VITE_FETCH_ALL_SCHOLARSHIP_BY_CATEGORY;

// STATES
const categories = ref([]);
const activeCategory = ref(null);

const scholarships = ref([]); // category-wise
const allScholarships = ref([]); // for search

const searchInput = ref("");
const searchResults = ref([]);
const isSearching = ref(false);
const loading = ref(false);

// FETCH CATEGORIES
const fetchCategories = async () => {
  const res = await axios.get(FETCH_ALL_SCHOLARSHIP_CATEGORY);
  categories.value = res.data.data || [];

  if (categories.value.length > 0) {
    activeCategory.value = categories.value[0];
  }
};

// FETCH ALL SCHOLARSHIPS (FOR SEARCH)
const fetchAllScholarships = async () => {
  const res = await axios.get(FETCH_ALL_SCHOLARSHIP);
  allScholarships.value = res.data.data || [];
};

// FETCH BY CATEGORY ID
const fetchScholarshipByCategory = async (categoryId) => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${FETCH_SCHOLARSHIP_BY_CATEGORY_ID}/${categoryId}`
    );
    scholarships.value = res.data.data || [];
  } finally {
    loading.value = false;
  }
};

// WATCH CATEGORY CHANGE
watch(activeCategory, (cat) => {
  if (cat?.id) fetchScholarshipByCategory(cat.id);
});

// 🔍 SEARCH (LIKE ARTICLE)
const searchScholarships = () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;

  searchResults.value = allScholarships.value.filter((s) =>
    s.title?.toLowerCase().includes(query)
  );

  isSearching.value = false;
};

// NAVIGATE TO SCHOLARSHIP DETAIL
const goToScholarship = (scholarship) => {
  const slug = scholarship.title.toLowerCase().replace(/\s+/g, "-");
  router.push(`/scholarship/${slug}`);

  searchInput.value = "";
  searchResults.value = [];
};

// INIT
onMounted(async () => {
  await Promise.all([fetchCategories(), fetchAllScholarships()]);
});
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
        Search Scholarships
      </h1>

      <div class="relative">
        <input
          v-model="searchInput"
          @input="searchScholarships"
          type="text"
          placeholder="Search Scholarships"
          class="w-full px-5 py-3 border border-gray-300 rounded-lg"
        />

        <!-- SEARCH RESULTS -->
        <div
          v-if="searchResults.length"
          class="absolute top-full mt-1 bg-white border rounded-lg shadow-xl w-full z-50 max-h-60 overflow-y-auto"
        >
          <ul class="divide-y">
            <li
              v-for="item in searchResults"
              :key="item.id"
              @click="goToScholarship(item)"
              class="px-4 py-2 hover:bg-red-50 cursor-pointer"
            >
              <i
                class="fa-solid fa-magnifying-glass text-red-500 text-xs mr-2"
              />
              <span class="text-sm font-medium">{{ item.title }}</span>
            </li>
          </ul>
        </div>

        <div
          v-if="searchInput && !searchResults.length && !isSearching"
          class="absolute top-full mt-1 bg-white border rounded-lg shadow p-3 text-sm text-gray-600 w-full"
        >
          No scholarships found for "{{ searchInput }}"
        </div>
      </div>
    </div>

    <!-- BROWSE -->
    <div
      class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">Browse Scholarships</h2>

      <!-- CATEGORY TABS -->
      <div class="overflow-x-auto mb-6">
        <div class="flex space-x-4 border-b border-gray-200">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat"
            :class="{
              'text-red-600 border-red-600 font-semibold':
                activeCategory?.id === cat.id,
              'text-gray-600 border-transparent hover:text-red-600':
                activeCategory?.id !== cat.id,
            }"
            class="px-4 py-2 border-b-2"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading scholarships...
      </div>

      <!-- SCHOLARSHIP GRID -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          v-for="item in scholarships"
          :key="item.id"
          @click="goToScholarship(item)"
          class="block bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition"
        >
          <img v-if="item.image" :src="item.image" />

          <h4 class="p-4 font-semibold">
            {{ item.title }}
          </h4>
        </a>

        <p
          v-if="!scholarships.length && !loading"
          class="text-gray-500 col-span-full text-center"
        >
          No scholarships found.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Assuming Font Awesome is imported for icons. */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
