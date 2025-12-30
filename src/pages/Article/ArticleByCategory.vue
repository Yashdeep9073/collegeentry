<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const API_URL_ALL_CATEGORY = import.meta.env.VITE_FETCH_ALL_ARTICLE_CATEGORY;
const API_URL_BY_CATEGORY = import.meta.env.VITE_FETCH_ALL_ARTICLE_BY_CATEGORY;

const router = useRouter();
const categories = ref([]);
const selectedCategory = ref(null);

const articles = ref([]);
const loading = ref(true);
const categoryLoading = ref(false);

// Fetch Article Categories
const fetchCategories = async () => {
  try {
    const res = await axios.get(API_URL_ALL_CATEGORY);
    categories.value = res.data.data || [];

    if (categories.value.length > 0) {
      // Set first tab as default
      selectedCategory.value = categories.value[0].name;
      fetchArticlesByCategory(selectedCategory.value);
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch Articles by Category
const fetchArticlesByCategory = async (name) => {
  categoryLoading.value = true;
  selectedCategory.value = name;

  try {
    const res = await axios.get(`${API_URL_BY_CATEGORY}/${name}`);
    articles.value = res.data.data || [];
  } catch (err) {
    console.error("Error fetching articles:", err);
    articles.value = [];
  } finally {
    categoryLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});

// Navigate to Article Page
const goToArticle = (article) => {
  const slug = article.slug || article.title.toLowerCase().replace(/\s+/g, "-");

  router.push(`/article/${slug}`);
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8">
    <div class="border-b border-gray-200">
      <div class="flex space-x-6 overflow-x-auto whitespace-nowrap">
        <button
          v-for="(cat, index) in categories"
          :key="index"
          @click="fetchArticlesByCategory(cat.name)"
          :class="[
            'pb-3 text-sm font-medium transition-colors duration-200 border-b-2',
            selectedCategory === cat.name
              ? 'text-orange-600 border-orange-600 font-bold' // FIXED: Cleaner active state
              : 'text-gray-600 border-transparent hover:border-gray-300 hover:text-orange-600',
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div v-if="categoryLoading" class="text-center py-10 text-gray-500">
      Loading Articles for **{{ selectedCategory }}**...
    </div>

    <div
      v-else-if="articles.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
    >
      <div
        v-for="(article, index) in articles"
        :key="article.id || index"
        class="article-card group"
        @click="goToArticle(article)"
      >
        <div class="relative overflow-hidden rounded-t-lg h-40">
          <img
            :src="article.image"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt="article image"
          />
        </div>

        <div class="p-4 flex flex-col justify-start">
          <h3
            class="text-base font-semibold text-gray-900 mb-2 title-area"
            :title="article.title"
          >
            {{ article.title }}
          </h3>

          <div>
            <p class="text-xs text-gray-500 mt-1">
              {{ article.category?.name || selectedCategory }}
            </p>
            <p class="text-sm font-medium text-gray-600 mt-0.5">
              {{ article.admin?.name || "Unknown Author" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!categoryLoading && articles.length === 0"
      class="text-center py-10 text-gray-500"
    >
      No Articles Found for {{ selectedCategory }}.
    </div>
  </div>
</template>

<style scoped>
/* Unified Card Styles for a perfect look */
.article-card {
  /* Using exact styles from the "Trending Articles" component */
  background-color: #ffffff;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  border-width: 1px;
  border-color: #e5e7eb; /* border-gray-200 */
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  transform: translateY(0);

  /* Remove fixed height on card itself, letting content define it for list view */
  /* height: 320px; */
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
  transform: translateY(-4px);
}

/* Fixed height for title area to prevent layout jumping */
.title-area {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits title to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.5rem; /* Fixed height for 2 lines (approx 40px) */
}
</style>
