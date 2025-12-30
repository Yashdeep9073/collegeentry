<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// ENV APIs
const FETCH_ALL_ARTICLE = import.meta.env.VITE_FETCH_ALL_ARTICLE;
const FETCH_ALL_ARTICLE_CATEGORY = import.meta.env
  .VITE_FETCH_ALL_ARTICLE_CATEGORY;
const FETCH_ARTICLE_BY_CATEGORY = import.meta.env
  .VITE_FETCH_ALL_ARTICLE_BY_CATEGORY;

// States
const categories = ref([]);
const activeCategory = ref(null);

const articles = ref([]); // category-wise articles
const allArticles = ref([]); // ALL articles (for search)

const searchInput = ref("");
const searchResults = ref([]);
const isSearching = ref(false);
const loading = ref(false);

// Fetch categories
const fetchCategories = async () => {
  const res = await axios.get(FETCH_ALL_ARTICLE_CATEGORY);
  categories.value = res.data.data || [];

  if (categories.value.length > 0) {
    activeCategory.value = categories.value[0];
  }
};

// Fetch all articles (once)
const fetchAllArticles = async () => {
  const res = await axios.get(FETCH_ALL_ARTICLE);
  allArticles.value = res.data.data || [];
};

// Fetch articles by category
const fetchArticlesByCategory = async (categoryName) => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${FETCH_ARTICLE_BY_CATEGORY}/${encodeURIComponent(categoryName)}`
    );
    articles.value = res.data.data || [];
  } finally {
    loading.value = false;
  }
};

// Watch category change
watch(activeCategory, (cat) => {
  if (cat?.name) fetchArticlesByCategory(cat.name);
});

// 🔍 FRONTEND SEARCH (LIKE EXAM)
const searchArticles = () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;

  searchResults.value = allArticles.value.filter((a) =>
    a.title?.toLowerCase().includes(query)
  );

  isSearching.value = false;
};

// Navigate to article
const goToArticle = (article) => {
  const slug = article.slug || article.title.toLowerCase().replace(/\s+/g, "-");

  router.push(`/article/${slug}`);

  searchInput.value = "";
  searchResults.value = [];
};

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchAllArticles()]);
});
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
        Search Articles
      </h1>

      <div class="relative">
        <input
          v-model="searchInput"
          @input="searchArticles"
          type="text"
          placeholder="Search Articles"
          class="w-full px-5 py-3 border border-gray-300 rounded-lg"
        />

        <!-- SEARCH RESULTS -->
        <div
          v-if="searchResults.length"
          class="absolute top-full mt-1 bg-white border rounded-lg shadow-xl w-full z-50 max-h-60 overflow-y-auto"
        >
          <ul class="divide-y">
            <li
              v-for="article in searchResults"
              :key="article.id"
              @click="goToArticle(article)"
              class="px-4 py-2 hover:bg-red-50 cursor-pointer"
            >
              <i
                class="fa-solid fa-magnifying-glass text-red-500 text-xs mr-2"
              ></i>
              <span class="text-sm font-medium">
                {{ article.title }}
              </span>
            </li>
          </ul>
        </div>

        <!-- NO RESULTS -->
        <div
          v-if="searchInput && !searchResults.length && !isSearching"
          class="absolute top-full mt-1 bg-white border rounded-lg shadow p-3 text-sm text-gray-600 w-full"
        >
          No articles found for "{{ searchInput }}"
        </div>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">Browse Article</h2>

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

      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading articles...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          v-for="article in articles"
          :key="article.id"
          @click="goToArticle(article)"
          class="block bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition"
        >
          <img v-if="article.image" :src="article.image" />
          <h4 class="p-4 font-semibold">{{ article.title }}</h4>
        </a>

        <p
          v-if="!articles.length && !loading"
          class="text-gray-500 col-span-full text-center"
        >
          No articles found.
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
